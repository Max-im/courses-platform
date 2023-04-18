export interface IUser {
    id?: string;
    displayName?: string;
    email: string;
    passwordHash: string;
    role: string
}