import { Component } from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ManageContactsComponent} from "../manage-contacts/manage-contacts.component";
import {ConversationComponent} from "../conversation/conversation.component";
import {AuthService} from "../_service/auth.service";
import {AxiosService} from "../_service/axios.service";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgClass,
    ManageContactsComponent,
    ConversationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private authService:AuthService, private router:Router, private axiosService : AxiosService) {
  }

  active: string = "contacts";

  onContactsTab(): void {
    this.active = "contacts";
  }

  onConversationTab(): void {
    this.active = "conversation";
  }


  logOut() {
    this.authService.logout().subscribe(
      (response) => {
        this.axiosService.setAuthTokens(null, null);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error)
      }
    );
  }
}
