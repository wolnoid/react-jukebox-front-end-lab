import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as trackService from '../../services/trackService';

const TrackList = (props) => {
  const { trackId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (trackId) {
      props.handleUpdateTrack(trackId, formData)
    } else {
      props.handleAddTrack(formData)
    }
  };

  useEffect(() => {
    const fetchTrack = async () => {
      const trackData = await trackService.show(trackId);
      setFormData(trackData);
    };
    if (trackId) fetchTrack();

    return () => setFormData({ title: '', artist: '' });
  }, [trackId]);

  return (
    <main>
      <h1>{trackId ? 'Edit Track' : 'New Track'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title-input'>Title</label>
        <input
          required
          type='text'
          name='title'
          id='title-input'
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor='text-input'>Artist</label>
        <input
          required
          type='text'
          name='artist'
          id='artist-input'
          value={formData.artist}
          onChange={handleChange}
        />
        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default TrackList;