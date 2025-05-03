const parseArgs = () => {
    return process.argv.slice(2).reduce((acc, cur) => {
        const isKey = cur.includes('--');
        const data = isKey
            ? `${cur.replace('--', '')} is `
            : cur;
         
        return `${acc}${acc.length && isKey ? ', ' : ''}${data}`;
    }, '');
};

parseArgs();