import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

export class User {
    id: string;
    username: string;
    password: string;
    email: string;

    constructor(id: string, username: string, password: string, email: string){};
    
}