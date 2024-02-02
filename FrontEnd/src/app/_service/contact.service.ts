import { Injectable } from '@angular/core';
import {AxiosService} from "./axios.service";
import {Observable} from "rxjs";
import {Contact} from "../models/contact";

const API = '/api/v1/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private axiosService: AxiosService) { }
  getAll(): Observable<Contact[]> {
    return new Observable((observer) => {
      this.axiosService.request(
        'GET',
        API,
        {}
      ).then(
        (response) => {
          if (response.status >= 200 && response.status < 300) {
            const contacts = response.data.map((item: any) => new Contact(item.id, item.name, item.username));
            observer.next(contacts);
            observer.complete();
          } else {
            console.error('failed with status code: ' + response.status);
            observer.error(response);
          }
        }
      ).catch(
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  getContactById(id: number | undefined): Observable<Contact> {
    return new Observable((observer) => {
      this.axiosService.request(
        'GET',
        API + "/" + id,
        {}
      ).then(
        (response) => {
          if (response.status >= 200 && response.status < 300) {
            const contactData = response.data;
            const contact = new Contact(contactData.id, contactData.name, contactData.username);
            observer.next(contact);
            observer.complete();
          } else {
            console.error('failed with status code: ' + response.status);
            observer.error(response);
          }
        }
      ).catch(
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  deleteContact(id: number): Observable<void> {
    return new Observable((observer) => {
      this.axiosService.request(
        'DELETE',
        API + "/" + id,
        {}
      ).then(
        (response) => {
          if (response.status >= 200 && response.status < 300) {
            observer.next(response);
            observer.complete();
          } else {
            console.error('failed with status code: ' + response.status);
            observer.error(response);
          }
        }
      ).catch(
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  createContact(contact: Contact): Observable<Contact> {
    return new Observable((observer) => {
      this.axiosService.request(
        'POST',
        API,
        {
          "name": contact.name,
          "username": contact.username
        }
      ).then(
        (response) => {
          if (response.status >= 200 && response.status < 300) {
            observer.next();
            observer.complete();
          } else {
            console.error('failed with status code: ' + response.status);
            observer.error(response);
          }
        }
      ).catch(
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  updateContact(id: number, contact: Contact): Observable<Contact> {
    return new Observable((observer) => {
      this.axiosService.request(
        'PUT',
        API + "/" + id,
        {
          "name": contact.name,
          "username": contact.username
        }
      ).then(
        (response) => {
          if (response.status >= 200 && response.status < 300) {
            observer.next();
            observer.complete();
          } else {
            console.error('failed with status code: ' + response.status);
            observer.error(response);
          }
        }
      ).catch(
        (error) => {
          observer.error(error);
        }
      );
    });
  }

}
