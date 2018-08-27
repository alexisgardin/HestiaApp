import {Injectable} from "@angular/core";
import {API_URL} from "./rest/constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {HouseModel} from "../models/HouseModel";


@Injectable()
export class HouseService {

  constructor(private http: HttpClient) {
  }

  public getHouse(): Observable<HouseModel[]> {
    return this.http.get<HouseModel[]>(API_URL + "Houses");
  }

  public setHouse(house) {
    return this.http.patch(API_URL + "Houses", house);
  }

  public deleteHouse(houseId: number) {
    return this.http.delete(API_URL + "Houses" + houseId);
  }
}
