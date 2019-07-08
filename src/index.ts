const {env} = require('process');
const {library} = require('./library');


const main_handler = async (event: any, context: any, callback: any) => {
    const data: any = await library(env);
    return data;
};

export {main_handler};
