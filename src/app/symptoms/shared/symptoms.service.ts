import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
//import { Symptoms } from './interface/symptoms';
import { finalize, map } from 'rxjs/operators';
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

addSymptoms (symptoms: Symptoms, file: File){
//1 momento

//this.afs.collection('symptoms').doc().set(Object.assign({}, symptoms))
//return this.symptomsColletion.add(symptoms);


//2 momemento
//criar id 

 const id = this.afs.createId();
this.afs.collection('symptoms').doc(id).set(
{
  name: symptoms.name,
  description: symptoms.description
}
)
if(file){
  this.uploadImg(id, file);
}



}



// updateSymptoms(symptoms: Symptoms, id: string){
//   this.symptomsColletion.doc<Symptoms>(id).update(Object.assign({}, symptoms));

// }


updateSymptoms(symptoms: Symptoms, id: string, file: File){
  this.symptomsColletion.doc<Symptoms>(id).update(Object.assign({}, symptoms));
  if(file){
    this.uploadImg(id, file);
  }
}



deleteSymptoms(id: string, filePath: string){
  this.symptomsColletion.doc<Symptoms>(id).delete();
  if(filePath){
    this.removerImg(id, filePath, false);
  }

}




// uploadImg(id: string, file: File){
//   // /symptoms/id/file.name

//    const filePath = `symptoms/${id}/${file.name}`;
//    const ref = this.storage.ref(filePath);
//    const taks = ref.put(file);
//    taks.snapshotChanges().pipe(
//      finalize( ()=> {
//        ref.getDownloadURL().subscribe( (url: any) => {
//          this.symptomsColletion.doc<Symptoms>(id).update({ imgUrl: url, filePatch: filePath })
//        })
//      })
//    ).subscribe();
// }


// removerImg(id: string, filePath: string, atualizarSymptoms: boolean = true){
//   const ref = this.storage.ref(filePath);
//   ref.delete();
//   if(atualizarSymptoms){
//     this.symptomsColletion.doc<Symptoms>(id).update({ imgUrl: '', filePatch:''});
//   }
// }

uploadImg(id: string, file: File){
  // /symptoms/id/file.name

   const filePath = `symptoms/${id}/${file.name}`;
   const ref = this.storage.ref(filePath);
   const taks = ref.put(file);
   taks.snapshotChanges().pipe(
     finalize( ()=> {
       ref.getDownloadURL().subscribe( (url: any) => {
         this.symptomsColletion.doc<Symptoms>(id).update({ imgUrl: url, filePath: filePath })
       })
     })
   ).subscribe();
}

// removerImg(id: string, filePath: string, atualizarSymptoms: boolean = true){
//    const ref = this.storage.ref(filePath);
//    ref.delete();
//    if(atualizarSymptoms){
//      this.symptomsColletion.doc<Symptoms>(id).update({ imgUrl: '', filePatch: ''});
//    }
// }

removerImg(id: string, filePath: string, atualizarSymptoms: boolean = true){
  const ref = this.storage.ref(filePath);
  ref.delete();
  if(atualizarSymptoms){
    this.symptomsColletion.doc<Symptoms>(id).update({ imgUrl: '', filePath: ''});
  }


}
}

