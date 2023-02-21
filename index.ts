import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import userRoutes from './routes/user';
import dbConnection from './db/database';


dotenv.config();

// Server
const app = express();

// Database
dbConnection();

// Middlewares
app.use( cors() );
app.use( express.json() );
app.use( express.static('public') );

// Routes
app.use('/api/users', userRoutes);


// Listen
app.listen(process.env.PORT || 8000, () => {
    console.log( `Server running on port: ${process.env.PORT || 8000}` );
})

