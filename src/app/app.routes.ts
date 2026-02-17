import { Routes } from '@angular/router';
import { UserCreateComponent } from './user-create-component/user-create-component';
import { UserEditComponent } from './user-edit-component/user-edit-component';
import { UserListComponent } from './user-list-component/user-list-component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-list-component',
    pathMatch: 'full',
  },
  {
    path: 'user-list-component',
    component: UserListComponent,
  },
  {
    path: 'user-create-component',
    component: UserCreateComponent,
  },
  {
    path: 'user-edit-component/:id',
    component: UserEditComponent,
  },
];
