import { Routes } from '@angular/router';
import { UserCreateComponent } from './user-create-component/user-create-component';
import { UserEditComponent } from './user-edit-component/user-edit-component';
import { UsersListComponent } from './users-list-component/users-list-component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'UsersListComponent',
        pathMatch: 'full',
    },
    {
        path: '/users',
        component: UsersListComponent,
    },
    {
        path: '/users/new',
        component: UserCreateComponent,
    },
    {
        path: 'users/:id/edit',
        component: UserEditComponent,
    }
];
