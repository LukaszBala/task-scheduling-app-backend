import * as mongoose from 'mongoose';

export const TaskRoleSchema = new mongoose.Schema({
    userId: String,
    taskId: String,
    role: String
});
export class TaskRole {
    id: string;
    userId: string;
    taskId: string;
    role: string;


    constructor(id: string, userId: string, taskId: string, role: string){};
    
}