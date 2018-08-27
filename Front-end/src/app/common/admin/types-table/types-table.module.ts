import {MatButtonModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {TypesTableComponent} from "./types-table.component";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

@NgModule({
    declarations: [TypesTableComponent],
    imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatButtonModule],
    exports: [TypesTableComponent],
    providers: []
})
export class TypesTableModule {
}
