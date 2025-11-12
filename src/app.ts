import express, { Express } from "express";

import dotenv from "dotenv";
dotenv.config();

import {getHelmetConfig} from "../config/helmetConfig";
import cors from "cors";
import {publicCorsOptions} from "../config/corsConfig"

import morgan from "morgan";
import employeeRoute from "../src/api/v1/routes/employeeRoute";
import branchRoute from "../src/api/v1/routes/branchRoute";

const app: Express = express();

app.use(getHelmetConfig());
app.use("/api/v1/health", cors(publicCorsOptions));
app.use("/api-docs", cors(publicCorsOptions));

// Add custom security headers
app.use((req, res, next) => {
    // Prevent caching of sensitive endpoints
    if (req.path.includes("/admin") || req.path.includes("/user")) {
        res.setHeader(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, private"
        );
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
    }

    // Add rate limiting information
    res.setHeader("X-RateLimit-Policy", "100-per-hour");

    next();
});

app.use(morgan("combined"));
app.use(express.json());

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

app.use("/api/v1", employeeRoute);
app.use("/api/v1", branchRoute);

export default app;