import { afterNextRender, Component, DestroyRef, inject, viewChild, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
  
})
export class LoginComponent {
  private form = viewChild<NgForm>('loginForm');
  private destroyRef = inject(DestroyRef);

  constructor(){
    afterNextRender(()=> {
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
