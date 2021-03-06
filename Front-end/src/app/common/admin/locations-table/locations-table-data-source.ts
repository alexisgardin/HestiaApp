import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable} from 'rxjs';
import {LocationModel} from "../../../../shared/models/LocationModel";
import {LocationService} from "../../../../shared/services/location.service";

/**
 * Data source for the TypesTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class LocationsTableDataSource extends DataSource<LocationModel> {
    data: Observable<LocationModel[]> = this.service.getLocations();
    length: Observable<number> = this.data.map(v => v.length);

    constructor(private paginator: MatPaginator, private sort: MatSort, private service: LocationService) {
        super();
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<LocationModel[]> {
        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        const dataMutations = [
            this.data,
            this.paginator.page,
            this.sort.sortChange
        ];

        return merge(...dataMutations).mergeMap(() => {
            return this.data.map(values => {

                // Set the paginators length
                this.paginator.length = values.length;

                return this.getPagedData(this.getSortedData(values))
            });
        });
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() {
    }

    /**
     * Paginate the data (client-side). If you're using server-side pagination,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getPagedData(data: LocationModel[]): LocationModel[] {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: LocationModel[]): LocationModel[] {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'name':
                    return compare(a.name, b.name, isAsc);
                case 'id':
                    return compare(+a.id, +b.id, isAsc);
                default:
                    return 0;
            }
        });
    }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
