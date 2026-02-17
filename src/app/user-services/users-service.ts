import { Injectable } from '@angular/core';
import { User, UserCollection, UsersServiceInterface, UserUpdateFields } from '../../model/Users';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements UsersServiceInterface {
  private users: UserCollection = {};

  constructor() {
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleUsers: User[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        age: 30,
        aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        hobbies: ['Reading', 'Traveling', 'Cooking'],
        premiumUser: true,
        imageUrl: 'assets/images/default_profile_icon.jpg',
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        age: 28,
        aboutMe: 'Passionate about photography and hiking.',
        hobbies: ['Photography', 'Hiking', 'Gaming'],
        premiumUser: false,
        imageUrl: '././images/default_profile_icon.jpg',
      },
      {
        id: '3',
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@example.com',
        age: 32,
        aboutMe: 'Freelance designer with a love for creative projects.',
        hobbies: ['Design', 'Art', 'Music'],
        premiumUser: true,
        imageUrl: '././images/default_profile_icon.jpg',
      },
      {
        id: '4',
        firstName: 'Sarah',
        lastName: 'Brown',
        email: 'sarah.brown@example.com',
        age: 35,
        aboutMe: 'Software engineer exploring new technologies.',
        hobbies: ['Coding', 'Tech', 'Coffee'],
        premiumUser: true,
        imageUrl: '././images/default_profile_icon.jpg',
      },
      {
        id: '5',
        firstName: 'David',
        lastName: 'Williams',
        email: 'david.williams@example.com',
        age: 26,
        aboutMe: 'Marketing professional and social media enthusiast.',
        hobbies: ['Marketing', 'Social Media', 'Networking'],
        premiumUser: false,
        imageUrl: '././images/default_profile_icon.jpg',
      },
      {
        id: '6',
        firstName: 'Emma',
        lastName: 'Miller',
        email: 'emma.miller@example.com',
        age: 40,
        aboutMe: 'Business analyst with 10 years of experience.',
        hobbies: ['Analytics', 'Sports', 'Travel'],
        premiumUser: true,
        imageUrl: '././images/default_profile_icon.jpg',
      },
      {
        id: '7',
        firstName: 'James',
        lastName: 'Davis',
        email: 'james.davis@example.com',
        age: 29,
        aboutMe: 'Content writer passionate about storytelling.',
        hobbies: ['Writing', 'Reading', 'Blogging'],
        premiumUser: false,
        imageUrl: '././images/default_profile_icon.jpg',
      },
      {
        id: '8',
        firstName: 'Lisa',
        lastName: 'Wilson',
        email: 'lisa.wilson@example.com',
        age: 33,
        aboutMe: 'Full-stack developer and open-source contributor.',
        hobbies: ['Programming', 'Open Source', 'DevOps'],
        premiumUser: true,
        imageUrl: '././images/default_profile_icon.jpg',
      },
      {
        id: '9',
        firstName: 'Robert',
        lastName: 'Moore',
        email: 'robert.moore@example.com',
        age: 27,
        aboutMe: 'UX Designer focused on user experience.',
        hobbies: ['Design', 'User Research', 'Innovation'],
        premiumUser: false,
        imageUrl: '././images/default_profile_icon.jpg',
      },
      {
        id: '10',
        firstName: 'Patricia',
        lastName: 'Taylor',
        email: 'patricia.taylor@example.com',
        age: 45,
        aboutMe: 'Project manager with expertise in agile methodologies.',
        hobbies: ['Project Management', 'Leadership', 'Mentoring'],
        premiumUser: true,
        imageUrl: '././images/default_profile_icon.jpg',
      },
    ];

    sampleUsers.forEach((user) => {
      this.users[user.id] = user;
    });
  }

  getAllUsers(): User[] {
    const userArray: User[] = [];
    for (const user in this.users) {
      userArray.push(this.users[user]);
    }
    return userArray;
  }

  createUser(
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    aboutMe: string,
    hobbies: string[],
    premiumUser: boolean,
    imageUrl: string,
  ): boolean {
    const userId: string = crypto.randomUUID();
    const newUser: User = {
      id: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      age: age,
      aboutMe: aboutMe,
      hobbies: hobbies,
      premiumUser: premiumUser,
      imageUrl: imageUrl,
    };
    this.users[userId] = newUser;
    return true;
  }

  updateUser(id: string, updates: UserUpdateFields): boolean {
    const userToUpdate: User = this.users[id];

    if (!userToUpdate) {
      return false;
    }

    const newCollection: UserCollection = {
      ...this.users,
      [id]: {
        ...userToUpdate,
        ...updates,
        id: userToUpdate.id, // Ensure id is never updated
      },
    };
    this.users = newCollection;

    return true;
  }

  deleteUser(id: string): boolean {
    console.log('Deleting user with id:', id);
    const { [id]: _, ...rest } = this.users;
    this.users = rest;
    return true;
  }
}
