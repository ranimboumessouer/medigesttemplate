import { Component, OnInit } from '@angular/core';
import * as userData from '../../../shared/data/user/user'
import { RouterLink } from '@angular/router';

import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { PatientsService } from '../../../services/patients.service';
@Component({
    selector: 'app-users-cards',
    templateUrl: './users-cards.component.html',
    styleUrls: ['./users-cards.component.scss'],
    imports: [BreadcrumbComponent, RouterLink]
})
export class UsersCardsComponent implements OnInit {

  //data
  public userCards = userData.userCards
  public fullData: any[] = [];
 constructor(private patientsService: PatientsService) {}

  loadData() {
    this.patientsService.getAllPatient().subscribe((data) => {
      console.log(data, 'data');
      this.fullData = data as any[];
    
      console.log(this.fullData, 'fullData');
      // this.availableTypes = data.map((d) => d.typeEqt);
      // const initialData = data.slice(1, 7);
      // this.createChart(initialData);
    });
  }

  ngOnInit(): void {
    console.log('ListPatients');
    this.loadData();
  }
}
