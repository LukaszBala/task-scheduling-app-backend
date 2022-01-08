import * as mongoose from 'mongoose';

export const ColumnSchema = new mongoose.Schema({
    boardId: String,
    name: String,
    description: String
});

export class Column {
    id: string;
    boardId: string;
    name: string;
    description: string;


    constructor(id: string, boardId: string, name: string, description: string){};
    
}