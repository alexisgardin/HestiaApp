import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {RestService} from "../../../../shared/services/rest/rest.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/services/auth/auth.service";
import {InhabitantService} from "../../../../shared/services/inhabitant.service";

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConnectComponent implements OnInit {
  loginForm: FormGroup;
  errorLog = false;
  style: object = {};
  params: object = {};

  constructor(readonly formBuilder: FormBuilder, readonly auth: AuthService, readonly rest: RestService, readonly router: Router, readonly inhabitantService: InhabitantService) {
  }


  /**
   * Initialize the two form for login and register
   */
  ngOnInit(): void {
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

    this.inhabitantService.countMember().subscribe(value => {
      if(value.count<1){
        this.router.navigateByUrl("/register");
      }
    });

    this.loginForm = this.formBuilder.group({
        email: [null, [Validators.required, Validators.email,
          Validators.pattern(/^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/)]],
        password: [null, [Validators.required, Validators.minLength(8)]]
      }
    );
  }

  /**
   * Login method, if the form is valid, we can sign in
   */
  onLogin(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value.email, this.loginForm.value.password)
        .then(res => {
          this.router.navigate(["/home/welcome"]);
        }).catch(err => {
        this.errorLog = true;
        console.log(err);
      });
    }
  }

  get email_log() {
    return this.loginForm.get("email");
  }

  get password_log() {
    return this.loginForm.get("password");
  }

}
