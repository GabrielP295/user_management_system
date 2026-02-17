import { TestBed } from '@angular/core/testing';

import { UsersService } from './users-service';
import { User } from '../../model/Users';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllUsers', () => {
    it('should return an empty array initially', () => {
      const result = service.getAllUsers();
      expect(result).toEqual([]);
    });

    it('should return all users after creating users', () => {
      service.createUser(
        'John',
        'Doe',
        'john@example.com',
        30,
        'A software developer',
        ['coding', 'gaming'],
        false,
        'https://example.com/john.jpg',
      );
      service.createUser(
        'Jane',
        'Smith',
        'jane@example.com',
        28,
        'A designer',
        ['design', 'music'],
        true,
        'https://example.com/jane.jpg',
      );

      const result = service.getAllUsers();
      expect(result.length).toBe(2);
      expect(result[0].firstName).toBe('John');
      expect(result[1].firstName).toBe('Jane');
    });

    it('should return users with all properties', () => {
      service.createUser(
        'Bob',
        'Johnson',
        'bob@example.com',
        35,
        'A manager',
        ['leadership'],
        true,
        'https://example.com/bob.jpg',
      );

      const result = service.getAllUsers();
      const user = result[0];

      expect(user.firstName).toBe('Bob');
      expect(user.lastName).toBe('Johnson');
      expect(user.email).toBe('bob@example.com');
      expect(user.age).toBe(35);
      expect(user.aboutMe).toBe('A manager');
      expect(user.hobbies).toEqual(['leadership']);
      expect(user.premiumUser).toBe(true);
      expect(user.imageUrl).toBe('https://example.com/bob.jpg');
      expect(user.id).toBeDefined();
    });
  });

  describe('createUser', () => {
    it('should return true when creating a user', () => {
      const result = service.createUser(
        'Alice',
        'Williams',
        'alice@example.com',
        25,
        'A student',
        ['reading'],
        false,
        'https://example.com/alice.jpg',
      );
      expect(result).toBe(true);
    });

    it('should assign a unique id to each user', () => {
      service.createUser(
        'User1',
        'Last1',
        'user1@example.com',
        20,
        'About user 1',
        [],
        false,
        'url1.jpg',
      );
      service.createUser(
        'User2',
        'Last2',
        'user2@example.com',
        21,
        'About user 2',
        [],
        false,
        'url2.jpg',
      );

      const users = service.getAllUsers();
      expect(users[0].id).not.toBe(users[1].id);
    });

    it('should correctly store all user properties', () => {
      const firstName = 'Tony';
      const lastName = 'Stark';
      const email = 'tony@example.com';
      const age = 45;
      const aboutMe = 'Billionaire, philanthropist';
      const hobbies = ['engineering', 'technology'];
      const premiumUser = true;
      const imageUrl = 'https://example.com/tony.jpg';

      service.createUser(firstName, lastName, email, age, aboutMe, hobbies, premiumUser, imageUrl);

      const users = service.getAllUsers();
      const createdUser = users[0];

      expect(createdUser.firstName).toBe(firstName);
      expect(createdUser.lastName).toBe(lastName);
      expect(createdUser.email).toBe(email);
      expect(createdUser.age).toBe(age);
      expect(createdUser.aboutMe).toBe(aboutMe);
      expect(createdUser.hobbies).toEqual(hobbies);
      expect(createdUser.premiumUser).toBe(premiumUser);
      expect(createdUser.imageUrl).toBe(imageUrl);
    });
  });

  describe('updateUser', () => {
    it('should return false when updating a non-existent user', () => {
      const result = service.updateUser('non-existent-id', { firstName: 'Updated' });
      expect(result).toBe(false);
    });

    it('should return true when updating an existing user', () => {
      service.createUser(
        'Original',
        'Name',
        'original@example.com',
        30,
        'About',
        [],
        false,
        'url.jpg',
      );

      const users = service.getAllUsers();
      const userId = users[0].id;

      const result = service.updateUser(userId, { firstName: 'Updated' });
      expect(result).toBe(true);
    });

    it('should update only specified properties', () => {
      service.createUser(
        'John',
        'Doe',
        'john@example.com',
        30,
        'A developer',
        ['coding'],
        false,
        'john.jpg',
      );

      const users = service.getAllUsers();
      const userId = users[0].id;

      service.updateUser(userId, {
        firstName: 'Johnny',
        email: 'johnny@example.com',
      });

      const updatedUsers = service.getAllUsers();
      const updatedUser = updatedUsers.find((u) => u.id === userId);

      expect(updatedUser?.firstName).toBe('Johnny');
      expect(updatedUser?.email).toBe('johnny@example.com');
      expect(updatedUser?.lastName).toBe('Doe');
      expect(updatedUser?.age).toBe(30);
    });

    it('should update age property', () => {
      service.createUser(
        'Mark',
        'Wilson',
        'mark@example.com',
        25,
        'About Mark',
        [],
        false,
        'mark.jpg',
      );

      const users = service.getAllUsers();
      const userId = users[0].id;

      service.updateUser(userId, { age: 26 });

      const updatedUsers = service.getAllUsers();
      const updatedUser = updatedUsers.find((u) => u.id === userId);

      expect(updatedUser?.age).toBe(26);
    });

    it('should update hobbies array', () => {
      service.createUser(
        'Lisa',
        'Brown',
        'lisa@example.com',
        28,
        'About Lisa',
        ['reading'],
        false,
        'lisa.jpg',
      );

      const users = service.getAllUsers();
      const userId = users[0].id;

      service.updateUser(userId, { hobbies: ['reading', 'painting', 'music'] });

      const updatedUsers = service.getAllUsers();
      const updatedUser = updatedUsers.find((u) => u.id === userId);

      expect(updatedUser?.hobbies).toEqual(['reading', 'painting', 'music']);
    });

    it('should update premiumUser status', () => {
      service.createUser(
        'Sarah',
        'Davis',
        'sarah@example.com',
        32,
        'About Sarah',
        [],
        false,
        'sarah.jpg',
      );

      const users = service.getAllUsers();
      const userId = users[0].id;

      service.updateUser(userId, { premiumUser: true });

      const updatedUsers = service.getAllUsers();
      const updatedUser = updatedUsers.find((u) => u.id === userId);

      expect(updatedUser?.premiumUser).toBe(true);
    });

    it('should not update id property', () => {
      service.createUser(
        'Michael',
        'Green',
        'michael@example.com',
        40,
        'About Michael',
        [],
        false,
        'michael.jpg',
      );

      const users = service.getAllUsers();
      const originalId = users[0].id;

      service.updateUser(originalId, { id: 'new-id' } as any);

      const updatedUsers = service.getAllUsers();
      const updatedUser = updatedUsers.find((u) => u.id === originalId);

      expect(updatedUser?.id).toBe(originalId);
    });
  });

  describe('deleteUser', () => {
    it('should return true when deleting a user', () => {
      service.createUser(
        'David',
        'Miller',
        'david@example.com',
        29,
        'About David',
        [],
        false,
        'david.jpg',
      );

      const users = service.getAllUsers();
      const userId = users[0].id;

      const result = service.deleteUser(userId);
      expect(result).toBe(true);
    });

    it('should remove the user from the collection', () => {
      service.createUser(
        'Emma',
        'Taylor',
        'emma@example.com',
        27,
        'About Emma',
        [],
        false,
        'emma.jpg',
      );

      const users = service.getAllUsers();
      expect(users.length).toBe(1);

      const userId = users[0].id;
      service.deleteUser(userId);

      const remainingUsers = service.getAllUsers();
      expect(remainingUsers.length).toBe(0);
    });

    it('should not affect other users when deleting one', () => {
      service.createUser(
        'User1',
        'Last1',
        'user1@example.com',
        20,
        'About User 1',
        [],
        false,
        'url1.jpg',
      );
      service.createUser(
        'User2',
        'Last2',
        'user2@example.com',
        21,
        'About User 2',
        [],
        false,
        'url2.jpg',
      );
      service.createUser(
        'User3',
        'Last3',
        'user3@example.com',
        22,
        'About User 3',
        [],
        false,
        'url3.jpg',
      );

      const users = service.getAllUsers();
      const userToDelete = users[1];
      service.deleteUser(userToDelete.id);

      const remainingUsers = service.getAllUsers();
      expect(remainingUsers.length).toBe(2);
      expect(remainingUsers.every((u) => u.id !== userToDelete.id)).toBe(true);
    });

    it('should handle deleting non-existent user', () => {
      const result = service.deleteUser('non-existent-id');
      expect(result).toBe(true);
    });
  });
});
