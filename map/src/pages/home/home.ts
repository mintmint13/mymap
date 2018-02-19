import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation,Geoposition } from '@ionic-native/geolocation';

import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(	public navCtrl: NavController,
				        private googleMaps: GoogleMaps,
				        public geolocation: Geolocation) {

  }

  ngAfterViewInit(){
  	this.geoloctionNative();
  }

  geoloctionNative(){
  	this.geolocation.getCurrentPosition().then((geposition:Geoposition) => {

  				this.loadMap(geposition);
		})
  }

  loadMap(position){
    let element: HTMLElement = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element);
    let latlng = new LatLng (position.coords.latitude, position.coords.longitude);
    
    map.one(GoogleMapsEvent.MAP_READY).then(() => {
          let position: CameraPosition = {
                    target: latlng,
                    zoom : 15,
                    tilt : 30
        };
          map.moveCamera(position);
    })
  }
}