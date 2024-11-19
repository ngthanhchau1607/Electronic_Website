const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const songSchema = new Schema({
  song_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  artist_id: { type: Schema.Types.ObjectId, ref: 'Artist' }, // Thay artist thành artist_id
  album_id: { type: Schema.Types.ObjectId, default: null, required: false, ref: 'Album' }, // Thay album thành album_id
  genre_id: { type: Schema.Types.ObjectId, ref: 'Genre' }, // Thay genre thành genre_id
  file_path: { type: String, required: false },
  release_date: { type: String, required: false }, 
  song_image: { type: String, required: true },
  song_time: { type: String, required: false }, 
},{ timestamps: true });

// Export the model
module.exports = mongoose.model('Song', songSchema, 'song');
