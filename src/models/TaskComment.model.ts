import * as mongoose from 'mongoose';

export const TaskCommentSchema = new mongoose.Schema({
    taskId: String,
    comment: String,
    createdBy: String,
    createdDate: String
});
export interface TaskComment {
    id: string;
    taskId: string;
    comment: string;
    createdBy: string;
    createdDate: string;
  
}