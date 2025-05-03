import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const pathToFile = path.join(__dirname, 'files', 'fileToWrite.txt');

    const stream = createWriteStream(pathToFile);

    process.stdin.pipe(stream);
};

await write();