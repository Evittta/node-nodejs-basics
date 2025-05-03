import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';
import path from 'path';

const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const pathToFile = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    const hash = createHash('sha256');
    const stream = createReadStream(pathToFile);

    stream.on('data', chunk => hash.update(chunk));

    stream.on('end', () => console.log(hash.digest('hex')));
};

await calculateHash();