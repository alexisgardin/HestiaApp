import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {API_URL} from "./rest/constants";
import {InhabitantModel} from "../models/InhabitantModel";
import {IssueModel} from "../models/IssueModel";

@Injectable()
export class FileUploadService {

    constructor(private http: HttpClient) {
    }

    public static getUploadFileIssueUrl(issue: IssueModel): string {
        return API_URL + 'ImageFiles/upload?modelName=Issue&relationId=' + issue.id;
    }

    uploadFileIssue(file: File, issue: IssueModel): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('ImageFile', file, file.name);

        return this.http.post(FileUploadService.getUploadFileIssueUrl(issue), formData);
    }

    uploadFileMember(file: File, member: InhabitantModel): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('ImageFile', file, file.name);

        return this.http.post(API_URL + 'ImageFiles/upload?modelName=Member&relationId=' + member.id, formData);
    }

    uploadAndReplaceFile(imageId: number, file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('ImageFile', file, file.name);

        return this.http.put(API_URL + 'ImageFiles/' + imageId + '/uploadAndReplace', formData);
    }

    deleteFile(imageId: number): Observable<any> {
        return this.http.delete(API_URL + 'ImageFiles/' + imageId);
    }
}
