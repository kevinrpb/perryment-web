import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User, UserRole } from "../../shared/models/user.model";

import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { of, BehaviorSubject } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: BehaviorSubject<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.afAuth.authState.pipe(
      switchMap(user =>
        user ?
          this.afs.doc<User>(`users/${user.uid}`).valueChanges() :
          of(null)
      )
    ).subscribe(this.user$);
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);

    await this.updateUserData(credential.user);
  }

  private async updateUserData({
    uid,
    email,
    displayName,
    photoURL
  }) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${uid}`
    );

    const data: User = {
      uid,
      email,
      role: UserRole.user,
      displayName,
      photoURL
    };

    await userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.signOut();

    this.router.navigate(["/"]);
  }
}
