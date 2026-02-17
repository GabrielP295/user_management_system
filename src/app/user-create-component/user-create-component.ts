import { Component, inject } from '@angular/core';
import { UsersService } from '../user-services/users-service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-create-component',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './user-create-component.html',
  styleUrl: './user-create-component.scss',
})
export class UserCreateComponent {
  userService = inject(UsersService);
  hobbyNumber = 1;

  userProperties: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    age: new FormControl(),
    aboutMe: new FormControl(),
    hobby1: new FormControl(),
    premiumUser: new FormControl(false),
  });

  createUser() {
    const hobbies: string[] = this.getHobbies();

    const newUser = this.userService.createUser(
      this.userProperties.value.firstName,
      this.userProperties.value.lastName,
      this.userProperties.value.email,
      this.userProperties.value.age,
      this.userProperties.value.aboutMe,
      hobbies,
      this.userProperties.value.premiumUser,
      'assets/images/default_profile_icon.jpg',
    );

    this.resetValues();
  }

  resetValues() {
    this.userProperties.reset();
    for (let i = 2; i <= this.hobbyNumber; i++) {
      this.userProperties.removeControl(`hobby${i}`);
    }
    this.hobbyNumber = 1;
  }

  getHobbies() {
    const hobbies: string[] = [];
    for (let i = 1; i <= this.hobbyNumber; i++) {
      hobbies.push(this.userProperties.value[`hobby${i}`]);
    }
    return hobbies;
  }

  addHobbyInput() {
    this.hobbyNumber++;
    this.userProperties.addControl(
      `hobby${this.hobbyNumber}`,
      new FormControl('', Validators.required),
    );
  }

  removeHobbyInput() {
    if (this.hobbyNumber <= 1) {
      return;
    }
    this.hobbyNumber--;
    this.userProperties.removeControl(`hobby${this.hobbyNumber}`);
  }
}
