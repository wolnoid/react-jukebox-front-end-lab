import { Link } from 'react-router';

const TrackList = (props) => {

  return (
    <>
      <ul>
        {props.tracks.map(track => (
          <li key={track._id}>
            Track: {track.title} <br />
            Artist: {track.artist} <br />
            {track.artistHometown && (
              <> Hometown: {track.artistHometown} <br /></>
            )}
            <button onClick={() => props.handleNowPlaying(track._id) }>Play</button>
            <Link to={`/edit-track/${track._id}`}><button>Edit</button></Link>
            <button onClick={() => props.handleDeleteTrack(track._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TrackList;