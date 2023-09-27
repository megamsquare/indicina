import dotenv from 'dotenv';
dotenv.config();

// App
import app from './server';

const port = process.env.HTTP_PORT || 3001;
const mongo_url = process.env.MONGO_URL || 'mongodb://localhost:27017/test';

async function start() {
    try {
        app.listen(port, () => {
            console.log(`Server is listening to port: ${port}...`);
        })
    } catch(error) {
        console.log(`Server error: ${error}`)
    }
}

start();

