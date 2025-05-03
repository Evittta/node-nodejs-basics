import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const remove = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');

    try {
        await fs.access(filePath, fs.constants.F_OK);

        await fs.unlink(filePath);
    } catch {
        throw new Error('FS operation failed');
    }
};

await remove();