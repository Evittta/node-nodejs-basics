import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    try {
        const content = await fs.readFile(filePath, 'utf-8');

        console.log(content);
    } catch {
        throw new Error('FS operation failed');
    }
};

await read();