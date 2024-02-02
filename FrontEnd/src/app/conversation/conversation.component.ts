import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Message} from "../models/message";
import {Contact} from "../models/contact";
import {ContactService} from "../_service/contact.service";
import {MessageService} from "../_service/message.service";

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class ConversationComponent implements OnInit{
  newMessageContent: string = "";
  selectedContact: Contact = new Contact(-1, "", "");
  selectedContactMessages: Message[] = [];
  contacts: Contact[] = [];
  messages: Message[] = [];


  constructor(private contactService : ContactService, private messageService: MessageService) {
  }
  sendMessage() {

    if(this.newMessageContent != ""){
      this.messageService.createMessage(
        new Message(this.newMessageContent,
          new Date().getTime().toString(),
          true,
          this.selectedContact.username)).subscribe(
        (response) => {
          this.newMessageContent = "";
          this.loadAllMessages();
          this.selectContact(this.selectedContact);
        },
        (error) => {
          console.log(error)
        }
      );
    }

  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
    this.selectedContactMessages = [];
    this.messages.forEach(message =>{
      if(message.otherUsername === contact.username){
        this.selectedContactMessages.push(message);
      }
    })

    // Sort the selectedContactMessages based on the timestamp
    this.selectedContactMessages.sort((a, b) => {
      // Convert timestamps to Date objects for comparison
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);

      // Compare the dates
      return dateA.getTime() - dateB.getTime();
    });

  }

  ngOnInit(): void {
    this.loadAllContacts();
    this.loadAllMessages();
  }

  private loadAllContacts() {
    this.contactService.getAll().subscribe((data) => {
      this.contacts = data;
    });

  }
  private loadAllMessages() {
    this.messageService.getAll().subscribe((data) => {
      this.messages = data;
    });

  }
}
