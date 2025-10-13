import request from "supertest";
import app from "../src/app";

describe("GET /health", () => {
    it("should return 200 OK", async () => {
        const response = await request(app).get("/api/v1/health");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("OK");
        expect(response.body.version).toBe("1.0.0");
    });
});