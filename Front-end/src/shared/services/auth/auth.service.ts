import {HTTP_METHOD} from "../rest/constants";
import {Injectable} from "@angular/core";
import {RestService} from "../rest/rest.service";

@Injectable()
export class AuthService {

  constructor(private rest: RestService) {
  }

  login(email: string, password: string): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.rest.request(HTTP_METHOD.POST, "Members/login", {
        email: email,
        password: password
      }).then(res => {
        AuthService.setSession(res);
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }

  registration(firstname: string, lastname: string, email: string, password: string): Promise<Object> {
    return this.rest.request(HTTP_METHOD.POST, "Members", {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    });
  }

  private static setSession(authResult): void {
    localStorage.setItem("id_token", authResult.id);
  }

  public static getToken(): string {
    return localStorage.getItem("id_token");
  }

  public logout(): void {
    localStorage.removeItem("id_token");
  }

  public static isLoggedIn(): boolean {
    return localStorage.getItem("id_token") != null;
  }

  public static isLoggedOut(): boolean {
    return !AuthService.isLoggedIn();
  }
}
