import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import {} from 'googlemaps';

 @Component( {
 selector: 'app-map-component',
 templateUrl: './map.component.html',
 styleUrls: ['./map.component.css']
 })
export class MapComponent  implements OnInit {

 @ViewChild('googleMap', {read: ElementRef}) gmapElement: ElementRef;
 map: google.maps.Map;
 mapProperties: any;
 marker: google.maps.Marker;

ngOnInit() {
    this.mapProperties = {
        center: new google.maps.LatLng(28.4595, 77.0266),
        zoom: 14,
        // mapTypeId: google.maps.MapTypeId.ROADMAP
        mapTypeId: google.maps.MapTypeId.HYBRID
        // mapTypeId: google.maps.MapTypeId.SATELLITE
        // mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProperties);
    this.marker = new google.maps.Marker({ position: this.mapProperties.center });
    this.marker.setMap(this.map);
    const infowindow = new google.maps.InfoWindow({
            content: 'Hey, We are here'
        });
        infowindow.open(this.map, this.marker);
    }
 }
