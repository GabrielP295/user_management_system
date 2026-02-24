import { DocumentReference } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

export type UserUpdateFields = Partial<Omit<User, 'id'>>;

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  aboutMe: string;
  hobbies: string[];
  premiumUser: boolean;
  imageUrl: string;
}

export interface UserCollection {
  [key: string]: User;
}

export interface UsersServiceInterface {
  /*
    class that implements interface should also hold in memory private UserCollection
    
    cannot be defined within the interface because that would make the collection implicitly public and directly mutable,
    which doesn't support encapsulation oop principles
    */
  getAllUsers$(): Observable<User[]>;
  getUserById$(id: string): Observable<User | undefined>;

  createUser(user: Omit<User, 'id'>): Promise<DocumentReference<User>>;
  updateUser(id: string, updates: UserUpdateFields): Promise<void>;
  deleteUser(id: string): Promise<void>;
}
