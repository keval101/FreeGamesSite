import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GameService, Tag } from 'src/app/services/game.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {

  filterGames = [];
  hasSearched = false;
  searchItemName: string;
  filterTags: Tag[]
  selectedTags: any[] = []
  filterNewTags = []
  isResponse = false;
  mouseDown = false;
  startX: any;

  scrollLeft: any;

  slider = document.querySelector<HTMLElement>('.filter-tags-container');

  constructor(private readonly _service: GameService) { }

  ngOnInit(): void {
    this._service.getGameList().subscribe(res => {
      this.filterGames = res;
      setTimeout(() => { this.isResponse = true}, 1000);
    })

    // sorting
    this.filterTags = this._service.gameTags.sort((a,b) =>{
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }

  filterGamesByTags(): void {
    console.log(this.selectedTags);
    this.selectedTags.length > 0 ? this.hasSearched = true : this.hasSearched = false;
    const tags = []
    this.selectedTags.map(x => tags.push(x.id));
    const payload = tags.join('.')
    if(payload) {
      this._service.filterGameByTag(payload).subscribe(games => this.filterGames = games);
    } else {
      this.isResponse = false;
      this._service.getGameList().subscribe(games => {
        setTimeout(() => { this.isResponse = true}, 1000);
        this.filterGames = games
      })
    }
  }

  searchGame(e): void {
    const name = e.target.value;
    name ? this.hasSearched = true : this.hasSearched = false;
    this._service.filterGameByName(name).subscribe(games => {
      this.filterGames = games
      setTimeout(() => { this.isResponse = true}, 1000);
    })
  }

  clearFilter(): void {
    this.searchItemName = '';
    this.hasSearched = false;
    this.selectedTags = [];
    this.isResponse = false;
    this._service.filterGameByName('').subscribe(games => {
      this.filterGames = games;
      setTimeout(() => { this.isResponse = true}, 1000);
    })
  }

  startDragging(e, flag, el) {
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft;
    this.scrollLeft = el.scrollLeft;
  }

  stopDragging(e, flag) {
    this.mouseDown = false;
  }

  moveEvent(e, el) {
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }

    // console.log(e);
    const x = e.pageX - el.offsetLeft;
    const scroll = x - this.startX;
    el.scrollLeft = this.scrollLeft - scroll;
  }

  removeSelectedTag(id: string): void {
    const index = this.selectedTags.findIndex(x => x.id === id)
    this.selectedTags.splice(index, 1);
    this.filterGamesByTags();
  }
}
