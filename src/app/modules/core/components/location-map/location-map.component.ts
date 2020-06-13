import { Component, OnInit, Input } from '@angular/core';
import { LocationiqService } from './../../../../shared/services/locationiq.service';

@Component({
  selector: 'wd-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.scss']
})
export class LocationMapComponent implements OnInit {

  @Input() address: string

  public latLon: number[]
  public options: any
  public layers: any

  constructor(
    private readonly locationService: LocationiqService
  ) { }

  async ngOnInit() {
    if (this.address) {
      await this.locationService.searchLocation(this.address)
      .then(response => response.json())
      .then(data => {
        this.latLon = [parseFloat(data[0].lon), parseFloat(data[0].lat)];
      })
    }
  }

}
