import { Component , OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from '../environments/environment';
import { onBackgroundMessage } from "firebase/messaging/sw";
impo
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }
  message:any;

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebaseConfig.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log(" token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload :any) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
    
    onBackgroundMessage(messaging, (payload :any) => {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
    });
  }
  title = 'firebaseFCM';
}
