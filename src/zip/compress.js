import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { fileURLToPath } from 'url';
import path from 'path';

const compress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const destPath = path.join(__dirname, 'files', 'archive.gz');

    const readableStream = createReadStream(filePath);
    const writableStream = createWriteStream(destPath);
    const gzip = createGzip();

    readableStream
        .pipe(gzip)
        .pipe(writableStream);
};

await compress();