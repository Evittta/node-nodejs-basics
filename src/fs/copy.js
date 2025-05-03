import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const folderPath = path.join(__dirname, 'files');

    try {
        await fs.access(folderPath, fs.constants.R_OK);

        const destFolderPath = path.join(__dirname, 'files_copy');

        try {            
            await fs.access(destFolderPath, fs.constants.F_OK);

            throw new Error('FS operation failed');
        } catch (err) {             
            if (err.code === 'ENOENT') {
                fs.mkdir(destFolderPath);

                const items = await fs.readdir(folderPath);

                for (const item of items) {
                    const srcPath = path.join(folderPath, item);
                    const destPath = path.join(destFolderPath, item);

                    await fs.copyFile(srcPath, destPath);
                }
            } else {
                throw err;
            }
        }
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await copy();
