import request from "supertest";
import app from "../app";

describe("Server Health Check", () => {
    test("GET / & /health should return server health", async () => {
        const response = await request(app).get('/health');

        expect(response.status).toBe(200);
        expect(response.text).toBe('🚀 Server is healthy');
    });
});