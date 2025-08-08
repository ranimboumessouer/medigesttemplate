// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-patients',
//   imports: [],
//   templateUrl: './patients.component.html',
//   styleUrl: './patients.component.scss'
// })
// export class PatientsComponent {

// }

import { Component, OnInit } from "@angular/core";
import { PatientsService } from '../../../services/patients.service';

@Component({
  selector: "app-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.scss"],
})
export class PatientsComponent implements OnInit {
  patients: any[] = [];

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.patientsService.getAllPatient().subscribe({
      next: (data: any[]) => {
        this.patients = data;
      },
      error: (err: any) => {
        console.error("Erreur lors de la récupération des patients", err);
      },
    });
  }
}
