import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';

interface WikipediaResponse {
  query: {
    search: {
      title: string;
      snippet: string;
      pageid: number;
    }[]
  }
}


@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  url: string = 'https://en.wikipedia.org/w/api.php'


  constructor(private http: HttpClient) { }


  search(term: string) {
    return this.http.get<WikipediaResponse>(this.url, { 
      params: { 
        action: 'query', 
        format: 'json', 
        list: 'search',
        utf8: '1', 
        srsearch: term,
        origin: '*',
      }
    }).pipe(pluck('query', 'search'))
  }
}
