export interface IUser {
    id?: string;
    displayName?: string;
    email: string;
    passwordHash: string;
    role: string
}

export enum PurchaseState {
    Started = 'Started',
    WaitingForPayment = 'WaitingForPayment',
    Purchased = 'Purchased',
    Canceled = 'Canceled'
} 

export interface IUserCourses {
    id: string;
    purchaseState: string;
    userId: IUser;
}