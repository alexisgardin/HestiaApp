import {Injectable} from "@angular/core";
import {API_URL} from "./rest/constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {TypeModel} from "../models/TypeModel";


@Injectable()
export class TypeService {

    constructor(private http: HttpClient) {
    }

    public getTypes(): Observable<TypeModel[]> {
        return this.http.get<TypeModel[]>(API_URL + "Types");
    }

    public getType(id: number): Observable<TypeModel> {
        return this.http.get<TypeModel>(API_URL + "Types/" + id);
    }

    public updateType(type: TypeModel): Observable<TypeModel> {
        return this.http.patch<TypeModel>(API_URL + "Types/" + type.id, type);
    }

    public addType(typeName: string): Observable<TypeModel> {
        return this.http.post<TypeModel>(API_URL + "Types", {
           name: typeName
        });
    }
}
