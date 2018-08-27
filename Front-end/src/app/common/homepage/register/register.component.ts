import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from "../../validator/match-other-validator";
import {AuthService} from "../../../../shared/services/auth/auth.service";
import {HouseService} from "../../../../shared/services/house.service";
import {InhabitantService} from "../../../../shared/services/inhabitant.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLinear = true;
  registerForm: FormGroup;
  adressForm: FormGroup;
  alreadyExistEmail: boolean = false;
  style: object = {};
  params: object = {};
  waitingEmail: boolean = false;
  emailValidate: boolean = false;
  private idAdmin = -1;
  apiTimer: any;

  constructor(readonly _formBuilder: FormBuilder, readonly authService: AuthService, readonly houseService: HouseService, readonly inhabitantService: InhabitantService, readonly router: Router) {
  }

  ngOnInit() {
    this.style = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };

    this.params = {
      "particles": {
        "number": {
          "value": 160,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 1,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 4,
            "size_min": 0.3,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 600
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "bubble"
          },
          "onclick": {
            "enable": true,
            "mode": "repulse"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 250,
            "size": 0,
            "duration": 2,
            "opacity": 0,
            "speed": 3
          },
          "repulse": {
            "distance": 400,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    };

    this.registerForm = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [null, [Validators.required, Validators.email,
        Validators.pattern(/^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword_reg: [null,
        [Validators.required, Validators.minLength(8),
          matchOtherValidator("password")]
      ]
    });
    this.adressForm = this._formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      departement: [null, [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      country: ['', Validators.required],
    });

    this.apiTimer = setInterval(() => {
      if (this.idAdmin > 0) {
        this.inhabitantService.getMember(this.idAdmin).subscribe(value => {
          this.emailValidate = value.emailVerified;
        });
        if (this.emailValidate) {
          this.router.navigateByUrl("/connect");
        }
      }
    }, (8000));
  }

  ngOnDestroy() {
    clearInterval(this.apiTimer);
  }

  /**
   * Registration method, if the form is valid, we can register
   */
  onRegistration(): void {
    if (this.registerForm.valid) {
      const reg = this.registerForm.getRawValue();
      this.authService.registration(reg.firstname, reg.lastname, reg.email, reg.password)
        .then((res: any) => {
          this.submitAdresse();
          this.idAdmin = res.id;
          this.waitingEmail = true;
        }).catch(err => {
        this.alreadyExistEmail = err.error.error.details.messages.email[0] === "Email already exists";
      });
    }
  }


  /**
   * Get the input of the forms, with this we can use for exemple, *ngif(email.valid)
   */
  get email_reg() {
    return this.registerForm.get("email");
  }

  get firstname() {
    return this.registerForm.get("firstname");
  }

  get lastname() {
    return this.registerForm.get("lastname");
  }

  get password_reg() {
    return this.registerForm.get("password");
  }

  get confirmPassword_reg() {
    return this.registerForm.get("confirmPassword_reg");
  }

  submitAdresse() {
    const adresse = this.adressForm.getRawValue();
    this.houseService.setHouse(adresse).subscribe();
  }

}
