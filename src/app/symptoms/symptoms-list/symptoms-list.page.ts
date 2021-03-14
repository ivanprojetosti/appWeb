import { Component, OnInit } from '@angular/core';
import { SymptomsService } from '../shared/symptoms.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-symptoms-list',
  templateUrl: './symptoms-list.page.html',
  styleUrls: ['./symptoms-list.page.scss'],
})
export class SymptomsListPage implements OnInit {
symptoms: Observable<any[]>;
  constructor(private symptomsService:SymptomsService) { }

  ngOnInit() {
  this.getAll();
  

}


  getAll(){  
   this.symptoms = this.symptomsService.getAll();
    
  }


}
