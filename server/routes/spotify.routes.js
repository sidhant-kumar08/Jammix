import express from 'express';
import querystring from 'querystring';
import axios from 'axios';


const router = express.Router();


router.get('/login', async (req,res)=>{
    try {
        const scope = 'playlist-read-private playlist-read-collaborative';
        const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
            response_type: 'code',
            client_id: process.env.CLIENT_ID,
            scope,
            redirect_uri: process.env.REDIRECT_URI,
        })}`;
        res.redirect(authUrl);
    } catch (error) {
        console.log(`error is in /login`)
    }
   
})

router.get('/callback', async (req,res)=>{

    try {
        const {code} = req.query;

    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const body = querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
    })

    const tokenResponse = await axios.post(tokenUrl, body, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });


    const { access_token } = tokenResponse.data;
    res.cookie('accessToken', access_token, {
        httpOnly : true,
        secure : false
    })
    res.redirect('https://jammix.vercel.app/share');
    } catch (error) {
        console.log(`error is in /callback`)
    }

    
})

export default router;
