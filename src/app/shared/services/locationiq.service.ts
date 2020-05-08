import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationiqService {

  private readonly token: string = 'pk.1a7c9d618b307088211351ffdc12e5a0'
  private readonly API_URL: string = `https://eu1.locationiq.com/v1/`

  constructor() { }

  public searchLocation(search_string: string) {
    return fetch(`${this.API_URL}search.php?key=${this.token}&q=,${search_string}&countrycodes=GI&format=json`, {
      method: 'GET',
      mode: 'cors',
    })
  }
}
