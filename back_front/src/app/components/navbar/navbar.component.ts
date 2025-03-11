import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userEmail: string;

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    // Obtener el correo del usuario al inicializar el componente
    this.userEmail = this.userDataService.getCorreo();
  }
}
