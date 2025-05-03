import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const rename = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'files', 'wrongFilename.txt');

    try {
        await fs.access(filePath, fs.constants.W_OK);

        const newFilePath = path.join(__dirname, 'files', 'properFilename.md');

        try {
            await fs.access(newFilePath, fs.constants.F_OK);

            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code === 'ENOENT') {
                await fs.rename(filePath, newFilePath);
            } else {
                throw err;
            }
        }
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await rename();