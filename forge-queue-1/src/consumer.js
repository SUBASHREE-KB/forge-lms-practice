import { AsyncEvent } from '@forge/events';

export async function handler(event) {
    const { storage } = require('@forge/api');
    const { jobId } = event;
    console.log("Worker received job:", jobId);
    await new Promise(resolve => setTimeout(resolve, 200000));
    const result = "Long running job finished after 200 seconds";
    await storage.set(jobId, result);
    console.log("Worker finished job:", jobId);
}
