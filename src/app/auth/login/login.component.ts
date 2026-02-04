import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function mustContainQuestionMark(control:AbstractControl){
  if(control.value.includes('?')){
    return null;
  }
  return {noQuestionMark: true};
}
@Component({
  selector: 'app-login-reactive',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', [Validators.required, Validators.minLength(6), mustContainQuestionMark])
  });

  onSubmit(){
    console.log(this.loginForm);
    const enteredEmail = this.loginForm.controls.email;
    console.log(enteredEmail);
  }
}