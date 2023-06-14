import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  randomGameArray = []
  @Input() games = []
  newGames = [];
  isResponse = false;

  constructor(private readonly _service: GameService) { 
  }

  ngOnInit(): void {
    if(!this.games.length) {
      this._service.getGameList().subscribe(res => {
        this.games = res;
        setTimeout(() => { this.isResponse = true}, 1000);
      })
    } else {
      setTimeout(() => { this.isResponse = true}, 1000);
    }

    // this.getSomeGamesDetails();
  }

  getSomeGamesDetails(): void {
    const randomGameArray = []; // initally make it empty
    const randomNumber = Array.from({length: 20}, () => Math.floor(Math.random() * 40));
    let uniqueIds = [...new Set(randomNumber)];
    uniqueIds.map(id => {
      if(id !== 0) {
        this._service.getGameDetail(id).subscribe( res => {
          if(res.id) this.randomGameArray.push(res)
        })
      }
    })
  }

  lcickme(): void {
    this.randomGameArray = this.newGames;
  }
}
