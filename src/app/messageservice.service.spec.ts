import { TestBed } from '@angular/core/testing';

import { MessageserviceService } from './messageservice.service';
import { FirebaseApp } from "angularfire2";
import * as firebase from 'firebase/app';
import 'firebase/messaging';  

describe('MessageserviceService', () => {
  let service: MessageserviceService;
  private messaging: firebase.messaging.Messaging; 

    constructor(
    private angularFireMessaging: AngularFireMessaging,
    @Inject(FirebaseApp) private _firebaseApp: firebase.app.App) {
    this.messaging = firebase.messaging(this._firebaseApp);
    }

    
   receiveMessage(): void {
    this.messaging.onMessage(payload => {
      // console.error('new Notification received. ', payload); 
        this.currentMessage.next(payload);
        });
      }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
