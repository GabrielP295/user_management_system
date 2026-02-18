import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../user-services/users-service';
import {
  Form,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-create-component',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './user-create-component.html',
  styleUrl: './user-create-component.scss',
})
export class UserCreateComponent implements OnInit {
  userService = inject(UsersService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  isEditMode: boolean = false;
  userId: string = null!;
  buttonClicked: boolean = false;
  successMessage: string = '';
  showSuccess: boolean = false;

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;

    if (this.userId) {
      this.isEditMode = true;
      this.prefillFormForEditMode();
    }
  }

  userProperties: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    aboutMe: new FormControl(),
    hobbies: new FormArray([new FormControl()]),
    premiumUser: new FormControl(false),
  });

  prefillFormForEditMode() {
    const user = this.userService.getUserById(this.userId);
    if (user) {
      const hobbiesArray = this.userProperties.get('hobbies') as FormArray;

      // Clear all existing hobby FormControls
      while (hobbiesArray.length > 0) {
        hobbiesArray.removeAt(0);
      }

      // Add the correct number of FormControls with the user's hobby values
      user.hobbies.forEach((hobby) => {
        hobbiesArray.push(new FormControl(hobby));
      });

      // Set values for non-FormArray controls
      this.userProperties.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        aboutMe: user.aboutMe,
        premiumUser: user.premiumUser,
      });
    }
  }

  onSubmitUser() {
    this.buttonClicked = true;

    if (this.userProperties.invalid) {
      return;
    }

    const hobbies = this.userProperties.get('hobbies')!.value;
    const user = {
      firstName: this.userProperties.value.firstName,
      lastName: this.userProperties.value.lastName,
      email: this.userProperties.value.email,
      age: this.userProperties.value.age,
      aboutMe: this.userProperties.value.aboutMe,
      hobbies,
      premiumUser: this.userProperties.value.premiumUser,
      profileImage: 'assets/images/default_profile_icon.jpg',
    };

    if (this.isEditMode) {
      this.updateUser(user);
      this.router.navigate(['/user-list-component']);
      return;
    }

    // Store the name for success message before resetting
    this.successMessage = `${user.firstName} ${user.lastName} was created successfully!`;
    this.showSuccess = true;

    this.createUser(user);
    this.resetValues();

    // Auto-hide success message after 4 seconds
    setTimeout(() => {
      this.showSuccess = false;
    }, 4000);
  }

  createUser(user: any) {
    this.userService.createUser(
      user.firstName,
      user.lastName,
      user.email,
      user.age,
      user.aboutMe,
      user.hobbies,
      user.premiumUser,
      user.profileImage,
    );
  }

  updateUser(user: any) {
    this.userService.updateUser(this.userId, user);
  }

  resetValues() {
    this.userProperties.reset();
    this.buttonClicked = false;
    const hobbiesArray = this.userProperties.get('hobbies') as FormArray;
    while (hobbiesArray.length > 1) {
      hobbiesArray.removeAt(hobbiesArray.length - 1);
    }
    hobbiesArray.reset();
  }

  getHobbies(): FormArray {
    return this.userProperties.get('hobbies') as FormArray;
  }

  addHobbyInput() {
    const hobbiesArray = this.userProperties.get('hobbies') as FormArray;
    hobbiesArray.push(new FormControl());
  }

  removeHobbyInput() {
    const hobbiesArray = this.userProperties.get('hobbies') as FormArray;
    if (hobbiesArray.length > 1) {
      hobbiesArray.removeAt(hobbiesArray.length - 1);
    }
  }
}
