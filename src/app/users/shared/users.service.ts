import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UsersPaciente } from './users-paciente';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersCollection: AngularFirestoreCollection<UsersPaciente>;

  constructor(private afs: AngularFirestore){
      this.usersCollection = this.afs.collection<UsersPaciente>('users');
  }

   getUsers(tipousuario: string){ // buscar todos
      // return this.afs.collection('symptoms', ref => ref.orderBy('name','asc'))
      // return this.afs.collection('users')
      return this.afs.collection('users', ref => ref.where('tipousuario', '==', tipousuario).orderBy('name','asc'))
        .snapshotChanges().pipe(
          map( changes => {
            return changes.map( s => {
              const id = s.payload.doc.id;
              const data = s.payload.doc.data() as UsersPaciente
              return { id, ...data };
            })
          })
        )
   }

   getUserSus(cartaosus: string){ // buscar todos
    // return this.afs.collection('symptoms', ref => ref.orderBy('name','asc'))
    // return this.afs.collection('users')
    return this.afs.collection('users', ref => ref.where('cartaosus', '==', cartaosus))
      .snapshotChanges().pipe(
        map( changes => {
          return changes.map( s => {
            const id = s.payload.doc.id;
            const data = s.payload.doc.data() as UsersPaciente
            return { id, ...data };
          })
        })
      )
 }

   getById(id: string){ // buscar por Id
      return this.usersCollection.doc<UsersPaciente>(id).valueChanges();
   }

}