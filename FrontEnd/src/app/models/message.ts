export class Message {

  content: string;
  timestamp: string;
  is_it_mine: boolean;
  otherUsername: string;

  constructor(content: string, timestamp: string, is_it_mine: boolean, otherUsername: string) {
    this.content = content;
    this.timestamp = timestamp;
    this.is_it_mine = is_it_mine;
    this.otherUsername = otherUsername;
  }
}
