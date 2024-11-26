import React, { useEffect, useState } from 'react';
import Admin from '..';
import '../UI/admin_children.css';

function AdminSong() {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [albums, setAlbums] = useState([]); // Thêm state cho album
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSongId, setCurrentSongId] = useState('');
  const [newSong, setNewSong] = useState({
    name: '',
    artist_id: '',
    album_id: '',
    genre_id: '',
    file_path: '',
    song_image: '',
    song_time: ''
  });

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:3000/song');
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:3000/artist');
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:3000/genre');
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    const fetchAlbums = async () => { // Thêm hàm lấy album
      try {
        const response = await fetch('http://localhost:3000/album');
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchSongs(); 
    fetchArtists();
    fetchGenres(); 
    fetchAlbums(); // Gọi hàm lấy album
  }, []); 

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentSongId('');
    setNewSong({
      name: '',
      artist_id: '',
      album_id: '',
      genre_id: '',
      file_path: '',
      song_image: '',
      song_time: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewSong({
        ...newSong,
        [e.target.name]: URL.createObjectURL(file)
      });
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newSong.name);
      formData.append('artist_id', newSong.artist_id); 
      formData.append('album_id', newSong.album_id);
      formData.append('genre_id', newSong.genre_id); 
      formData.append('song_time', newSong.song_time);
  
      if (isEditing) {
        const filePathInput = document.querySelector('input[name="file_path"]');
        const songImageInput = document.querySelector('input[name="song_image"]');
        
        if (filePathInput.files[0]) {
          formData.append('file_path', filePathInput.files[0]);
        }
        if (songImageInput.files[0]) {
          formData.append('song_image', songImageInput.files[0]);
        }
      } else {
        const filePathInput = document.querySelector('input[name="file_path"]');
        const songImageInput = document.querySelector('input[name="song_image"]');
        
        if (!filePathInput.files[0] || !songImageInput.files[0]) {
          throw new Error('File path and song image are required');
        }
        formData.append('file_path', filePathInput.files[0]); 
        formData.append('song_image', songImageInput.files[0]);
      }
  
      let response;
      if (isEditing) {
        response = await fetch(`http://localhost:3000/song/update/${currentSongId}`, {
          method: 'PUT',
          body: formData
        });
      } else {
        response = await fetch('http://localhost:3000/song/create', {
          method: 'POST',
          body: formData
        });
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error('Failed to save song');
      }
  
      const savedSong = await response.json();
      if (isEditing) {
        setSongs((prevSongs) => prevSongs.map((song) => (song._id === currentSongId ? savedSong : song)));
      } else {
        setSongs((prevSongs) => [...prevSongs, savedSong]);
      }
      closeModal();
    } catch (error) {
      console.error('Error saving song:', error);
    }
  };
  
  const handleEdit = (song) => {
    setNewSong({
      name: song.name,
      artist_id: song.artist_id ? song.artist_id._id : '',
      album_id: song.album_id ? song.album_id._id : '',
      genre_id: song.genre_id ? song.genre_id._id : '',
      file_path: song.file_path,
      song_image: song.song_image,
      song_time: song.song_time
    });
    setCurrentSongId(song._id);
    setIsEditing(true);
    setShowModal(true);
  }; 

  return (
    <div>
      <Admin>
        <div className="user-info">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Song Information</h2>
            <button className="add-button" onClick={openModal}>Thêm</button>
          </div>
          <table className="user-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Name Song</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Genre</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {songs.length > 0 ? (
                songs.map((song, index) => (
                  <tr key={song._id}>
                    <td>{index + 1}</td> 
                    <td>{song.name || 'N/A'}</td>
                    <td>{song.artist_id ? song.artist_id.artist_name : 'N/A'}</td>
                    <td>{song.album_id ? song.album_id.name : 'N/A'}</td>
                    <td>{song.genre_id ? song.genre_id.genre_name : 'N/A'}</td>
                    <td>
                      {song.song_image ? (
                        <img src={`http://localhost:3000/${song.song_image}`} alt={song.name} className="song-image" />
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td>
                      <button className="edit-button" onClick={() => handleEdit(song)}>Sửa</button>
                      <button className="delete-button">Xóa</button>
                    </td> 
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No song data found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Popup Modal thêm bài hát */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>{isEditing ? 'Chỉnh Sửa Bài Hát' : 'Thêm Bài Hát Mới'}</h3>
              <label>
                Tên bài hát:
                <input type="text" name="name" value={newSong.name} onChange={handleChange} />
              </label>
              <label>
                Nghệ sĩ:
                <div className="dropdown">
                  <select name="artist_id" value={newSong.artist_id} onChange={handleChange}>
                    <option value="">Chọn nghệ sĩ</option>
                    {artists.map((artist) => (
                      <option key={artist._id} value={artist._id}>
                        {artist.artist_name}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
              <label>
                Album:
                <div className="dropdown">
                  <select name="album_id" value={newSong.album_id} onChange={handleChange}>
                    <option value="">Chọn album</option>
                    {albums.map((album) => ( // Sử dụng danh sách album
                      <option key={album._id} value={album._id}>
                        {album.name}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
              <label>
                Thể loại:
                <div className="dropdown">
                  <select name="genre_id" value={newSong.genre_id} onChange={handleChange}>
                    <option value="">Chọn thể loại</option>
                    {genres.map((genre) => (
                      <option key={genre._id} value={genre._id}>
                        {genre.genre_name}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
              <label>
                File Path:
                <input type="file" name="file_path" onChange={handleFileChange} />
              </label>
              <label>
                Hình ảnh bài hát:
                <input type="file" name="song_image" onChange={handleFileChange} />
              </label>
              <label>
                Thời gian bài hát:
                <input type="text" name="song_time" value={newSong.song_time} onChange={handleChange} />
              </label>
              <button onClick={handleSave}>{isEditing ? 'Cập Nhật' : 'Lưu'}</button>
              <button onClick={closeModal}>Đóng</button>
            </div>
          </div>
        )}
      </Admin>
    </div>
  );
}

export default AdminSong;
