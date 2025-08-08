import { Component, OnInit } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-solid-input-style',
    templateUrl: './solid-input-style.component.html',
    styleUrls: ['./solid-input-style.component.scss'],
    imports: [FormsModule, NgSelectModule]
})
export class SolidInputStyleComponent implements OnInit {
  selectedIds: string[];
  selectedName = 'Vilnius';
  selectedId: number;
  selectedNumberIds: number[];

  constructor() { }

  cities2 = [
    {id: 1, name: '1'},
    {id: 2, name: '2'},
    {id: 3, name: '3'},
    {id: 4, name: '4'},
    {id: 5, name: '5'}
];
  ngOnInit(): void {
  }

}
