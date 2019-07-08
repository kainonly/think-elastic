const {library} = require('./library');

const main_handler = async (event: any, context: any, callback: any) => {
    library();
    return {};
};

export {main_handler};
