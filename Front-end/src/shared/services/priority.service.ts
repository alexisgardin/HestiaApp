import {Injectable} from "@angular/core";
import {API_URL} from "./rest/constants";
import {HttpClient} from "@angular/common/http";
import {StateModel} from "../models/StateModel";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Observable} from "rxjs/Observable";
import {LocationModel} from "../models/LocationModel";
import {PriorityModel} from "../models/PriorityModel";


@Injectable()
export class PriorityService {

  constructor(private http: HttpClient) {
  }

  public getPriorities(): Observable<PriorityModel[]> {
    return this.http.get<PriorityModel[]>(API_URL + "Priorities");
  }

  public getPriority(id: number): Observable<PriorityModel> {
    return this.http.get<PriorityModel>(API_URL + "Priorities/" + id);
  }
}
