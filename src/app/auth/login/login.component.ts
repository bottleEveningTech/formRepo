import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, Observable, of } from 'rxjs';

function mustContainQuestionMark(control:AbstractControl){
  if(control.value.includes('?')){
    return null;
  }
  return {noQuestionMark: true};
}

function emailUnique(control:AbstractControl){
  if(control.value !== "test@example.com"){
    return of(null);
  }
  return of({notUnique: true});
}

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('savedForm');
const parsedForm = savedForm? JSON.parse(savedForm): '';
initialEmailValue = parsedForm.email; 

@Component({
  selector: 'app-login-reactive',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit{

  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {

    // const savedForm = window.localStorage.getItem('savedForm');
    // if(savedForm){
    //   const val = JSON.parse(savedForm);
    //   // this.loginForm.controls.email.setValue
    //   this.loginForm.patchValue({
    //     email: val.email
    //   })
    // }
    const sub = this.loginForm.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value)=> {
        window.localStorage.setItem('savedForm', JSON.stringify({email: value.email}))
      }
    });
    this.destroyRef.onDestroy(()=> {
      sub.unsubscribe();
    })
  }

  loginForm = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailUnique]
    }),
    password: new FormControl('', [Validators.required, Validators.minLength(6), mustContainQuestionMark])
  });

  onSubmit(){
    console.log(this.loginForm);
    const enteredEmail = this.loginForm.controls.email;
    console.log(enteredEmail);
  }
}