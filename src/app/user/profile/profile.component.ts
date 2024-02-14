import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileForm!: FormGroup;

  rand: number = Math.floor(Math.random() * 1000);

  user: User = {
    id: 0,
    email: "123@gmail.com",
    phone: "43 34531600",
    password: "123",
    confirmPassword: "123"
  };

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['José Vinícius'],
      password: ['123'],
      confirmPassword: ['123'],
      image: this.rand % 2 === 0 ? [''] : ['https://www.w3schools.com/w3images/avatar2.png']
    });
  }

  hasImage(): boolean {
    if (this.rand % 2 === 0)
      return false;

    return true;
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.profileForm.patchValue({
          image: reader.result as string
        });
      };
    }
  }

}
