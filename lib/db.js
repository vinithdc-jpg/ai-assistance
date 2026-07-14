import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable.");
}

/**
 * Global cache for Mongoose connection.
 * Prevents multiple connections during development
 * with Next.js hot reload.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
    };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const options = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        cached.promise = mongoose
            .connect(MONGODB_URI, options)
            .then((mongoose) => {
                console.log("✅ MongoDB Connected");
                return mongoose;
            })
            .catch((error) => {
                console.error("❌ MongoDB Connection Error:", error);
                throw error;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;