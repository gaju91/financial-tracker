import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { ObjectId } from "mongoose";

import TodoModel, { ITodo } from "../src/module/todos/model";

describe('Stage: Check Schemas', () => {

    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    describe('Phase: Testing Todo Schema', () => {

        test('Test: Create a dummy todo to ensure schema exist', async () => {
            const todo: ITodo = await TodoModel.create({
                title: 'Test 01',
            });

            expect(todo).toBeDefined();
            expect(todo).toHaveProperty('_id');
        })
    });
});