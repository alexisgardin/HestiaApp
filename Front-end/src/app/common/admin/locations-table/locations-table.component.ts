import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {LocationsTableDataSource} from './locations-table-data-source';
import {LocationModel} from "../../../../shared/models/LocationModel";
import {LocationService} from "../../../../shared/services/location.service";
import {InlineEditDialog} from "../inline-edit-dialog/inline-edit-dialog.component";

@Component({
    selector: 'types-table',
    templateUrl: './locations-table.component.html',
    styleUrls: ['./locations-table.component.css']
})
export class LocationsTableComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: LocationsTableDataSource;
    newLocation: string = '';

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['id', 'name', 'edit'];

    constructor(private service: LocationService, public dialog: MatDialog) {
    }

    refresh(): void {
        this.dataSource = new LocationsTableDataSource(this.paginator, this.sort, this.service);
    }

    ngOnInit() {
        this.refresh();
    }

    onInputChange(event) {
        this.newLocation = event.target.value;
    }

    onAddElement() {
        console.log(this.newLocation);
        if (this.newLocation !== '') {
            this.service.addLocation(this.newLocation).subscribe(() => this.refresh());
        }
    }

    updateElement(location: LocationModel) {
        this.service.updateLocation(location).subscribe();
    }

    editElement(location: LocationModel) {
        const dialogRef = this.dialog.open(InlineEditDialog, {
            data: location
        });

        const oldName = location.name;
        dialogRef.afterClosed().subscribe(result => {
            if (result && result.name !== '' && oldName !== result) {
                location.name = result.name;
                this.updateElement(location);
            } else {
                console.log(oldName);
                location.name = oldName;
            }
        });
    }
}
