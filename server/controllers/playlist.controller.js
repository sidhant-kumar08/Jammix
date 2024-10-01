import playlistModel from '../models/playlist.model.js'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const API_KEY = process.env.API_KEY;




const extractPlaylistId = (url) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('list'); // Extracts 'list' query param (playlist ID)
  };

export const sharePlaylist = async (req,res) => {
    try {
        const {title, link} = req.body;
        const accessToken = req.cookies.accessToken;


        const response = await axios.get(`https://api.spotify.com/v1/playlists/${link.split('/').pop()}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
          });

        const playlistImage = response.data.images[0]?.url || '';
        const playlist = new playlistModel({
            user : req.userId,
            title,
            link,
            image : playlistImage
        });

        await playlist.save();
        return res.status(200).json({
            message : "playlist shared",
            success : true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : 'internal server error',
            success : false
        })
    }
};

export const shareYoutubePlaylist = async (req, res) => {
    try {
        const { link, title } = req.body;


        const playlistId = extractPlaylistId(link);

        if (!playlistId) {
            return res.status(400).json({
                message: 'Invalid playlist link',
                success: false,
            });
        }

        const response = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
            params: {
                part: 'snippet',
                id: playlistId,
                key: API_KEY,
            },
        });

        const data = response.data.items[0];

        if (!data) {
            return res.status(404).json({
                message: 'Playlist not found',
                success: false,
            });
        }


        const newPlaylist = new playlistModel({
            user: req.userId, 
            title: title, 
            link: link, 
            image: data.snippet.thumbnails.maxres.url, 
        });

        
        await newPlaylist.save();

        return res.status(200).json({
            data: newPlaylist,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: error.message, // Send a more specific error message
        });
    }
};
export const getPlaylists = async (req,res) => {
    try {
        
        const playLists = await playlistModel.find().populate('user', 'username');
        return res.status(200).json({
            playLists,
            message : 'all playlists are',
            success : true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'internal server error',
            success : false
        })
    }
};

export const getPlaylistTracks = async (req,res) => {
    try {
        const playlist = await playlistModel.findById(req.params.id);
        const accessToken = req.cookies.accessToken;

        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlist.link.split('/').pop()}/tracks`, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
          });

        const tracks = response.data.items.map(item => ({
            name: item.track.name,
            artist: item.track.artists.map(artist => artist.name).join(', '),
          }));

          return res.status(200).json({
            tracks,
            message : "tracks retrieved successfully",
            success : true
          })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'internal server error',
            success : false
        })
    }
}