import { Transform } from 'stream';

const transform = async () => {
    const stream = new Transform({
        transform(chunk, encoding, callback) {
            const transformedData = chunk.toString().trim().split('').reverse().join('');

            callback(null, transformedData + '\n');
        }
    });

    process.stdin.pipe(stream).pipe(process.stdout)
};

await transform();