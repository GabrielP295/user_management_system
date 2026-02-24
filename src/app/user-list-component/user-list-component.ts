import { Component, inject, OnInit, signal } from '@angular/core';
import { UserRepository } from '../user-repository/user-repository';
import { RouterLink } from '@angular/router';
import { User } from '../../model/Users';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-list-component',
  imports: [RouterLink],
  templateUrl: './user-list-component.html',
  styleUrl: './user-list-component.scss',
})
export class UserListComponent implements OnInit{
  userService = inject(UserRepository);
  users = signal<User[]>([]);
  usersPerPage = 8;
  currentPage = signal(1);

  ngOnInit(): void {
    this.userService.getAllUsers$().subscribe(users => {
      this.users.set(users);
    });
  }

  displayedUsers() {
    const allUsers = this.users();
    const startIndex = (this.currentPage() - 1) * this.usersPerPage;
    const returny = allUsers.slice(0, startIndex + this.usersPerPage);
    console.log(returny);
    return returny;
  }

  hasMoreUsers(): boolean {
    return this.displayedUsers().length < this.users().length;
  }

  showMore() {
    this.currentPage.set(this.currentPage() + 1);
  }

  deleteUser(id: string) {
    const confirmation = prompt("Type 'DELETE' to confirm deletion:");
    if (confirmation === 'DELETE') {
      this.userService.deleteUser(id);
      alert('User deleted successfully.');
    } else {
      alert('Deletion cancelled. User was not deleted.');
    }
  }

  hasHobbies(hobbies: string[]): boolean {
    if (!hobbies || hobbies.length === 0) {
      return false;
    }
    // Only return true if at least one hobby has actual text (not empty or whitespace)
    return hobbies.some((hobby) => hobby && hobby.trim() !== '');
  }

  getAboutMeText(aboutMe: string): string {
    if (!aboutMe || aboutMe.trim() === '') {
      return 'No about me provided.';
    }
    return aboutMe;
  }
}
