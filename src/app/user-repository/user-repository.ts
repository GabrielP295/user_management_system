import { inject, Injectable } from '@angular/core';
import { User, UsersServiceInterface, UserUpdateFields } from '../../model/Users';
import { DocumentReference, Firestore, collection, collectionData } from '@angular/fire/firestore';
import { doc, docData, addDoc, updateDoc, deleteDoc, CollectionReference } from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRepository implements UsersServiceInterface {
    private readonly firestore = inject(Firestore);
    private readonly collection: CollectionReference<User> = collection(this.firestore, 'users') as CollectionReference<User>;
    
    getAllUsers$(): Observable<User[]> {
        return collectionData(this.collection, { idField : 'id' }) as Observable<User[]>;
    }

    getUserById$(id: string): Observable<User | undefined> {
        const docRef = doc(this.collection, 'users', id);
        return docData(docRef, { idField: 'id' }) as Observable<User | undefined>;
    }

    createUser(user: Omit<User, 'id'>): Promise<DocumentReference<User>> {
        return addDoc(this.collection, user) as Promise<DocumentReference<User>>;
    }

    updateUser(id: string, updates: UserUpdateFields): Promise<void> {
        return updateDoc(doc(this.collection, 'users', id), updates);
    }

    deleteUser(id: string): Promise<void> {
        return deleteDoc(doc(this.collection, 'users', id));
    }
}
