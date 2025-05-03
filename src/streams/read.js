import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const pathToFile = path.join(__dirname, 'files', 'fileToRead.txt');

    const stream = createReadStream(pathToFile);

    stream.on('data', chunk => process.stdout.write(chunk));
};

await read();