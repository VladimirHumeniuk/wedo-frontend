import { LocationiqService } from './../../../../shared/services/locationiq.service';
import { Component, OnInit, Input } from '@angular/core';
import { latLng, tileLayer, marker, icon, popup, map, LatLngExpression } from 'leaflet';

@Component({
  selector: 'wd-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.scss']
})
export class LocationMapComponent implements OnInit {

  @Input() address: string

  public latLon: LatLngExpression
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

        this.latLon = [parseFloat(data[0].lat), parseFloat(data[0].lon)];

        this.options = {
          layers: [
            tileLayer('https://{s}-tiles.locationiq.com/v2/obk/r/{z}/{x}/{y}.png?key=pk.1a7c9d618b307088211351ffdc12e5a0', {
              attribution: 'Open Street Map',
            })
          ],
          zoom: 16,
          minZoom: 12,
          center: latLng(this.latLon[0], this.latLon[1])
        };

        this.layers = [
          marker(this.latLon, {
            icon: icon({
               iconSize: [ 25, 41 ],
               iconAnchor: [ 13, 41 ],
               iconUrl: 'assets/marker-icon.png',
               shadowUrl: 'assets/marker-shadow.png'
            }),
         })
        ]
      })
    }
  }

}
