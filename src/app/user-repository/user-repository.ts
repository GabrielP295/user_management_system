import { Injectable } from '@angular/core';
import { User, UsersServiceInterface } from '../../model/Users';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserRepository implements UsersServiceInterface {
    
    getAllUsers(): User[] {
        
    }

      createUser(
        firstName: string,
        lastName: string,
        email: string,
        age: number,
        aboutMe: string,
        hobbies: string[],
        premiumUser: boolean,
        imageUrl: string
      ): boolean {

      }
    
      updateUser(id: string, updates: UserUpdateFields): boolean {

      }
    
      deleteUser(id: string): boolean {
        
      }
}
