import { Component, OnInit, AfterContentInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterContentInit {

  map: Mapboxgl.Map;;

  constructor() { }
  ngAfterContentInit(): void {
    this.createMarker(-74.0104912, 45.5576996, '#ee5253', "Québec");
    this.createMarker(2.2770198, 48.8588377, '#ee5253', "France");
    this.createMarker(7.3248299, 46.9546486, '#ee5253', "Suisse");
    this.createMarker(4.30535, 50.8549541, '#ee5253', "Belgique");
    this.createMarker(-72.3545011, 18.5790242, '#ee5253', "Haïti");
  }

  ngOnInit(): void {
    this.initilizeMap();
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

  }

  createMarker(lng: number, lat: number, color: string, description: string) {
    var html = "<a class='marker-popup' href=[routerLink]=\"['/carte/" + description + "']\"></a>"
    var html2 = '<div class="card" style="width:200px; height: 300px"><img class="card-img-top" src="../assets/img/world-no-shadow.png" style="width: 200px;" alt="Card image"><div class="card-body"><h4 class="card-title">' + description + '</h4><p class="card-text">Exemple de texte.</p></div></div>'
    var popup = new Mapboxgl.Popup({
      anchor: 'bottom',   // To show popup on top
      offset: { 'bottom': [0, -10] },  // To prevent popup from over shadowing the marker.
      closeOnClick: true   // To prevent close on mapClick.
    }).setHTML(html2);
    const marker = new Mapboxgl.Marker({ "color": color })
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(this.map);
  }


}
