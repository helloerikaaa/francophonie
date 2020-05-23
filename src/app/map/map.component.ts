import { Component, OnInit, AfterContentInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterContentInit {

  map: Mapboxgl.Map;

  constructor() { }
  ngAfterContentInit(): void {
    this.createMarker(-114.6465902, 54.1660886, '#ee5253', "canada", "Canada", "300px");
    this.createMarker(2.2770198, 48.8588377, '#ee5253', "france1", "France", "400px");
    this.createMarker(1.3628007, 43.6006786, '#ee5253', "france2", "France", "400px");
    this.createMarker(-8.0778939, 31.6346023, '#ee5253', "maroc", "Maroc", "250px");
    this.createMarker(-0.4704331, 27.9654412, '#ee5253', "algerie", "L'Algérie", "270px");
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

  createMarker(lng: number, lat: number, color: string, country: string, name: string, height: string) {
    var html2 = '<div class="card" style="width:200px; height:' + height + '"><img class="card-img-top" src="../assets/img/affiche/'+ country + '.jpeg"' + 'style="width: 200px;" alt="Card image"><div class="card-body"><h4 class="card-title">' + name + '</h4><p class="card-text"></p> <a href="../assets/img/affiche/'+ country + '.jpeg">Voir l\'affiche en taille réelle </a>' + '</div></div>'
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
