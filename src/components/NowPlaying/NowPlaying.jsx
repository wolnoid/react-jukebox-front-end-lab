const NowPlaying = (props) => {

  return (
    <>
      <p>
        Now Playing: {props.nowPlaying.title} by {props.nowPlaying.artist}
      </p>
    </>
  );
};

export default NowPlaying;