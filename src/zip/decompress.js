import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { fileURLToPath } from 'url';
import path from 'path';

const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'files', 'archive.gz');
    const destPath = path.join(__dirname, 'files', 'fileToCompress.txt');

    const readableStream = createReadStream(filePath);
    const writableStream = createWriteStream(destPath);
    const gunzip = createGunzip();

    readableStream
        .pipe(gunzip)
        .pipe(writableStream);
};

await decompress();