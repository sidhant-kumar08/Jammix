import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {connectDb} from './utils/connectDb.js';
import userRoutes from './routes/user.routes.js';
import spotifyRoutes from './routes/spotify.routes.js';
import playlistRoutes from './routes/playlist.routes.js';


dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors({
    origin: 'https://jammix.vercel.app',
    credentials: true
}))
app.use(cookieParser())


connectDb();


app.use('/auth', userRoutes)
app.use('/playlist', playlistRoutes)
app.use('/auth/spotify', spotifyRoutes) 


app.listen(PORT, ()=>{
    console.log(`app is listening on ${PORT}`)
})
