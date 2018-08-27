import {MatButtonModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {LocationsTableComponent} from "./locations-table.component";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

@NgModule({
    declarations: [LocationsTableComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatButtonModule
    ],
    exports: [LocationsTableComponent],
    providers: []
})
export class LocationsTableModule {
}
