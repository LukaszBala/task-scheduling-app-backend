import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
    columnId: String,
    name: String,
    createdBy: String,
    createdDate: String,
    description: String,
    status: String
});
export class Task {
    id: string;
    columnId: string;
    name: string;
    createdBy: string;
    createdDate: string;
    description: string;
    status: string;

    constructor(id: string, columnId: string, name: string, createdBy: string, createdDate: string, description: string, status: string){};
    
}