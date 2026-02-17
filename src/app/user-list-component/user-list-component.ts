import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../user-services/users-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list-component',
  imports: [RouterLink],
  templateUrl: './user-list-component.html',
  styleUrl: './user-list-component.scss',
})
export class UserListComponent {
  userService = inject(UsersService);
  usersPerPage = 8;
  currentPage = signal(1);

  displayedUsers() {
    const allUsers = this.getAllUsers();
    const startIndex = (this.currentPage() - 1) * this.usersPerPage;
    return allUsers.slice(0, startIndex + this.usersPerPage);
  }

  hasMoreUsers(): boolean {
    return this.displayedUsers().length < this.getAllUsers().length;
  }

  showMore() {
    this.currentPage.set(this.currentPage() + 1);
  }

  getAllUsers() {
    return this.userService.getAllUsers();
  }

  deleteUser(id: string) {
    const confirmation = prompt("Type 'DELETE' to confirm deletion:");
    if (confirmation === 'a') {
      this.userService.deleteUser(id);
      alert('User deleted successfully.');
    } else {
      alert('Deletion cancelled. User was not deleted.');
    }
  }
}
