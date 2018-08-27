import {Injectable} from "@angular/core";
import {API_URL} from "./rest/constants";
import {HttpClient} from "@angular/common/http";
import {RestService} from "./rest/rest.service";
import {Issue, IssueModel} from "../models/IssueModel";
import {Observable} from "rxjs/Observable";
import {StateService} from "./state.service";
import {TypeService} from "./type.service";
import {InhabitantService} from "./inhabitant.service";
import "rxjs/add/operator/mergeMap";
import {LocationService} from "./location.service";
import {PriorityService} from "./priority.service";
import {ImportanceService} from "./importance.service";
import {ImageService} from "./image.service";
import {forkJoin} from "rxjs/observable/forkJoin";
import {of} from "rxjs/index";
import {InhabitantModel} from "../models/InhabitantModel";

@Injectable()
export class IssueService {
  public issuesList$: Observable<IssueModel[]>;

  constructor(private http: HttpClient, private rest: RestService,
              private state: StateService, private type: TypeService,
              private inhabitant: InhabitantService, private priority: PriorityService,
              private location: LocationService, private importance: ImportanceService,
              private imageService: ImageService) {
  }

  private setIssuesListFromAPI(url: string): void {
    this.issuesList$ = this.http.get<Issue[]>(API_URL + url + "?filter=" + JSON.stringify({
      include: ["author", "type", "state", "priority", "importance", "location", "thirdParties"]
    })).mergeMap(models => {
      if (models.length <= 0) {
        return of([]);
      }

      const modelsObs = models.map(model => {
        const imagesObs = this.imageService.getIssueImages(model.id);
        return imagesObs.map(images => {
          return new IssueModel(
            model.id,
            model.title,
            model.description,
            model.state,
            model.type,
            model.author,
            model.priority,
            model.location,
            model.importance,
            images,
            model.datetime_declaration,
            model.datetime_deadline,
            model.datetime_declaration,
            model.thirdParties
          );
        });
      });

      return forkJoin(modelsObs);
    });
  }

  public getIssues(): void {
    this.setIssuesListFromAPI("Issues");
  }

  public getIssuesOfMember(id: number): void {
    this.setIssuesListFromAPI("Members/" + id + "/issues");
  }

  public getAssignedIssuesOfMember(id: number): void {
    this.setIssuesListFromAPI("Members/" + id + "/assignedIssues");
  }

  public getIssue(id: number): Observable<Issue> {
    return this.http.get<Issue>(API_URL + "Issues/" + id + "?filter=" + JSON.stringify({
      include: ["author", "type", "state", "priority", "importance", "location", "images", "thirdParties"]
    })).mergeMap(model => {
      const imagesObs = this.imageService.getIssueImages(model.id);
      return imagesObs.map(images => {
        return new IssueModel(
          model.id,
          model.title,
          model.description,
          model.state,
          model.type,
          model.author,
          model.priority,
          model.location,
          model.importance,
          images,
          model.datetime_declaration,
          model.datetime_deadline,
          model.datetime_declaration,
          model.thirdParties
        );
      });
    });
  }

  public createIssue(formData: FormData): void {
    let idAuth = 0;
    this.inhabitant.currentMember$.subscribe(member => {
      idAuth = member.id;
      const issue = {
        title: formData.get("title").toString(),
        description: formData.get("description").toString(),
        emergencyId: parseInt(formData.get("idEmergency").toString(), 10),
        typeId: parseInt(formData.get("idType").toString(), 10),
        authorId: idAuth
      };

      this.http.post(API_URL + "Issues", issue).subscribe(data => {
        console.log(data);
      });
    });
  }

  public getNumberOfUnresolvedIssue(): Observable<Object> {
    return this.state.getStatesByValue(-1).mergeMap(values => {
      return this.http.get(API_URL + "Issues/count?where={\"stateId\":\"" + values[0].id + "\"}");
    });
  }

  public getNumberOfResolvedIssue(): Observable<Object> {
    return this.state.getStatesByValue(1).mergeMap(values => {
      return this.http.get(API_URL + "Issues/count?where={\"stateId\":\"" + values[0].id + "\"}");
    });
  }

  public getNumberOfLateIssue(): Observable<Object> {
    return this.state.getStatesByValue(1).mergeMap(values => {
      const filter = {
        datetime_deadline: {lt: new Date(Date.now()).getTime()},
        stateId: {neq: values[0].id}
      };
      console.log(JSON.stringify(filter));
      return this.http.get(API_URL + "Issues/count?where=" + JSON.stringify(filter));
    });
  }


  public getNumberOfInProcessIssue(): Observable<Object> {
    return this.state.getStatesByValue(0).mergeMap(values => {
      return this.http.get(API_URL + "Issues/count?where={\"stateId\":\"" + values[0].id + "\"}");
    });
  }


  /**
   * get the n last issues where n is the number of most recent issues to get
   */
  public getLastIssues(n: number): Observable<Issue[]> {
    return this.http.get<Issue[]>(API_URL + "Issues?filter=" + JSON.stringify({
      include: ["author", "type", "state", "priority", "importance", "location", "thirdParties"],
      order: "datetime_declaration DESC",
      limit: n
    })).mergeMap(models => {
      if (models.length <= 0) {
        return of([]);
      }

      const modelsObs = models.map(model => {
        const imagesObs = this.imageService.getIssueImages(model.id);
        return imagesObs.map(images => {
          return new IssueModel(
            model.id,
            model.title,
            model.description,
            model.state,
            model.type,
            model.author,
            model.priority,
            model.location,
            model.importance,
            images,
            model.datetime_declaration,
            model.datetime_deadline,
            model.datetime_declaration,
            model.thirdParties
          );
        });
      });

      return forkJoin(modelsObs);
    });

  }


  /**
   * patchIssue
   */
  public patchIssue(issue: IssueModel): void {
    this.http.patch(API_URL + "Issues/" + issue.id, issue).subscribe(() => this.getIssues());
  }

  /**
   * adds an Issue To a Member
   */
  public addIssueToMember(issueId: number, member: any): void {
    this.http.post(API_URL + "IssuesMembers", {"issueId": issueId, "memberId": member.id}).subscribe();
  }

  /**
   * delete an IssueMember
   */
  public deleteIssueMember(issueId: number, member: any): void {
    this.http.delete(API_URL + "IssuesMembers?where={\"issueId\":" + issueId + ", \"memberId\":" + member.id + "}").subscribe();
  }

  public getMembersAssignedToIssue(issueId: number): Observable<InhabitantModel[]> {
    return this.inhabitant.getMembersObservable(API_URL + "Issues/" + issueId + "/thirdParties");
  }
}
