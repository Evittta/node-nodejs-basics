const parseEnv = () => {        
    const result =  Object.entries(process.env)
        .reduce((prev, [key, value]) => {
            if (key.startsWith('RSS_')) {
                prev += `${prev.length ? '; ' : ''}${key}=${value}`;
            }

            return prev;
        }, '');

    console.log(result);
};

parseEnv();