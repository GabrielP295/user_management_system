import { Injectable } from '@angular/core';
import { UsersServiceInterface } from '../../model/Users';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserRepository implements UsersServiceInterface {}
