import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../_service/auth.service";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  dat: any = {
    username: null,
    password: null,
  };
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit(): void {
    const { username, password } = this.dat;

    this.authService.login(username, password).subscribe(
      () => {
        // Redirect to another component upon successful login
        this.router.navigate(['/home']);
      },
      (error) => {
        // Handle login error
        console.error('Login failed:', error);
      }
    );
  }

}
