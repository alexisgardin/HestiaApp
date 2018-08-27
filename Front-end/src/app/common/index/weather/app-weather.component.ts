import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {API_WEATHER_URL, APP_ID} from "../../../../shared/services/rest/constants";
import {HouseService} from "../../../../shared/services/house.service";
import {HouseModel} from "../../../../shared/models/HouseModel";


@Component({
  selector: "app-weather",
  templateUrl: "./app-weather.component.html",
  styleUrls: ["./app-weather.component.css"]
})

export class WeatherComponent implements OnInit {
  private geolocationPosition: Position;
  city: String;
  temperature: number;
  weather: String;
  house: HouseModel;

  constructor(readonly http: Http, private houseService: HouseService) {
  }

  ngOnInit() {
    this.houseService.getHouse().subscribe(houses => {
      this.house = houses[0];
      this.callOpenWeatherApi();
    });
  }

  private callOpenWeatherApi() {
    this.http.get(`${API_WEATHER_URL}weather?` +
      `q=${this.house.city}` +
      `&units=metric` +
      `&appid=${APP_ID}`)
      .subscribe(res => {
        this.city = JSON.parse(res['_body']).name;
        this.temperature = Math.round(JSON.parse(res['_body']).main.temp);
        this.weather = JSON.parse(res['_body']).weather[0].main;
      });
  }
}
