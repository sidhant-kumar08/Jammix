import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    title : {
        type : String,
        required : true
    },
    link : {
        type : String,
        required : true
    },
    image : {
        type : String,
    }
},{timestamps : true})

const playlistModel = mongoose.model('Playlist', playlistSchema);

export default playlistModel;