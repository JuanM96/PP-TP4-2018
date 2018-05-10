import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase/app'; // for typings
import { FirebaseApp } from 'angularfire2'; // for methods
import 'firebase/storage';
/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class ImageProvider {
  
  constructor(public afAuth: AngularFireAuth,public afDb: AngularFireDatabase,private fb: FirebaseApp) {
    console.log('Hello ImageProvider Provider');
  }
  uploadImage(image: string, userId: string,imageName:string): any {
    let storageRef = this.fb.storage().ref();
    //let imageName = this.generateUUID();
    let imageRef = storageRef.child(`${userId}/${imageName}.jpg`);
    return imageRef.putString(image, 'data_url');
  }
  getImage(userId: string, imageId: string): any {
    let storageRef = this.fb.storage().ref();
    let imageRef = storageRef.child(`${userId}/${imageId}`);
    return imageRef.getDownloadURL();
  }
  private generateUUID(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
