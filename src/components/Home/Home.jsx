import { Link } from 'react-router';
import TrackList from '../../components/TrackList/TrackList.jsx'
import NowPlaying from '../../components/NowPlaying/NowPlaying.jsx'

const Home = (props) => {

  console.log(props.nowPlaying)

  return (
    <>
      <main>
        <h1>
          Jukebox!
        </h1>
        {props.nowPlaying ?
          <NowPlaying nowPlaying={props.nowPlaying} /> :
          null
        }
        <Link to='/add-track'>Add New Track</Link>
        <TrackList
          tracks={props.tracks}
          handleDeleteTrack={props.handleDeleteTrack}
          handleNowPlaying={props.handleNowPlaying}
        />
      </main>
    </>
  );
};

export default Home;