import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationComponent} from "./notification.component";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {MaterializeModule} from "angular2-materialize";
import { NotificationPipe } from './notification.pipe';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,MaterializeModule, RouterModule
  ],
  declarations: [NotificationComponent, NotificationPipe]
  , exports: [NotificationComponent]
})
export class NotificationModule { }
