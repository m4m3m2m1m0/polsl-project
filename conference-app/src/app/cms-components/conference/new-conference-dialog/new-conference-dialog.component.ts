import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address, Conference, Contact, PriceRange } from 'src/app/models/conference.model';

declare var ol: any;

@Component({
  selector: 'app-new-conference-dialog',
  templateUrl: './new-conference-dialog.component.html',
  styleUrls: ['./new-conference-dialog.component.scss']
})
export class NewConferenceDialogComponent {

  description: string;

  currentHashtag: string = null;
  hashtags: any[] = [];

  conferenceName: string;
  conferenceDescription: string;
  conferenceStartDate: Date;
  conferenceEndDate: Date;

  conferenceLowestPrice: string;
  conferenceHighestPrice: string;
  conferenceCurrencySymbol: string;

  conferenceCountry: string;
  conferenceCity: string;
  conferencePostalCode: string;
  conferenceStreet: string;
  conferenceHouseholdNumber: string;

  conferenceLatitude: number;
  conferenceLongitude: number;

  conferenceCategory: string;

  conferenceUrl: string;
  conferenceEmail: string;
  conferencePhone: string;

  map: any;
  vectorLayers: any[] = [];

  latitude: number = 18.5204;
  longitude: number = 73.8567;

  constructor(
    private dialogRef: MatDialogRef<NewConferenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
  }

  ngOnInit(): void {

    navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      this.setCenter();
    });

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
        zoom: 15
      })
    });
  }

  setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(8);
  }

  getCoord(event: any) {

    this.vectorLayers.forEach(vector => {
      this.map.removeLayer(vector);
    });

    var coordinate = this.map.getEventCoordinate(event);
    let cord = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')

    this.conferenceLatitude = cord[1];
    this.conferenceLongitude = cord[0];
    this.addPoint(this.conferenceLatitude, this.conferenceLongitude, this.conferenceName);
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

  close() {
    this.dialogRef.close();
  }

  addHashtag() {
    if (this.currentHashtag !== undefined) {
      const hashtag: any = {
        id: null,
        name: this.currentHashtag
      };

      this.hashtags.push(hashtag);
      this.currentHashtag = null;
    }
  }

  removeHashtag(name: string) {
    const index = this.hashtags.findIndex(i => i.name === name);
    this.hashtags.splice(index, 1);
  }

  addConference() {
    let conference = this.createConference();
    // TODO: request to save conference //
  }

  isConferenceCorrect() {
    return false;
  }

  createConference(): Conference {

    let conference: Conference;
    let priceRange: PriceRange;
    let address: Address;
    let contact: Contact;

    priceRange.lowest = this.conferenceLowestPrice;
    priceRange.highest = this.conferenceHighestPrice;
    priceRange.currency = this.conferenceCurrencySymbol;

    address.country = this.conferenceCountry;
    address.city = this.conferenceCity;
    address.postalCode = this.conferencePostalCode;
    address.street = this.conferenceStreet;
    address.householdNumber = this.conferenceHouseholdNumber;

    contact.email = this.conferenceEmail;
    contact.phone = this.conferencePhone;
    contact.url = this.conferenceUrl;

    conference.name = this.conferenceName;
    conference.description = this.conferenceDescription;
    conference.startDate = this.conferenceStartDate.toDateString();
    conference.endDate = this.conferenceEndDate.toDateString();
    conference.hashtags = this.hashtags;
    conference.priceRange = priceRange;
    conference.address = address;
    conference.contact = contact;

    conference.address.latitude = this.conferenceLatitude.toString();
    conference.address.longitude = this.conferenceLongitude.toString();

    return conference;
  }

}
