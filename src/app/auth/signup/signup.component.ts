import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function equalPasswordCheck(control1: string, control2: string) {
  return (control: AbstractControl)=> {

    const val1 = control.get(control1)?.value;
    const val2 = control.get(control2)?.value;
    if (val1 === val2) {
      return null;
    }
  
    return { unequalPassword: true }
  }

}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule]
})
export class SignupComponent {

  signupForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.email, Validators.required] }),
    passwords: new FormGroup({
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
      confirmPassword: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
    }, {
      validators: [equalPasswordCheck('password', 'confirmPassword')]
    }),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({

      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', { validators: [Validators.required] }),
    agree: new FormControl(false, { validators: [Validators.required] })
  })

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    console.log(this.signupForm);
    this.signupForm.reset();
    this.signupForm.controls.source.setValue([false, false, false]);
  }

  onReset() {
    this.signupForm.reset()

  }

}
