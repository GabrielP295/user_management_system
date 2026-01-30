import { Injectable } from '@angular/core';
import { User, UserCollection, UsersServiceInterface, UserUpdateFields } from '../../model/Users';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements UsersServiceInterface {
  private users: UserCollection = {};

  getAllUsers(): User[] {
    const userArray: User[] = [];
    for(const user in this.users) {
      userArray.push(this.users[user]);
    }
    return userArray;
  }

  createUser(firstName: string, lastName: string): boolean {
    const userId: string = crypto.randomUUID();
    const newUser: User = {
      id: userId,
      firstName: firstName,
      lastName: lastName,
    }
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
      }
    }
    this.users = newCollection;

    return true;
  }

  deleteUser(id: string): boolean {
    const { [id]: _, ...rest } = this.users;
    this.users = rest;
    return true;
  }
}
