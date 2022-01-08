import * as mongoose from 'mongoose';

export const BoardSchema = new mongoose.Schema({
    name: String,
    createdBy: String,
    createdDate: String
});

export interface Board {
    id: string;
    name: string;
    createdBy: string;
    createdDate: string;
}