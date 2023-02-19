import { useReducer } from "react";

export const intialState = {
  audioPlayerArtist: "",
  audioPlayerAudio: "",
  audioPlayerImage: "",
  audioPlayerTitle: "",
  isPlaying: false,
  nowPlayingToggle: false,
  songplayingimageSrc: "",
  songPlayingdescription: "",
  songPlayingId: "",
  songPlayingTrackTotal: "",
  songsTracks: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "GET_AUDIO_PLAYER_IMAGE":
      return {
        ...state,
        audioPlayerImage: action.payload,
      };

    case "GET_AUDIO_PLAYER_AUDIO":
      return {
        ...state,
        audioPlayerAudio: action.payload,
      };

    case "GET_AUDIO_PLAYER_TITLE":
      return {
        ...state,
        audioPlayerTitle: action.payload,
      };

    case "GET_AUDIO_PLAYER_ARTIST":
      return {
        ...state,
        audioPlayerArtist: action.payload,
      };

    case "SET_IS_PLAYING":
      return {
        ...state,
        isPlaying: action.payload,
      };

    case "TOGGLE_NOW_PLAYING":
      return {
        ...state,
        nowPlayingToggle: action.payload,
      };

    case "GET_IMAGE_SRC":
      return {
        ...state,
        songplayingimageSrc: action.payload,
      };

    case "GET_DESCRIPTION":
      return {
        ...state,
        songPlayingdescription: action.payload,
      };

    case "GET_ID":
      return {
        ...state,
        songPlayingId: action.payload,
      };

    case "GET_TRACK_TOTAL":
      return {
        ...state,
        songPlayingTrackTotal: action.payload,
      };

    case "SONG_TRACKS_DATA":
      return {
        ...state,
        songsTracks: action.payload,
      };
  }
};
