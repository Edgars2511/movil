import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigateByUrl('/tabs/tab1');
  };
  goToRecupera() {
    this.router.navigateByUrl('/recupera');
  };
  goToRegistration() {
    this.router.navigateByUrl('/register');
  }

  ngOnInit() {
  }

}
