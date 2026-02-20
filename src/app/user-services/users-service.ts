import { Injectable } from '@angular/core';
import { User, UserCollection, UsersServiceInterface, UserUpdateFields } from '../../model/Users';

@Injectable({
  providedIn: 'root',
})

export class UsersService implements UsersServiceInterface {
  private users: UserCollection = {};

  getAllUsers(): User[] {
    const userArray: User[] = [];
    for (const user in this.users) {
      userArray.push(this.users[user]);
    }
    return userArray;
  }

  getUserById(id: string) {
    return this.users[id];
  }

  createUser(
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    aboutMe: string,
    hobbies: string[],
    premiumUser: boolean,
    imageUrl: string,
  ): boolean {
    const userId: string = crypto.randomUUID();
    const newUser: User = {
      id: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      age: age,
      aboutMe: aboutMe,
      hobbies: hobbies,
      premiumUser: premiumUser,
      imageUrl: imageUrl,
    };
    this.users[userId] = newUser;
    return true;
  }

  updateUser(id: string, updates: UserUpdateFields): boolean {
    const userToUpdate: User = this.users[id];

    if (!userToUpdate) {
      return false;
    }

    const newCollection: UserCollection = {
      ...this.users,
      [id]: {
        ...userToUpdate,
        ...updates,
        id: userToUpdate.id, // Ensure id is never updated
      },
    };
    this.users = newCollection;

    return true;
  }

  deleteUser(id: string): boolean {
    console.log('Deleting user with id:', id);
    const { [id]: _, ...rest } = this.users;
    this.users = rest;
    return true;
  }
}
