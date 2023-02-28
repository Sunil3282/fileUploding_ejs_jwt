
import dotenv from 'dotenv';

dotenv.config();
let PORT;

process.env.STATUS === 'development' ?
(PORT = process.env.DEV_PORT):
(PORT = process.env.PROD_PORT)

export const  data  = {
    port: PORT,
    environment: process.env.NODE_ENV,
    webisteDomain: process.env.WEBSITE_DOMAIN,
    apiDomain: process.env.API_DOMAIN,
    secret : process.env.SECRET_KEY
}

