import {Injectable} from "@angular/core";
import {API_URL} from "./rest/constants";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Observable} from "rxjs/Observable";
import {ImportanceModel} from "../models/ImportanceModel";


@Injectable()
export class ImportanceService {

  constructor(private http: HttpClient) {
  }

  public getImportances(): Observable<ImportanceModel[]> {
    return this.http.get<ImportanceModel[]>(API_URL + "Importances");
  }

  public getImportance(id: number): Observable<ImportanceModel> {
    return this.http.get<ImportanceModel>(API_URL + "Importances/" + id);
  }
}
