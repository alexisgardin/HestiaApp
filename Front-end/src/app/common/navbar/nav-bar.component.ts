import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {AdminGuard} from '../../guards/admin-guard';
import {ManagerGuard} from '../../guards/manager-guard';
import {InhabitantService} from '../../../shared/services/inhabitant.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css'],
})

export class NavBarComponent implements OnInit {

    isAdmin: Promise<boolean>;
    isManager: Promise<boolean>;
    nameConnect: String;
    imageProfileId = 0;

    constructor(readonly auth: AuthService, readonly inhabitantService: InhabitantService, readonly adminGuard: AdminGuard, readonly managerGuard: ManagerGuard) {
    }

    ngOnInit() {
        this.isAdmin = this.adminGuard.canActivate();
        this.isManager = this.managerGuard.canActivate();
        this.inhabitantService.currentMember$.subscribe(value => {
            this.nameConnect = value.firstname + ' ' + value.lastname;
            this.inhabitantService.getProfileImage(value.id).subscribe(imgProfile => this.imageProfileId = imgProfile.id)
        });
    }

    public disconnect() {
        this.auth.logout();
    }
}
