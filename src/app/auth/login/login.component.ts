import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
  
})
export class LoginComponent {


  onSubmit(formData: NgForm){
    if(formData.form.invalid){
      return;
    }
    console.log(formData);
    const email = formData.value.emailName;
    const password = formData.value.passwordName;
    console.log('Email:', email);
    console.log('Password:', password);
  }
}
