import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'game-site';
  public isMenuOpen = false;
  public isMobileScreen = false;

  ngOnInit(): void {
    if( /Android|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      this.isMobileScreen = true;
    } else {
      this.isMobileScreen = false;
    }
  }

  openMenu(): void {
    this.isMenuOpen = !this.isMenuOpen
  }
  
}
