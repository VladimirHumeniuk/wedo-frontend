import { Injectable } from '@angular/core';
import { locationiq } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationiqService {

  private readonly API_URL: string = `https://eu1.locationiq.com/v1/`

  constructor() { }

  public searchLocation(search_string: string) {
    return fetch(`${this.API_URL}search.php?key=${locationiq.accessToken}&q=,${search_string}&countrycodes=gi&format=json`, {
      method: 'GET',
      mode: 'cors',
    })
  }
}
