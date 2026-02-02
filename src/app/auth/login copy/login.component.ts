import { afterNextRender, Component, DestroyRef, inject, viewChild, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login-template',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
  
})
export class LoginTemplateComponent {
  private form = viewChild.required<NgForm>('loginForm');
  private destroyRef = inject(DestroyRef);

  constructor(){
    afterNextRender(()=> {
      const savedForm = window.localStorage.getItem('email');
      console.log('Saved form:', savedForm)
      if(savedForm){
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
              console.log('Saved email:', savedEmail)

       setTimeout(() => {
         this.form()?.controls['emailName']?.setValue(savedEmail);
        console.log('value changed', this.form()?.controls['emailName'].value) //name attribute
       }, 500);
      }
      const sub = this.form()?.valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value)=> {
          console.log('Form Value Changed:', value.emailName);
          window.localStorage.setItem('email', JSON.stringify({email: value.emailName}));
        }
      });
      this.destroyRef.onDestroy(()=> sub?.unsubscribe());
    })
  }

  onSubmit(formData: NgForm){
    if(formData.form.invalid){
      return;
    }
    console.log(formData);
    const email = formData.value.emailName;
    const password = formData.value.passwordName;
    console.log('Email:', email);
    console.log('Password:', password);

    formData.form.reset();
  }
}
