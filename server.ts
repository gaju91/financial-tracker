import dotenv from "dotenv";
import { connnectDB, closeDB } from "./src/db";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 3000;

connnectDB()
    .then(() => {
        app.listen(
            port,
            () => console.log(`\n🟢🕸️ Server Listening On ${port}\n`)
        )
    })

process.on('uncaughtException', () => {
    closeDB()
        .finally(() => process.exit())
});

process.on('unhandledRejection', () => {
    closeDB()
        .finally(() => process.exit())
});

process.on('SIGINT', () => {
    closeDB()
        .then()
        .finally(() => process.exit())
});

process.on('SIGTERM', () => {
    closeDB()
        .then()
        .finally(() => process.exit())
});
