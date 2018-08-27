import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Observable} from "rxjs/Rx";
import {ImageModel} from "../models/ImageModel";
import {API_URL} from "./rest/constants";


@Injectable()
export class ImageService {

    constructor(private http: HttpClient) {
    }

    public getIssueImages(issueId: number): Observable<ImageModel[]> {
        return this.http.get<ImageModel[]>(API_URL + 'Issues/' + issueId + '/images');
    }

    public getProfileImage(memberId: number): Observable<ImageModel> {
        return this.http.get<ImageModel>(API_URL + 'Members/' + memberId + '/profileImage');
    }
}