/**
 * Class that models an inhabitant of a household
 */
import {RoleModel} from "./RoleModel";
import {ImageModel} from "./ImageModel";


export class InhabitantModel {

  public id: number;
  public lastname: string;
  public firstname: string;
  public username: string;
  public email: string;
  public emailVerified: boolean;
  public realm: string;
  public password: string;
  public roles: RoleModel[];
  public profileImage: ImageModel;

  constructor(id?: number, lastname?: string, firstname?: string, username?: string, roles?: RoleModel[],
              email?: string, emailVerified?: boolean, realm?: string, password?: string, profileImage?: ImageModel) {
    this.id = id;
    this.lastname = lastname;
    this.firstname = firstname;
    this.username = username;
    this.email = email;
    this.emailVerified = emailVerified;
    this.realm = realm;
    this.password = password;
    this.roles = roles;
    this.profileImage = profileImage;
  }
}
