import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  game: any;
  gameScreenshots: any;
  gameId: number;
  isResponse = false;
  gameDescription: string

  slideConfig = { slidesToShow: 1, slidesToScroll: 1, 
    prevArrow: '<button class="custom-arrow slick-custom-prev"><i class="pi pi-chevron-left"></i></button>',
    nextArrow: '<button class="custom-arrow slick-custom-next"><i class="pi pi-chevron-right"></i></button>',
   };

  constructor( 
    private _service: GameService,
    private _router: Router,
    private _activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.gameId = parseFloat(this._activeRouter.snapshot.paramMap.get('id'));

    this._service.getGameDetail(this.gameId).subscribe(
      response => {
        if (response) {
          this.isResponse = true;
          this.game = response;
          this._service.updatePageTitle(`${this.game?.title} | Download and Play for Free`)
          this.gameScreenshots = this.game.screenshots
          const metaObject  = {
            description: this.game?.short_description,
            metaTitle: `${this.game?.title} | Download and Play for Free`,
            keywords: `${this.game?.developer}, ${this.game?.genre}, ${this.game?.publisher}, ${this.game?.platform}, Free PC Games, Download and play games`,
          }
          this._service.updateMetaTags(metaObject)
          //limit only display 2 paragraph
          this.gameDescription = response.description.substr(0, this.getPosition(response.description, '\n', 4));
        }
      }
    )
  }

  getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
  }

}
