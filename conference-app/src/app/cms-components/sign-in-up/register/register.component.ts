import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalMessage } from 'src/app/models/global-message.model';
import { GlobalMessageFacade } from 'src/app/store/features/global-message/facades/global-message.facade';
import { UserFacade } from 'src/app/store/features/user/facades/user.facade';
import { PasswordValidator } from './validators/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    protected _fb: FormBuilder,
    protected _messageFacade: GlobalMessageFacade,
    protected _userFacade: UserFacade
  ) { }

  ngOnInit() {

    this.registerForm = this._fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordValidator('password', 'confirmPassword')
    });

  }

  get confirmPassword() { return this.registerForm['controls'].confirmPassword }
  get password() { return this.registerForm['controls'].password }

  submitRegisterForm() {

    if (this.registerForm.invalid) {
      const message: GlobalMessage = { message: 'One of the required field is improperly filled or empty!', action: 'Close', config: null };
      this._messageFacade.addGlobalMessage(message);
      return;
    }

    const form = {
      userName: this.registerForm.get('userName').value,
      password: this.registerForm.get('password').value
    }

    this._userFacade.registerUser(form);
  }

}
