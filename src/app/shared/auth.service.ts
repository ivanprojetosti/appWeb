import { Login } from '../users/shared/login';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afa: AngularFireAuth,
    private router: Router
  ) { }


  login(login: Login){
    return this.afa.signInWithEmailAndPassword(login.email, login.password)
  }

  logout(){
    this.afa.signOut();
    this.router.navigate(['/login']);
  }

}