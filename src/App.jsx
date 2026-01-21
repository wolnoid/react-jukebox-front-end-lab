import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import Home from './components/Home/Home.jsx'
import TrackForm from './components/TrackForm/TrackForm.jsx'
import * as trackService from './services/trackService.js';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [nowPlaying, setNowPlaying] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllTracks = async () => {
      const tracksData = await trackService.index();
      setTracks(tracksData);
    };
    fetchAllTracks();
  }, []);

  const handleAddTrack = async (trackFormData) => {
    const newTrack = await trackService.create(trackFormData);
    setTracks([newTrack, ...tracks]);
    navigate('/');
  }

  const handleUpdateTrack = async (trackId, trackFormData) => {
    const updatedTrack = await trackService.update(trackId, trackFormData);
    setTracks(tracks.map((track) => (trackId === track._id ? updatedTrack : track)));
    navigate('/');
  }

  const handleDeleteTrack = async (trackId) => {
    const deletedTrack = await trackService.deleteTrack(trackId);
    setTracks(tracks.filter((track) => track._id !== deletedTrack._id));
    navigate('/');
  }

  const handleNowPlaying = async (trackId) => {
    const selectedTrack = await trackService.show(trackId);
    setNowPlaying(selectedTrack)
  }

  console.log(nowPlaying)

  return (
    <>
      <Routes>
        <Route path='/' element={< Home
          tracks={tracks}
          nowPlaying={nowPlaying}
          handleDeleteTrack={handleDeleteTrack}
          handleNowPlaying={handleNowPlaying}
        />} />
        <Route path='/add-track' element={< TrackForm
          handleAddTrack={handleAddTrack}
        />} />
        <Route path='/edit-track/:trackId' element={< TrackForm
          handleUpdateTrack={handleUpdateTrack}
        />} />
      </Routes>
    </>
  )
};

export default App;