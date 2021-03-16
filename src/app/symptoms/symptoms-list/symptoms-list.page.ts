import { Component, OnInit } from '@angular/core';
import { SymptomsService } from '../shared/symptoms.service';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/shared/toast.service';
@Component({
  selector: 'app-symptoms-list',
  templateUrl: './symptoms-list.page.html',
  styleUrls: ['./symptoms-list.page.scss'],
})
export class SymptomsListPage implements OnInit {
symptoms: Observable<any[]>;
  constructor(private symptomsService:SymptomsService,
              private toast: ToastService) { }

  ngOnInit() {
  this.getAll();
  

}


  getAll(){  
   this.symptoms = this.symptomsService.getAll();
    
  }
  removeSymptom(id: string){
    this.symptomsService.deleteSymptoms(id);
  try {
    this.toast.showMessageBottom('Sintoma exluído com sucesso!!', 'success');
    this.getAll();
  } catch (error) {
    this.toast.showMessageTop(error, 'danger')
  }
  
  }

}
