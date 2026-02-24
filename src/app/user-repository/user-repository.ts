import { inject, Injectable } from '@angular/core';
import { User, UsersServiceInterface, UserUpdateFields } from '../../model/Users';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserRepository implements UsersServiceInterface {
    private readonly firestore = inject(Firestore);
    private readonly collection = collection(this.firestore, 'users');
    
    getAllUsers(): User[] {
        return collectionData(this.collection, { idField : 'id' }) as any;
    }

      createUser(user: UserUpdateFields): any {
        return addDoc(this.collection, user);
      }
    
      updateUser(id: string, updates: UserUpdateFields): any {
        return updateDoc(doc(this.collection, 'users', id), updates);
      }
    
      deleteUser(id: string): any {
        return deleteDoc(doc(this.collection, 'users', id));
      }
}
