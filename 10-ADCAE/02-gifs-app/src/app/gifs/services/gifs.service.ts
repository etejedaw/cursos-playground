import { Injectable } from '@angular/core';
import { env } from '../../../env';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, GiphySearch } from './gifs.interface';

@Injectable({ providedIn: 'root' })
export class GifsService {
  gifsList: Gif[] = [];
  private _tagsHistory: string[];
  private readonly API_KEY: string;
  private readonly BASE_URL: string;

  constructor(private http: HttpClient) {
    this._tagsHistory = this.loadLocalStorage();
    this.API_KEY = env.API_KEY;
    this.BASE_URL = 'https://api.giphy.com/v1/gifs';
  }

  searchTag(tag: string) {
    if (!tag) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('limit', 10)
      .set('q', tag);

    this.http
      .get<GiphySearch>(`${this.BASE_URL}/search`, { params })
      .subscribe((resp) => {
        this.gifsList = resp.data;
      });
  }

  private organizeHistory(tag: string) {
    const newTag = tag.toLowerCase();
    if (this._tagsHistory.includes(newTag))
      this._tagsHistory = this._tagsHistory.filter(
        (oldTag) => oldTag !== newTag
      );
    this._tagsHistory.unshift(newTag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage() {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage() {
    const data = localStorage.getItem('history');
    return data ? JSON.parse(data) : [];
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }
}
