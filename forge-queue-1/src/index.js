import Resolver from '@forge/resolver';
import { Queue } from '@forge/events';

const resolver = new Resolver();
const queue = new Queue({ key: 'long-job-queue' });

resolver.define('startJob', async () => {
    const { jobId } = await queue.push({
        body: { start: true }
    });
    console.log("Job pushed:", jobId);
    return { jobId };
});

resolver.define('getJobStatus', async ({ payload }) => {
    const { storage } = require('@forge/api');
    const { jobId } = payload;
    const result = await storage.get(jobId);
    if (result) {
        return { status: "completed", result };
    }
    return { status: "processing" };
});

export const handler = resolver.getDefinitions();
