import { Component, OnInit } from '@angular/core';
import { FeatherIconComponent } from '../../../../shared/components/feather-icon/feather-icon.component';


@Component({
    selector: 'app-login-simple',
    templateUrl: './login-simple.component.html',
    styleUrls: ['./login-simple.component.scss'],
    imports: [FeatherIconComponent]
})
export class LoginSimpleComponent implements OnInit {

 
  public show: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  showPassword() {
    this.show = !this.show;
  }

}
