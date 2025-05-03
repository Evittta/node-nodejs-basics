import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerPath = path.join(__dirname, 'worker.js');

const runWorker = n => {
    return new Promise(resolve => {
        const worker = new Worker(workerPath, {
            workerData: n,
        });

        worker.on('message', data => resolve({ status: 'resolved', data }));

        worker.on('error', () => resolve({ status: 'error', data: null }));

        worker.on('exit', code => {
            if (code !== 0) {
                resolve({ status: 'error', data: null });
            }
        });
    });
}

const performCalculations = async () => {
    const numCPUs = os.cpus();
    let value = 10;

    const workers = numCPUs.map(() => runWorker(value++));

    const results = await Promise.all(workers);

    console.log(results);
};

await performCalculations();