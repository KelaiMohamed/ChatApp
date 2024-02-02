import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../_service/auth.service";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        FormsModule,
        RouterLink,
        NgIf
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  dat: any = {
    firstname: null,
    lastname: null,
    username: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const { firstname, lastname, username, password } = this.dat;

    this.authService.register(firstname, lastname, username, password).subscribe(
      () => {
        // Redirect to home page upon successful registration
        this.router.navigate(['/home']);
      },
      (error) => {
        // Handle registration error
        console.error('Registration failed:', error);
      }
    );
  }

}
