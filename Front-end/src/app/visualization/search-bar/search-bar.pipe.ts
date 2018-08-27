import {Pipe, PipeTransform} from "@angular/core";
import {IssueModel} from "../../../shared/models/IssueModel";

@Pipe({
  name: "searchBar"
})
export class SearchBarPipe implements PipeTransform {

  transform(values: IssueModel[], search: string, filters: string[]) {
    if (!values) {
      return values;
    }
    if (values == null) {
      return;
    }
    if (values) {
      values.sort(a => a.state.value);
      return values.filter(issue => {
        return this.applyFilter(issue, search, filters);
      });
    }
  }

  applyFilter(issue: IssueModel, search: string, filters: string[]): boolean {
    let searchBool = true;
    if (search) {
      search = search.toLowerCase();
      searchBool = issue.author.lastname.toLowerCase().includes(search)
        || issue.author.firstname.toLowerCase().includes(search)
        || issue.description.toLowerCase().includes(search)
        || issue.location.name.toLowerCase().includes(search)
        || issue.title.toLowerCase().includes(search);
    }
    let filtered = filters.length === 0;
    filters.forEach(filter => {
      if (!filtered && (
        (filter === "filter-Résolu" && issue.state.value === 1) ||
        (filter === "filter-En cours de résolution" && issue.state.value === 0) ||
        (filter === "filter-Non résolu" && issue.state.value === -1) ||
        (filter === "filter-Matériel" && issue.type.value === 1) ||
        (filter === "filter-Dégâts des eaux" && issue.type.value === 2) ||
        (filter === "filter-Electrique" && issue.type.value === 3) ||
        (filter === "filter-Incendie" && issue.type.value === 4) ||
        (filter === "filter-Autres" && issue.type.value === 5) ||
        (filter === "filter-Basse" && issue.priority.value === 1) ||
        (filter === "filter-Moyenne" && issue.priority.value === 2) ||
        (filter === "filter-Haute" && issue.priority.value === 3))) {
        filtered = true;
      }
    });
    return filtered && searchBool;
  }
}
