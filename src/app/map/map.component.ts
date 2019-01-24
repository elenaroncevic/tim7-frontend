import { Component, ViewChild, OnInit, ElementRef, Input } from '@angular/core';
import {} from 'googlemaps';
import { Linija } from '../model/Linija';

 @Component( {
 selector: 'app-map-component',
 templateUrl: './map.component.html',
 styleUrls: ['./map.component.css']
 })
export class MapComponent  implements OnInit {

 @ViewChild('googleMap', {read: ElementRef}) gmapElement: ElementRef;
 map: google.maps.Map;
 mapProperties: any;
 markers: google.maps.Marker[];
 iws: google.maps.InfoWindow[];


 @Input()
 set linija (line: Linija) {
    // ako je korisnik izabrao neku liniju, uklone se prethodni markeri i infowindows; zatim se isprazne liste
    if (line.id !== -1) {
        for ( let mark of this.markers) {
            mark.setMap(null);
        }
        for ( let iw of this.iws) {
            iw.close();
        }
    }
    this.markers = [];
    this.iws = [];
    for (let stanica of line.stations) {
        console.log(stanica.name);
        this.mapProperties = {
            center: new google.maps.LatLng(stanica.latitude, stanica.longitude),
            zoom: 14,
            // mapTypeId: google.maps.MapTypeId.ROADMAP
            // mapTypeId: google.maps.MapTypeId.HYBRID
            // mapTypeId: google.maps.MapTypeId.SATELLITE
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        let marker = new google.maps.Marker({ position: this.mapProperties.center });
        marker.setMap(this.map);
        let infoWindow = new google.maps.InfoWindow({
                 content: stanica.name
        })
        infoWindow.open(this.map, marker);
        this.markers.push(marker);
        this.iws.push(infoWindow);
    }


 }

ngOnInit() {
    this.markers = [];
    this.iws = [];
    this.mapProperties = {
        center: new google.maps.LatLng(28.4595, 77.0266),
        zoom: 14,
        // mapTypeId: google.maps.MapTypeId.ROADMAP
        // mapTypeId: google.maps.MapTypeId.HYBRID
        // mapTypeId: google.maps.MapTypeId.SATELLITE
         mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProperties);
     }
 }
