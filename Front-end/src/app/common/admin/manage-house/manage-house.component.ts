import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HouseService} from "../../../../shared/services/house.service";
import {HouseModel} from "../../../../shared/models/HouseModel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-house',
  templateUrl: './manage-house.component.html',
  styleUrls: ['./manage-house.component.css']
})
export class ManageHouseComponent implements OnInit {

  adressForm: FormGroup;
  house: HouseModel;

  constructor(readonly houseService: HouseService, readonly _formBuilder: FormBuilder, readonly router: Router) {
  }

  ngOnInit() {
    this.houseService.getHouse().subscribe(value => {
      this.house = value[0];
    });
    this.adressForm = this._formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      departement: [null, [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      country: ['', Validators.required]
    });
  }

  submitAdresse() {
    if (this.adressForm.valid) {
      const adresse = this.adressForm.getRawValue();
      this.house.city = adresse.city;
      this.house.country = adresse.country;
      this.house.street = adresse.street;
      this.house.departement = adresse.departement;
      this.houseService.setHouse(this.house).subscribe();
      this.router.navigateByUrl('/home/welcome');
    }
  }
}
