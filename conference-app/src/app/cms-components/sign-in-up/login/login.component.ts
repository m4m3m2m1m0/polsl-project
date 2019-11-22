import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalMessage } from 'src/app/models/global-message.model';
import { GlobalMessageFacade } from 'src/app/store/features/global-message/facades/global-message.facade';
import { UserFacade } from 'src/app/store/features/user/facades/user.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    protected _fb: FormBuilder,
    protected _messageFacade: GlobalMessageFacade,
    protected _userFacade: UserFacade
  ) { }

  ngOnInit() {

    this.loginForm = this._fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  submitLoginForm() {

    if (this.loginForm.invalid) {
      const message: GlobalMessage = { message: 'One of the required field is improperly filled or empty!', action: 'Close', config: null };
      this._messageFacade.addGlobalMessage(message);
      return;
    }

    const form = {
      userName: this.loginForm.get('userName').value(),
      password: this.loginForm.get('password').value()
    }

    this._userFacade.loginUser(form);
  }
}
