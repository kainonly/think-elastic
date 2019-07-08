const {library} = require('./src/library');
const {config} = require('dotenv');
const env = config().parsed;

library(env).then((data: any) => {
    console.log(data);
});
