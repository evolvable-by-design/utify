import React from "react";
import YouTube from "react-youtube";

class YouTubeVideo extends React.Component {
  state = {
    videoId: this.props.videoId
  };
  render() {
    const opts = {
      height: "150",
      width: "250",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        origin: "http://localhost:3000",
        widget_referrer: "http://localhost:3000"
      }
    };

    return (
      <YouTube
        videoId={this.state.videoId}
        opts={opts}
        onReady={this._onReady}
      />
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default YouTubeVideo;