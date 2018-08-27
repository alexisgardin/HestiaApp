import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonPageComponent} from './common/app-common.component';
import {ManageMemberComponent} from './common/admin/manage-members';
import {AuthGuard} from './guards/auth-guard';
import {HomeIndexComponent} from './common/index';
import {AdminGuard} from './guards/admin-guard';
import {ManagerGuard} from './guards/manager-guard';
import {IssuesWrapperComponent} from './visualization/app-issues-wrapper/issues-wrapper.component';
import {ConnectComponent} from "./common/homepage/connect/connect.component";
import {RegisterComponent} from "./common/homepage/register/register.component";
import {TypesTableComponent} from "./common/admin/types-table/types-table.component";
import {LocationsTableComponent} from "./common/admin/locations-table/locations-table.component";
import {ProfilePageComponent} from "./common/profile-page/profile-page.component";
import {ManageHouseComponent} from "./common/admin/manage-house/manage-house.component";
import {AdminComponent} from "./common/admin/app-admin.component";

const routes: Routes = [
  {path: '', redirectTo: 'connect', pathMatch: 'full'},
  {path: 'connect', component: ConnectComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'home', component: CommonPageComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      {
        path: 'admin', component: AdminComponent, canActivate: [AdminGuard], canActivateChild: [AdminGuard],
        children: [
          {path: 'members', component: ManageMemberComponent},
          {path: 'types', component: TypesTableComponent},
          {path: 'locations', component: LocationsTableComponent},
          {path: 'house', component: ManageHouseComponent}
        ]
      },
      {path: 'profile', component: ProfilePageComponent},
      {path: 'welcome', component: HomeIndexComponent},
      {path: 'issues', component: IssuesWrapperComponent, canActivate: [ManagerGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
