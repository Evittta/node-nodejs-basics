import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'files', 'fresh.txt');
    
    try {
        await fs.access(filePath, fs.constants.F_OK);

        throw new Error('FS operation failed');
    } catch (err) {        
        if (err.code === 'ENOENT') {
            const content = 'I am fresh and young';

            fs.writeFile(filePath, content);
        } else {
            throw err;
        }
    }
};

await create();