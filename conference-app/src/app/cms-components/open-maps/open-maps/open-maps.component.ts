import {MatDialogConfig, MatDialog} from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ConferenceDialogComponent } from '../conference-dialog/conference-dialog.component';

declare var ol: any;

@Component({
  selector: 'app-open-maps',
  templateUrl: './open-maps.component.html',
  styleUrls: ['./open-maps.component.scss']
})
export class OpenMapsComponent implements OnInit {

  latitude: number = 18.5204;
  longitude: number = 73.8567;

  map: any;

  confList = [{ name: 'conf1', latitude: 50.29761, longitude: 18.67658 }, { name: 'conf2', latitude: 50.21759, longitude: 18.37653 }]

  constructor(
    protected _dialogService: MatDialog
  ) {}
  ngOnInit() {

    navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      this.setCenter();
    });

    var mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });


    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([73.8567, 18.5204]),
        zoom: 10
      })
    });

    this.confList.forEach(conf => {
      this.addPoint(conf.latitude, conf.longitude, conf.name);
    });
  }

  getCoord(event: any) {
    var coordinate = this.map.getEventCoordinate(event);
    let cord = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')
    this.findClosestConference(cord[1], cord[0]);
  }

  setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(8);
  }

  addPoint(lat: number, lng: number, confName: string) {
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          src: "assets/img/conf-icon.png",
          scale: 0.5
        }),
        text: new ol.style.Text({
          text: confName,
          scale: 1.3,
          fill: new ol.style.Fill({
            color: '#000000'
          }),
          stroke: new ol.style.Stroke({
            color: '#FFFF99',
            width: 3.5
          })
        })
      }),
    });
    this.map.addLayer(vectorLayer);
  }

  findClosestConference(lat, long) {
    let dist = [];
    this.confList.forEach(conf => {
      let sum = Math.pow(conf.latitude - lat, 2) + Math.pow(conf.longitude - long, 2)
      let d = Math.pow(sum, 1 / 2);
      dist.push(d);
    });

    let i = dist.indexOf(Math.min(...dist));
    let closest = this.confList[i];

    console.log(closest.name);
    this.openDialog(closest);
  }

  openDialog(closest) {

    let dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: 1,
        title: 'Angular For Beginners',
        conference: closest
    };

    this._dialogService.open(ConferenceDialogComponent, dialogConfig);
  }

}
