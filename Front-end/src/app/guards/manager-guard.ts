import {CanActivate, CanActivateChild} from "@angular/router";
import {Injectable} from "@angular/core";
import {GuardHelper} from "./guard-helper";

@Injectable()
export class ManagerGuard implements CanActivate, CanActivateChild {

  constructor(readonly helper: GuardHelper) {
  }

  canActivateChild(): Promise<boolean> {
    return this.canActivate();
  }

  canActivate(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.helper.canActivateRole("admin").then(value => {
        if (value) {
          resolve(true);
        }

        this.helper.canActivateRole("manager").then(value2 => {
          if (value2) {
            resolve(true);
          }

          resolve(false);
        });
      });
    });
  }
}
