import {NotificationModule} from './common/navbar/notification/notification.module';
import {NotificationService} from '../shared/services/notification.service';
import {PasswordGenerator} from '../shared/utils/password.generator';
import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NavBarModule} from './common/navbar/nav-bar.module';
import {AuthService} from '../shared/services/auth/auth.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../shared/services/auth/token.interceptor';
import {RestService} from '../shared/services/rest/rest.service';
import {UnauthorizedInterceptor} from '../shared/services/auth/unauthorized.interceptor';
import {CommonPageModule} from './common/app-common.module';
import {ManageMemberModule} from './common/admin/manage-members';
import {AuthGuard} from './guards/auth-guard';
import {HomeIndexModule} from './common/index';
import {AdminGuard} from './guards/admin-guard';
import {GuardHelper} from './guards/guard-helper';
import {ManagerGuard} from './guards/manager-guard';
import {WeatherModule} from './common/index/weather';
import {IssueService} from '../shared/services/issue.service';
import {StateService} from '../shared/services/state.service';
import {TypeService} from '../shared/services/type.service';
import {InhabitantService} from '../shared/services/inhabitant.service';
import {MaterializeModule} from 'angular2-materialize';
import {IssuesModule} from './visualization/issues';
import {AppIssueDetailVisualizerModule} from './visualization/app-issue-detail-visualizer';
import {IssuesWrapperModule} from './visualization/app-issues-wrapper/issues-wrapper.module';
import {IssueModifierModule} from './visualization/issue-modifier/issue-modifier.module';
import {SearchBarModule} from './visualization/search-bar/search-bar.module';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import {MAT_DATE_LOCALE, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {ImportanceService} from "../shared/services/importance.service";
import {LocationService} from "../shared/services/location.service";
import {PriorityService} from "../shared/services/priority.service";
import {NumberCardDashboardModule} from "./common/index/charts/number-card/number-card-dashboard.module";
import {FileUploadService} from "../shared/services/file-upload.service";
import {HouseService} from "../shared/services/house.service";
import {ImageService} from "../shared/services/image.service";
import {RegisterModule} from "./common/homepage/register/register.module";
import {ConnectModule} from "./common/homepage/connect/connect.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TypesTableModule} from "./common/admin/types-table/types-table.module";
import {LocationsTableModule} from "./common/admin/locations-table/locations-table.module";
import {CommentaryService} from "../shared/services/commentary.service";
import {ProfilePageModule} from "./common/profile-page/profile-page.module";
import {ManageHouseModule} from "./common/admin/manage-house/manage-house.module";
import {AdminModule} from "./common/admin/app-admin.module";

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavBarModule,
    HomeIndexModule,
    ManageMemberModule,
    WeatherModule,
    AdminModule,
    CommonPageModule,
    MaterializeModule,
    IssuesModule,
    IssueModifierModule,
    AppIssueDetailVisualizerModule,
    IssuesWrapperModule,
    SearchBarModule,
    NotificationModule,
    NumberCardDashboardModule,
    TypesTableModule,
    LocationsTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RegisterModule,
    ProfilePageModule,
    ConnectModule,
    BrowserAnimationsModule,
    ManageHouseModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr'
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'fr-FR'
    },
    AuthService,
    RestService,
    IssueService,
    StateService,
    TypeService,
    InhabitantService,
    ImportanceService,
    LocationService,
    PriorityService,
    NotificationService,
    FileUploadService,
    HouseService,
    ImageService,
    CommentaryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    GuardHelper,
    AuthGuard,
    AdminGuard,
    ManagerGuard,
    PasswordGenerator
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
