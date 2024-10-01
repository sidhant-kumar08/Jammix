import express from 'express'
import { getPlaylists, getPlaylistTracks, sharePlaylist, shareYoutubePlaylist } from '../controllers/playlist.controller.js';
import isAuthenticated from '../middleware/isAuthenticared.js';

const router = express.Router();

router.post('/share', sharePlaylist);
router.post('/youtube', shareYoutubePlaylist);
router.get('/', getPlaylists);
router.get('/:id/tracks', getPlaylistTracks);

export default router;