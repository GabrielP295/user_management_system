import { inject, Injectable } from '@angular/core';
import { UsersServiceInterface } from '../../model/Users';
import { readonly } from '@angular/forms/signals';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { serverTimestamp, query, where, CollectionReference, DocumentReference, WhereFilterOp, orderBy, QueryConstraint } from 'firebase/firestore';
import { catchError, Observable, throwError } from 'rxjs';
import { constant } from 'firebase/firestore/pipelines';

export type FormValue<T extends UsersServiceInterface> = Omit<T, 'id' | 'firstName'>;//TODO Add all the properties of users

export type SortDirection = 'asc' | 'desc';

export interface SortOptions<T> {
  field: keyof T;
  direction: SortDirection;
}

export class ServiceError extends Error {
  constructor (
    public readonly operation: string,
    public readonly collection: string,
    cause: unknown // may need to switch to null to avoid compile issue
  ) {
    super (
      `[${collection}:: ${operation}] ${cause instanceof Error ? cause.message : String(cause)}`
    )
    this.name = 'ServiceError'
  }
}

//single firestore where-clause descriptor
export interface WhereClause<T> {
  field: keyof T & string;
  op: WhereFilterOp;
  value: unknown; // may need to switch to null if errors compiling
}

@Injectable({
  providedIn: 'root',
})

export class UserRepository<T extends UserRepository> implements UsersServiceInterface {
  protected readonly firestore = inject(Firestore);
  protected readonly colRef: CollectionReference;

  constructor(protected readonly collectionName: string) {
    this.colRef = collection(this.firestore, collectionName);
  }

  getAll$(sort?: SortOptions<T>): Observable<T>[] {
    const field = (sort?.field ?? 'createdAt') as string;
    const dir = sort?.direction ?? 'desc';
    const q = query(this.colRef, orderBy(field, dir));
    return this.streamCollection(q);
  }

  getWhere$(clauses: WhereClause<T>[], sort?: SortOptions<T>): Observable<T>[] {
    const constraints: QueryConstraint[] = clauses.map(c =>
      where(c.field, c.op, c.value)
    );
    const field = (sort?.field ?? 'createdAt') as string;
    const dir = sort?.direction ?? 'desc';
    constraints.push(orderBy(field, dir));
    return this.streamCollection(query(this.colRef, ...constraints));
  }

  getById$(id: string): Observable<T | undefined>[] {
    const ref = doc(
      this.firestore,
      this.collectionName,
      id
    ) as DocumentReference<T>;
    return docData(ref, {idField: 'id'}) as Observable<T | undefined>).pipe(
      catchError(err =>
        throwError(() => new ServiceError('getById$', this.collectionName, err))
      )
    )
  }
}
