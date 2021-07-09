import { Component, Input, OnInit, ViewChild } from '@angular/core';


declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('mapa', { static: true }) mapa: any;

  constructor() { }

  ngOnInit() {
    console.log(this.coords);

    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FtaWxvLWFydHVuZHVhZ2EiLCJhIjoiY2txd3N6ZjhuMGppcDJvcnp4aDNraG5oeiJ9.252eg1FnWgUGp76wyGs-ew';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ lng, lat ],
      zoom: 15
    });
    const marcador = new mapboxgl.Marker()
    .setLngLat( [ lng, lat ] )
    .addTo( map );
  }

}
