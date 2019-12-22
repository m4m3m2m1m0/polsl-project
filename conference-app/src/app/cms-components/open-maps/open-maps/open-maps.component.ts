import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConferenceFacade } from 'src/app/store/features/conference/facades/conference.facade';
import { ConferenceDialogComponent } from '../conference-dialog/conference-dialog.component';

declare var ol: any;

@Component({
  selector: 'app-open-maps',
  templateUrl: './open-maps.component.html',
  styleUrls: ['./open-maps.component.scss']
})
export class OpenMapsComponent implements OnInit {

  startDate;
  endDate;

  latitude: number = 18.5204;
  longitude: number = 73.8567;

  map: any;

  confList: any[];

  confList$: Observable<any> = this._conferenceFacade.getAvailableConferences().pipe(
    tap(conferences => {
      conferences.forEach(conf => {
        this.addPoint(conf.latitude, conf.longitude, conf.name);
      });
      this.confList = conferences;
    })
  );

  vectorLayers: any[] = [];

  constructor(
    protected _dialogService: MatDialog,
    protected _conferenceFacade: ConferenceFacade
  ) { }

  ngOnInit() {

    navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      this.setCenter();
    });

    var mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
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

    // this.confList.forEach(conf => {
    //   this.addPoint(conf.latitude, conf.longitude, conf.name);
    // });
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
    this.vectorLayers.push(vectorLayer);
    this.map.addLayer(vectorLayer);
  }

  searchConferences() {
    if (this.startDate !== undefined && this.endDate !== undefined) {

      this.vectorLayers.forEach(vector => {
        this.map.removeLayer(vector);
      });
      
      this._conferenceFacade.loadAvailableConferences(this.startDate, this.endDate)
    }
  }

  findClosestConference(lat, long) {
    let dist = [];
    this.confList.forEach(conf => {
      let sum = Math.pow(conf.latitude - lat, 2) + Math.pow(conf.longitude - long, 2)
      let d = Math.pow(sum, 1 / 2);
      dist.push(d);
    });

    let min = Math.min(...dist)
    if (min < 0.05) {
      let i = dist.indexOf(min);
      let closest = this.confList[i];
      this.openDialog(closest);
    }
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
