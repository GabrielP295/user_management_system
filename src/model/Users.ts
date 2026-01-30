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
    /*
    class that implements interface should also hold in memory private UserCollection
    
    cannot be defined within the interface because that would make the collection implicitly public and directly mutable,
    which doesn't support encapsulation oop principles
    */
    getAllUsers(): User[];
    
    createUser(firstName: string, lastName: string): boolean;
    
    updateUser(id: string, updates: UserUpdateFields): boolean;
    
    deleteUser(id: string): boolean;
}