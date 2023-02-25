import { useReducer } from "react";

export const intialState = {
  artist: [],
  audioPlayerArtist: "",
  audioPlayerAudio: "",
  audioPlayerImage: "",
  audioPlayerTitle: "",
  followedArtist: [],
  isPlaying: false,
  nowPlayingToggle: false,
  recentlyPlayed: [],
  recommendation: [],
  sideNavToggle: false,
  songplayingimageSrc: "",
  songPlayingdescription: "",
  songPlayingId: "",
  songPlayingTrackTotal: "",
  songsTracks: [],
  trackListUrl: [],
  trackData: [],
  updatePlayerSate: 'false'
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ARTIST":
      return {
        ...state,
        artist: action.payload,
      };

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

      case "SET_FOLLOWED_ARTIST":
      return {
        ...state,
        followedArtist: action.payload,
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

    case "RECENTLY_PLAYED_DATA":
      return {
        ...state,
        recentlyPlayed: action.payload,
      };

    case "RECOMMENDATION_DATA":
      return {
        ...state,
        recommendation: action.payload,
      };

      case "SET_SIDE_NAV_TOGGLE":
      return {
        ...state,
        sideNavToggle: action.payload,
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

    case "SET_TRACK_LIST_URL":
      return {
        ...state,
        trackList: action.payload,
      };

    case "SET_TRACK_DATA":
      return {
        ...state,
        trackData: action.payload,
      };

      case "SET_PLAYER_STATE":
      return {
        ...state,
        updatePlayerSate: action.payload,
      };
  }
};
