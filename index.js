const app  = require('./src/app');
const logger = require('./src/utils/logger');
const env = require('dotenv').config();





const port = process.env.PORT || 3000;
app.listen(port , () => {
    // console.log(`app listening on port ${port}`);
    logger.info(`app listening on port ${port}`)
    
})