import { Component, OnInit } from '@angular/core';
import { PersonalComponent } from './personal/personal.component';
import { ContactsFilterComponent } from './contacts-filter/contacts-filter.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { FeatherIconComponent } from '../../shared/components/feather-icon/feather-icon.component';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    imports: [BreadcrumbComponent,FeatherIconComponent, ContactsFilterComponent, PersonalComponent]
})

export class ContactsComponent implements OnInit {

  public show: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  showPassword() {
    this.show = !this.show;
  }

}
