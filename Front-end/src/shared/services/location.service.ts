import {Injectable} from "@angular/core";
import {API_URL} from "./rest/constants";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Observable} from "rxjs/Observable";
import {LocationModel} from "../models/LocationModel";


@Injectable()
export class LocationService {

    constructor(private http: HttpClient) {
    }

    public getLocations(): Observable<LocationModel[]> {
        return this.http.get<LocationModel[]>(API_URL + "Locations");
    }

    public getLocation(id: number): Observable<LocationModel> {
        return this.http.get<LocationModel>(API_URL + "Locations/" + id);
    }

    public updateLocation(location: LocationModel): Observable<LocationModel> {
        return this.http.patch<LocationModel>(API_URL + "Locations/" + location.id, location);
    }

    public addLocation(locationName: string): Observable<LocationModel> {
        return this.http.post<LocationModel>(API_URL + "Locations", {
            name: locationName
        });
    }
}
