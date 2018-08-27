import {Component, OnInit} from '@angular/core';
import {InhabitantModel} from "../../../shared/models/InhabitantModel";
import {InhabitantService} from "../../../shared/services/inhabitant.service";
import {API_URL} from "../../../shared/services/rest/constants";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {matchOtherValidator} from "../validator/match-other-validator";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  passwordForm: FormGroup;

  loading: boolean = true;
  user: InhabitantModel;
  src: string;

  constructor(readonly service: InhabitantService, private formBuilder: FormBuilder, private router: Router) {
    this.refresh();
  }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      'old_pwd': new FormControl(null, Validators.required),
      'new_pwd': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'confirm_pwd': new FormControl(null, [Validators.required, Validators.minLength(8),
        matchOtherValidator('new_pwd')])
    });
  }

  get form_old() {
    return this.passwordForm.get("old_pwd");
  }

  get form_new() {
    return this.passwordForm.get("new_pwd");
  }

  get form_confirm() {
    return this.passwordForm.get("confirm_pwd");
  }

  refresh() {
    this.service.getCurrentMember();
    this.service.currentMember$.subscribe(user => {
      this.getImageUrl(user);
      this.loading = false;
      this.user = user;
    });
  }

  getImageUrl(user: InhabitantModel): void {
    this.src = "http://localhost:3000/api/ImageFiles/" + user.profileImage.id + "/download" + "?random+\=" + Math.random();
  }

  getUploadUrl(member: InhabitantModel): string {
    return API_URL + 'ImageFiles/' + member.profileImage.id + '/uploadAndReplace';
  }

  getToken(): string {
    return AuthService.getToken();
  }

  onChangePassword() {
    console.log(this.passwordForm.get('old_pwd'));
    console.log(this.passwordForm.get('new_pwd'));
    console.log(this.passwordForm.get('confirm_pwd'));
    if (this.passwordForm.valid) {
      const reg = this.passwordForm.getRawValue();
      this.service.changePassword(reg.old_pwd, reg.new_pwd).subscribe(() => {
        this.router.navigate(['/home/welcome']);
      });
    }
  }

  onUploadFinished(event) {
    this.refresh();
  }
}
