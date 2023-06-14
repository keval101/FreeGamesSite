import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Input, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

const API_URL = 'https://free-to-play-games-database.p.rapidapi.com/api';

export interface Tag {
  name: string,
  id: string
}
@Injectable({
  providedIn: 'root'
})
export class GameService {
  isBrowser = false;
  selectedGame: any;
  headers = {
    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
    'x-rapidapi-key': '390d194e23mshc197e2549dfec2ap1e776fjsn41258817eb2f'
  }

  pageUrl: string;
  tagsDesctiption;

  constructor(
    private _http: HttpClient, 
    private title: Title, 
    private meta: Meta, 
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private dom) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  getGameList(): Observable<any> {
    return this._http.get(`${API_URL}/games`, {headers: this.headers})
    .pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => {
        return of(err);
      }),
    );
  }

  getGameDetail(gameID): Observable<any> {
    return this._http.get(`${API_URL}/game`, {headers: this.headers, params: {id: gameID}})
    .pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => {
        return of(err);
      }),
    );
  }

  filterGameByTag(tag): Observable<any> {
    return this._http.get(`${API_URL}/filter`, {headers: this.headers, params: {tag: tag}})
    .pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => {
        return of(err);
      }),
    );
  }

  filterGameByName(name: string): Observable<any> {
    return this._http.get(`${API_URL}/games`, {headers: this.headers})
    .pipe(
      map((response: any[]) => {
        console.log(name)
        const filterGames = response.filter(game => game.title.toLowerCase().includes(name.toLowerCase()));
        return filterGames;
      }),
      catchError((err) => {
        return of(err);
      }),
    );
  }

  sortGames(sortBy?: string, tag?: string): Observable<any> {
    let filterPayload
    if(tag) filterPayload = `filter?tag=${tag}`;
    if(sortBy) filterPayload = `games?sort-by=${sortBy}`;
    if(tag && sortBy) filterPayload = `filter?tag=${tag}&sort=${sortBy}`;

    return this._http.get(`${API_URL}/${filterPayload}`, {headers: this.headers})
    .pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => {
        return of(err);
      }),
    );
  }

  updatePageTitle(title: string) {
    this.title.setTitle(title);
  }

  createCanonicalLink(url?: string) {
    if(this.isBrowser) {
      let canURL = url == undefined ? this.dom.URL : url;
      this.pageUrl = canURL;
      let link: HTMLLinkElement = this.dom.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.dom.head.appendChild(link);
      link.setAttribute('href', canURL);
    }
  }

  updateMetaTags(metaObject: any) {
    this.createCanonicalLink();
    this.meta.updateTag( { name: "description", content: metaObject.description }, "name='description'");
    this.meta.updateTag( { name: "keywords", content: metaObject.keywords }, "name='keywords'");
    this.meta.updateTag( { name: "image", content: 'https://freepcgames.netlify.app/assets/images/icon.png' }, "name='image'");

    this.meta.updateTag( { property: 'og:type', content: 'website' }, "property='og:type'");
    this.meta.updateTag( { property: 'og:url', content: this.pageUrl }, "property='og:url'");
    this.meta.updateTag( { property: 'og:title', content: metaObject.metaTitle }, "property='og:title'");
    this.meta.updateTag( { property: 'og:description', content: metaObject.description }, "property='og:description'");
    this.meta.updateTag( { property: 'og:image:secure_url', content: 'https://freepcgames.netlify.app/assets/images/icon.png' }, "property='og:image:secure_url'");

    
    this.meta.updateTag({ name: 'twitter:creator', content: `@KevalVadhiya`}, "name='twitter:creator'")
    this.meta.updateTag({ name: 'twitter:site', content: `@FreePcGames`}, "name='twitter:site'")
    this.meta.updateTag({ name: 'twitter:title', content: metaObject.metaTitle}, "name='twitter:title'")
    this.meta.updateTag({ name: 'twitter:description', content: metaObject.description}, "name='twitter:description'")
    this.meta.updateTag({ name: 'twitter:image', content: `https://freepcgames.netlify.app/assets/images/icon.png`}, "name='twitter:image'")
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image'}, "name='twitter:card'")
  }


  gameTags: Tag[] = [
    {
      name: "MMORPG",
      id: 'mmorpg',
    },
    {
      name: "Shooter",
      id: 'shooter',
    },
    {
      name: "Strategy",
      id: 'strategy',
    },
    {
      name: "Moba",
      id: 'moba',
    },
    {
      name: "Racing",
      id: 'racing',
    },
    {
      name: "Sports",
      id: 'sports',
    },
    {
      name: "Social",
      id: 'social',
    },
    {
      name: "Open World",
      id: 'open-world',
    },
    {
      name: "Survival",
      id: 'survival',
    },
    {
      name: "Pixel",
      id: 'pixel',
    },
    {
      name: "Zombie",
      id: 'zombie',
    },
    {
      name: "First Person View",
      id: 'first-person',
    },
    {
      name: "Third Person View",
      id: 'third-Person',
    },
    {
      name: "Tank",
      id: 'tank',
    },
    {
      name: "Space",
      id: 'space',
    },
    {
      name: "Superhero",
      id: 'superhero',
    },
    {
      name: "Permadeath",
      id: 'permadeath',
    },
    {
      name: "Card",
      id: 'card',
    },
    {
      name: "3d",
      id: '3d',
    },
    {
      name: "2d",
      id: '2d',
    },
    {
      name: "Anime",
      id: 'anime',
    },
    {
      name: "Fantasy",
      id: 'fantasy',
    },
    {
      name: "Sci-fi",
      id: 'sci-fi',
    },
    {
      name: "Fighting",
      id: 'fighting',
    },
    {
      name: "Action",
      id: 'action',
    },
    {
      name: "Military",
      id: 'military',
    },
    {
      name: "Martial arts",
      id: 'martial-arts',
    },
    {
      name: "Flight",
      id: 'flight',
    },
    {
      name: "Horror",
      id: 'horror',
    },
  ]
}
