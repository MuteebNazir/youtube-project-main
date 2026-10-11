export const GOOGLE_API_KEY = "AIzaSyBMgBp0ZlSHxecKeD1d2H9olP9oLRwTKtY";

export const GOOGLE_SEARCG_API =
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=Query";

export const LIVE_CHAT_COUNT = 25;

const value_convertor = (value) => {
  if (value >= 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value >= 1000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
};

export default value_convertor;

export const YOUTUBE_VIDEO_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_CHANNEL_API =
  "https://youtube.googleapis.com/youtube/v3/channels?part=snippet&key=" +
  GOOGLE_API_KEY;
