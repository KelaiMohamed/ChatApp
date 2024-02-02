import {Component, OnInit} from '@angular/core';
import {Contact} from "../models/contact";
import {ContactService} from "../_service/contact.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-manage-contacts',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './manage-contacts.component.html',
  styleUrl: './manage-contacts.component.css'
})
export class ManageContactsComponent implements OnInit{
  contacts: Contact[] = [];
  currentContact: Contact = new Contact(-1, "", "");
  isEdit: boolean = false;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getAll().subscribe((data) => {
      this.contacts = data;
    });
  }

  saveContact() {
    if (this.isEdit) {
      if (this.currentContact.id != null) {
        this.contactService
          .updateContact(this.currentContact.id, this.currentContact)
          .subscribe(() => {
            this.loadContacts();
            this.clearForm();
          });
      }
    } else {
      this.contactService
        .createContact(this.currentContact)
        .subscribe(() => {
          this.loadContacts();
          this.clearForm();
        });
    }
  }

  editContact(id: number) {
    this.contactService.getContactById(id).subscribe((data) => {
      this.currentContact = data;
      this.isEdit = true;
    });
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe(() => {
      this.loadContacts();
    });
  }

  clearForm() {
    this.currentContact = new Contact(-1, "", "");
    this.isEdit = false;
  }

  cancelEdit() {
    this.clearForm();
  }
}
