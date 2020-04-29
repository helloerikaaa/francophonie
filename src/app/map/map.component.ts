import { Component, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: Mapboxgl.Map;;

  constructor() { }

  ngOnInit(): void {
    this.initilizeMap();

    this.createMarker(-74.0104912, 45.5576996, '#ee5253', "Québec");
    this.createMarker(2.2770198, 48.8588377, '#ee5253', "France");
    this.createMarker(7.3248299, 46.9546486, '#ee5253', "Suisse");
    this.createMarker(4.30535, 50.8549541, '#ee5253', "Belgique");
    this.createMarker(-72.3545011, 18.5790242, '#ee5253', "Haïti");
  }

  initilizeMap() {
    (Mapboxgl as any).accessToken = environment.mapboxKey;
    this.map = new Mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/helloerikaaa/ck9lshkqc14m11imm930wt4c8',
      zoom: 1,
      center: [-102.5745611, 22.7757111],
    });

    this.map.addControl(new Mapboxgl.NavigationControl(), 'bottom-right');

    this.map.addControl(
      new Mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }), 'bottom-right');

  }

  createMarker(lng: number, lat: number, color: string, description: string) {
    var popup = new Mapboxgl.Popup({ offset: 25 }).setText(description);
    const marker = new Mapboxgl.Marker({ "color": color })
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(this.map);
  }


}
