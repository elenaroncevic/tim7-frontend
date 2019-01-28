import { Component, ViewChild, OnInit, ElementRef, Input, EventEmitter, Output, DoCheck, AfterContentChecked, AfterViewChecked } from '@angular/core';
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
 hasAccess: boolean;
 marker: google.maps.Marker;
 iw: google.maps.InfoWindow;
 constructor() {
    this.markers = [];
    this.iws = [];
 }
 @Output() removeStation = new EventEmitter<Stanica>();
 @Output() addStation = new EventEmitter<any>();

 @Input()
 set admin (isAdmin: boolean) {
    this.hasAccess = isAdmin;
 }

 @Input()
 set station (stanica: Stanica) {
        if (this.marker != null) {
            this.marker.setPosition( new google.maps.LatLng(stanica.latitude, stanica.longitude));
            this.marker.setMap(this.map);
            this.iw.setContent(stanica.name);
        } else {
        this.mapProperties = {
            center: new google.maps.LatLng(stanica.latitude, stanica.longitude),
            zoom: 14,
            // mapTypeId: google.maps.MapTypeId.ROADMAP
            // mapTypeId: google.maps.MapTypeId.HYBRID
            // mapTypeId: google.maps.MapTypeId.SATELLITE
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        this.iw = new google.maps.InfoWindow({
                content: stanica.name
        });
        this.marker = new google.maps.Marker({ position: this.mapProperties.center});
        this.marker.setMap(this.map);
        this.iw.open(this.map, this.marker);
    }
 }

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
        marker.setMap(this.map);

        google.maps.event.addListener(marker, 'click', () => {
            if (this.hasAccess) {
                marker.setMap(null);
                this.removeStation.emit(stanica);
            }
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
        center: new google.maps.LatLng(45.25149986311998, 19.85463183087154),
        zoom: 14,
        // mapTypeId: google.maps.MapTypeId.ROADMAP
        // mapTypeId: google.maps.MapTypeId.HYBRID
        // mapTypeId: google.maps.MapTypeId.SATELLITE
         mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProperties);
    google.maps.event.addListener(this.map, 'click', (event) => {
        if (this.hasAccess) {

            this.addStation.emit(event.latLng);
        
        let infoWindow = new google.maps.InfoWindow({
                content: 'new station'
        });
        let marker = new google.maps.Marker({ position: event.latLng});
        marker.setMap(this.map);
        infoWindow.open(this.map, marker);
        this.markers.push(marker);
        this.iws.push(infoWindow);
    }
            }
        );
 }

}