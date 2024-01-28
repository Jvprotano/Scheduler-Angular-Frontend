import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../account/models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileForm!: FormGroup;

  user: User = {
    id: 0,
    email: "123",
    password: "123",
    confirmPassword: "123"
  };

  constructor(private fb: FormBuilder) {
      this.profileForm = this.fb.group({
        name: ['José Vinícius'],
        email: ['jvprotano'],
        password: ['123'],
        confirmPassword: ['123'],
        image: ['']
      });
  }

  hasImage() : boolean{
    return false;
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
