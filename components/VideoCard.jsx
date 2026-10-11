import { useSelector } from "react-redux";

const VideoCard = ({ info }) => {
  const { snippet, statistics, contentDetails } = info || {};

  const { channelTitle, title, thumbnails, publishedAt, channelId } =
    snippet || {};
  const { viewCount } = statistics || {};
  const { duration } = contentDetails || {};

  const { medium } = thumbnails || {};

  const { url } = medium || {};

  // console.log(snippet)
  const formatViewCount = (count) => {
    if (Number(count) >= 1_000_000) {
      return (Number(count) / 1_000_000).toFixed(1) + "M";
    } else if (Number(count) >= 1_000) {
      return (Number(count) / 1_000).toFixed(1) + "K";
    } else {
      return count?.toString() || "0";
    }
  };

  const formattedViews = formatViewCount(viewCount);

  const formatDuration = (isoDuration) => {
    if (!isoDuration) return "--:--";
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "--:--";

    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    } else {
      return `${minutes}:${String(seconds).padStart(2, "0")}`;
    }
  };

  const formattedDuration = duration ? formatDuration(duration) : "--:--";

  function getTimeAgo(publishedAt) {
    const publishedDate = new Date(publishedAt);
    const now = new Date();
    const seconds = Math.floor((now - publishedDate) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  }

  const timeAgo = getTimeAgo(publishedAt);

  // console.log(channelId )

  return (
    <div className="video-card">
      <div className="thumbnail-container">
        <img
          className={`${isMenuOpen ? "thumbnail" : "thumbnail-ismenu"}`}
          src={url}
        />
        <p className={`${isMenuOpen ? "duration" : "duration1"}`}>
          {formattedDuration}
        </p>
      </div>
      <div className="video-info">
        <div
          className={`${isMenuOpen ? "icon-channel-name-container" : "icon-channel-name-container1"} `}
        >
          <img
            className="icon"
            src={info.channelLogo || "https://via.placeholder.com/48"}
            alt="Channel Logo"
          />
          <h2 className="title">{title}</h2>
        </div>
        <div className="channel-name-views-container">
          <div className="channel-name-verify">
            <p className="channel-name">{channelTitle}</p>
            <img
              src="https://pbs.twimg.com/media/G05lL7oWkAAWDTd?format=png&name=small"
              style={{ marginLeft: "5px", height: 14, width: 14, marginTop: 3 }}
            />
          </div>

          <p className="views">
            {formattedViews} views • {timeAgo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
