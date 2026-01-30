export type UserUpdateFields = Partial<Omit<User, "id">>;

export interface User {
    id: string;
    firstName: string;
    lastName: string;
}

export interface UserCollection {
    [key: string]: User;
}

export interface UsersServiceInterface {    
    getAllUsers(): User[];
    
    createUser(firstName: string, lastName: string): boolean;
    
    updateUser(id: string, updates: UserUpdateFields): boolean;
    
    deleteUser(id: string): boolean;
}