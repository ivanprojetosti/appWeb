import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
//import { Symptoms } from './interface/symptoms';
import { map } from 'rxjs/operators';
import { Symptoms } from './symptoms';
@Injectable({
  providedIn: 'root'
})
export class SymptomsService {
  //addSymptoms(symptoms: Symptoms) {
    //throw new Error('Method not implemented.');
  

private symptomsColletion: AngularFirestoreCollection<Symptoms>;
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage) { 
    this.symptomsColletion = this.afs.collection<Symptoms>('symptoms');

  }
  getAll(){  //BUSCAR TODOS
    //return this.afs.collection('symptoms', ref => ref.orderBy('name', 'asc'))
    return this.afs.collection('symptoms')
      .snapshotChanges().pipe(
        map( changes => {
   return changes.map( s=> {
   const id = s.payload.doc.id;
   const data = s.payload.doc.data() as Symptoms
   return {id, ...data};
      })
    })
   )
}

getById(id: string){  // BUSCAR POR ID
  return this.symptomsColletion.doc<Symptoms>(id).valueChanges();

}

addSymptoms (symptoms: Symptoms ){
//1 momento

this.afs.collection('symptoms').doc().set(Object.assign({}, symptoms))
//return this.symptomsColletion.add(symptoms);


//2 momemento
//criar id 

// const id = this.afs.createId();
// this.afs.collection('symptoms').doc(id).set(
// {
//   name: symptoms.name,
//   description: symptoms.description
// }
// )

}

updateSymptoms(symptoms: Symptoms, id: string){
  this.symptomsColletion.doc<Symptoms>(id).update(Object.assign({}, symptoms));

}

deleteSymptoms(id: string){
this.symptomsColletion.doc<Symptoms>(id).delete();

}


}
