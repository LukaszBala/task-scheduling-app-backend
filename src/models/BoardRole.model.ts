import * as mongoose from 'mongoose';

export const BoardRoleSchema = new mongoose.Schema({
    userId: String,
    boardId: String,
    role: String
});
export class TaskRole {
    id: string;
    userId: string;
    boardId: string;
    role: string;


    constructor(id: string, userId: string, boardId: string, role: string){};
    
}