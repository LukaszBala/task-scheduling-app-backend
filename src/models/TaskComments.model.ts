import * as mongoose from 'mongoose';

export const TaskCommentsSchema = new mongoose.Schema({
    taskId: String,
    comment: String,
    createdBy: String,
    createdDate: String
});
export class TaskComments {
    id: string;
    taskId: string;
    comment: string;
    createdBy: string;
    createdDate: string;


    constructor(id: string, taskId: string, comment: string, createdBy: string, createdDate: string){};
    
}