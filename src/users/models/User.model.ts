import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    userId: String,
    username: String,
    password: String,
    email: String
});

export class User {
    userId: string;
    username: string;
    password: string;
    email: string;

    constructor(userId: string, username: string, password: string, email: string){};
    
}
