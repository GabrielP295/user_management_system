export interface User {
    id: string;
    firstName: string;
    lastName: string;
}

export interface UserCollection {
    [key: string]: User;
}

const exampleUser:User = {
    id: "1",
    firstName: "g",
    lastName: "p",
}