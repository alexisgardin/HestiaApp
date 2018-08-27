import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort} from '@angular/material';
import {TypesTableDataSource} from './types-table-datasource';
import {TypeService} from "../../../../shared/services/type.service";
import {TypeModel} from "../../../../shared/models/TypeModel";
import {InlineEditDialog} from "../inline-edit-dialog/inline-edit-dialog.component";

@Component({
    selector: 'types-table',
    templateUrl: './types-table.component.html',
    styleUrls: ['./types-table.component.css']
})
export class TypesTableComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: TypesTableDataSource;
    newType: string = '';

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['id', 'name', 'edit'];

    constructor(private service: TypeService, public dialog: MatDialog) {
    }

    refresh(): void {
        this.dataSource = new TypesTableDataSource(this.paginator, this.sort, this.service);
    }

    ngOnInit() {
        this.refresh();
    }

    onInputChange(event) {
        this.newType = event.target.value;
    }

    onAddElement() {
        console.log(this.newType);
        if (this.newType !== '') {
            this.service.addType(this.newType).subscribe(() => this.refresh());
        }
    }

    updateElement(type: TypeModel) {
        this.service.updateType(type).subscribe();
    }

    editElement(type: TypeModel) {
        const dialogRef = this.dialog.open(InlineEditDialog, {
            data: type
        });

        const oldName = type.name;
        dialogRef.afterClosed().subscribe(result => {
            if (result && result.name !== '' && oldName !== result) {
                type.name = result.name;
                this.updateElement(type);
            } else {
                console.log(oldName);
                type.name = oldName;
            }
        });
    }
}
