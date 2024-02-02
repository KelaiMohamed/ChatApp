import { Injectable } from '@angular/core';
import {AxiosService} from "./axios.service";
import {Observable} from "rxjs";
import {Message} from "../models/message";
import {Contact} from "../models/contact";

const API = '/api/v1/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private axiosService: AxiosService) { }
  getAll(): Observable<Message[]> {
    return new Observable((observer) => {
      this.axiosService.request(
        'GET',
        API,
        {}
      ).then(
        (response) => {
          if (response.status >= 200 && response.status < 300) {
            const messages = response.data.map((item: any) => new Message(item.content, item.timestamp, item.is_it_mine, item.otherUsername));
            observer.next(messages);
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

  createMessage(message: Message): Observable<Message> {

    console.log(message);
    return new Observable((observer) => {
      this.axiosService.request(
        'POST',
        API,
        {
          "content": message.content,
          "timestamp": message.timestamp,
          "otherUsername": message.otherUsername
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
