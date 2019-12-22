import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConferenceFacade } from 'src/app/store/features/conference/facades/conference.facade';
import { Conference } from 'src/app/models/conference.model';

declare var ol: any;

@Component({
  selector: 'app-conference-details',
  templateUrl: './conference-details.component.html',
  styleUrls: ['./conference-details.component.scss']
})
export class ConferenceDetailsComponent implements OnInit {

  vectorLayers: any[] = [];
  map: any;

  conference$: Observable<any> = this._conferenceFacade
    .getCurrentConference()
    .pipe(
      tap(conference => {
        this.conference = conference;
        this.addPoint(conference.latitude, conference.longitude, conference.name);
      })
    )

  conference: Conference;

  constructor(
    protected _conferenceFacade: ConferenceFacade,
    protected _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._conferenceFacade.loadCurrentConferenceForId(this._route.snapshot.paramMap.get("id"));

    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }),
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

  }

  goWebsite(url): void {
    window.open('https://' + url);
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

    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([lng, lat]));
    view.setZoom(8);

    this.vectorLayers.push(vectorLayer);
    this.map.addLayer(vectorLayer);
  }

} 
