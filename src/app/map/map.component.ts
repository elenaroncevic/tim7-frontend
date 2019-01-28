import { Component, ViewChild, OnInit, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import {} from 'googlemaps';
import { Linija } from '../model/Linija';
import { Stanica } from '../model/Stanica';

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
 info: google.maps.InfoWindow;
 // mark: google.maps.Marker;
 constructor() {
    this.markers = [];
    this.iws = [];
 }
 @Output() removeStation = new EventEmitter<Stanica>();


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
        this.mapProperties = {
            center: new google.maps.LatLng(stanica.latitude, stanica.longitude),
            zoom: 14,
            // mapTypeId: google.maps.MapTypeId.ROADMAP
            // mapTypeId: google.maps.MapTypeId.HYBRID
            // mapTypeId: google.maps.MapTypeId.SATELLITE
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        let marker = new google.maps.Marker({ position: this.mapProperties.center});
        marker.setTitle(stanica.name);
        marker.setMap(this.map);
        google.maps.event.addListener(marker, 'click', () => {
            marker.setMap(null);
            this.removeStation.emit(stanica);
        });
        let infoWindow = new google.maps.InfoWindow({
                 content: stanica.name
        });
        infoWindow.open(this.map, marker);
        this.markers.push(marker);
        this.iws.push(infoWindow);
    }


 }


ngOnInit() {
    this.mapProperties = {
        center: new google.maps.LatLng(28.4595, 77.0266),
        zoom: 14,
        // mapTypeId: google.maps.MapTypeId.ROADMAP
        // mapTypeId: google.maps.MapTypeId.HYBRID
        // mapTypeId: google.maps.MapTypeId.SATELLITE
         mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProperties);
    google.maps.event.addListener(this.map, 'click', function (e) {

    });
     }
 }

