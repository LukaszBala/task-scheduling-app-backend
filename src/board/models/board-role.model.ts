import * as mongoose from 'mongoose';

export const BoardRoleSchema = new mongoose.Schema({
    userId: String,
    boardId: String,
    role: String
});
export interface BoardRole {
    id: string;
    userId: string;
    boardIds: string[]
    boardId: string;
    role: string;  
}
