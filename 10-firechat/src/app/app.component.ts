import { Component } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { ChatService } from "./providers/chat.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public chats: Observable<any>;

  title = 'firechat';
  constructor(firestore: AngularFirestore, public _cs: ChatService) {
    this.chats = firestore.collection('chats').valueChanges();
  }
}
