import mongoose, { ObjectId } from "mongoose";

export interface ITodo {
    _id: ObjectId;
    title: string;
    status: 'active' | 'archived';
    completedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const TodoSchema = new mongoose.Schema<ITodo>(
    {
        title: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'archived'],
            required: true,
            default: 'active'
        },
        completedAt: {
            type: Date
        },
    },
    { timestamps: true }
)

export default mongoose.model<ITodo>('todos', TodoSchema);