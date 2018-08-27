import {Injectable} from "@angular/core";
import {API_URL} from "./rest/constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {InhabitantModel} from "../models/InhabitantModel";
import {ImageService} from "./image.service";
import {forkJoin} from "rxjs/index";
import {RoleModel} from "../models/RoleModel";


@Injectable()
export class InhabitantService {

  public currentMember$: Observable<InhabitantModel>;
  public inhabitantsList$: Observable<InhabitantModel[]>;

  constructor(readonly http: HttpClient, private imageService: ImageService) {
    this.getCurrentMember();
  }

  public getMembersObservable(url: string) {
    return this.http.get<InhabitantModel[]>(url).mergeMap(members => {
      const modelsObs = members.map(member => {
        const imageObs = this.imageService.getProfileImage(member.id);
        return imageObs.map(image =>
          new InhabitantModel(
            member.id,
            member.lastname,
            member.firstname,
            member.username,
            member.roles,
            member.email,
            member.emailVerified,
            member.realm,
            member.password,
            image
          )
        );
      });

      return forkJoin(modelsObs);
    });
  }

  public getMembers(): void {
    this.inhabitantsList$ = this.getMembersObservable(API_URL + "Members" + "?filter=" + JSON.stringify({
      include: ["roles"]
    }));
  }

  public countMember(): Observable<any> {
    return this.http.get(API_URL + "Members/count");
  }

  public getMembersForAssigned(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + "Members").map(members => {
      return members.map(member => {
        return {"id": member.id, "itemName": member.firstname + " " + member.lastname};
      });
    });
  }

  public getMember(id: number): Observable<InhabitantModel> {
    return this.http.get<InhabitantModel>(API_URL + "Members/" + id);
  }

  public getCurrentMember(): void {
    this.currentMember$ = this.http.get<InhabitantModel>(API_URL + "Members/authenticated").mergeMap(member => {
      const imageObs = this.imageService.getProfileImage(member.id);
      const rolesObs = this.getMemberRoles(member.id);

      return imageObs.mergeMap(images => {
          return rolesObs.map(roles =>
            new InhabitantModel(
              member.id,
              member.lastname,
              member.firstname,
              member.username,
              roles,
              member.email,
              member.emailVerified,
              member.realm,
              member.password,
              images
            )
          );
        }
      );
    });
  }

  getMemberRoles(memberId: number): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(API_URL + "Members/" + memberId + "/roles");
  }

  public getProfileImage(id: number): Observable<any> {
    return this.http.get<InhabitantModel>(API_URL + "Members/" + id + "/profileImage");
  }

  public deleteMember(id: number) {
    this.http.delete(API_URL + "Members/" + id).subscribe(() => this.getMembers());
  }

  /**
   * Modifies a member
   * @param member the member model modified
   */
  public patchMember(member: InhabitantModel) {
    if (member) {
      this.http.patch(API_URL + "Members", member).subscribe(() => this.getMembers());
    }
  }

  /**
   * Adds a member to the home
   * @param member the member to add to the home
   */
  public postMember(member: InhabitantModel) {
    if (member) {
      this.http.post(API_URL + "Members", member).subscribe(() => this.getMembers());
    }
  }

  /**
   *
   * @returns {Observable<Object>}
   */
  public getNumberOfAssignedIssueByMember(id: number): Observable<Object> {
    const filter = {
      include:
        ["state"]
    };
    return this.http.get(`${API_URL}/Members/${id}/assignedIssues?filter=${JSON.stringify(filter)}`);
  }


  /**
   *
   * @returns {Observable<Object>}
   */
  public getNumberOfAssignedIssueByMemberAndDate(id: number, from: Date, to: Date): Observable<Object> {
    const millisFrom = from.getTime();
    const millisTo = to.getTime();
    const filter = {
      include:
        ["state"],
      where: {
        'datetime_declaration': {
          between: [millisFrom, millisTo]
        }
      }
    };
    return this.http.get(`${API_URL}/Members/${id}/assignedIssues?filter=${JSON.stringify(filter)}`);
  }

  public changePassword(oldPassword: string, newPassword: string): Observable<void> {
    return this.http.post<void>(API_URL + '/Members/change-password', {
      oldPassword: oldPassword,
      newPassword: newPassword
    });
  }
}
