import * as mongoose from 'mongoose';

export const ColumnSchema = new mongoose.Schema({
    boardId: String,
    name: String,
    description: String
});

export interface Column {
    id: string;
    name: string;
    items?: any[]
}
