import {Component, EventEmitter, OnInit} from "@angular/core";
import {MaterializeAction} from "angular2-materialize";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent implements OnInit {
  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor() {
  }

  ngOnInit() {
  }

  addMember(): void {
    this.modalActions.emit({action: "modal", params: ["open"]});
    console.log("Add member clicked");
  }

  closeModal(): void {
    this.modalActions.emit({action: "modal", params: ["close"]});
    console.log("Close dialog clicked");
  }
}
