import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Conference } from 'src/app/models/conference.model';
import { User } from 'src/app/models/user.model';
import { ConferenceState } from 'src/app/store/features/conference/conference-store/conference.reducers';
import { selectUserInterestedConferences } from 'src/app/store/features/conference/conference-store/conference.selectors';
import { ConferenceFacade } from 'src/app/store/features/conference/facades/conference.facade';
import { UserFacade } from 'src/app/store/features/user/facades/user.facade';

declare var ol: any;

@Component({
  selector: 'app-conference-details',
  templateUrl: './conference-details.component.html',
  styleUrls: ['./conference-details.component.scss']
})
export class ConferenceDetailsComponent implements OnInit {

  user: User;

  addedToFavourited$: Observable<any> = this._store.select(selectUserInterestedConferences).pipe(
    filter(conferences => conferences !== undefined),
    map(conferences => {
      const id = this._route.snapshot.paramMap.get("id");
      let addedToFav = false;
      conferences.forEach(conf => {
        if (conf._id.$oid === id) addedToFav = true;
      });
      return addedToFav;
    })
  )

  vectorLayers: any[] = [];
  map: any;

  conference$: Observable<any> = this._conferenceFacade
    .getCurrentConference()
    .pipe(
      filter(conference => conference !== null),
      tap(conference => {
        this.conference = conference;
        this.addPoint(+(+conference.address.latitude).toFixed(5), +(+conference.address.longitude).toFixed(5), conference.name);
      })
    )

  conference: Conference;

  constructor(
    protected _conferenceFacade: ConferenceFacade,
    protected _route: ActivatedRoute,
    protected _store: Store<ConferenceState>,
    protected _userFacade: UserFacade
  ) { }

  ngOnInit() {
    this._userFacade.getCurrentUser()
      .pipe(
        filter(user => user !== undefined),
        tap(user => {
          this.user = user
          this._conferenceFacade.loadUserInterestedConferences(user._id);
        })
      )
      .subscribe();

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

  addToFavourite() {
    this._conferenceFacade.addFavouriteConference(this.user._id, this._route.snapshot.paramMap.get("id"));
    this._conferenceFacade.loadUserInterestedConferences(this.user._id);
  }

} 
