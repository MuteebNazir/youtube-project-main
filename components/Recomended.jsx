import { useEffect, useState } from "react";
import { GOOGLE_API_KEY } from "../utils/constants";
import value_convertor from "../utils/constants";
import { Link } from "react-router-dom";
import moment from "moment";


const Recomended = ({ videoId }) => {
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommended = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&maxResults=49&regionCode=IN&key=${GOOGLE_API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        if (res.status !== 200) {
          throw new Error(data.error?.message || "Failed to fetch recommended videos");
        }

        setRecommendedVideos(data.items || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommended();
  }, []);

  if (loading) return <p>Loading recommended videos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recommendedVideos.length) return <p>No recommended videos found</p>;

  return (
    <div className="recommended-wrapper-container">
      {recommendedVideos.map((item) => (
        <Link
          key={item.id}
          to={`/watch?v=${item.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="video-title-views-recomended-container">
            <div className="reco-image-container">
              <img
                width="200"
                src={item.snippet.thumbnails?.medium?.url || "fallback.jpg"}
                alt={item.snippet.title}
              />
            </div>

            <div className="title-views-recomended-container">
              <p className="reco-title">{item.snippet.title.slice(0, 80)}</p>
              <div style={{display:'flex',alignItems:'start'}}>
                <p className="reco-channel">{item.snippet.channelTitle}  </p> 
                <img src="https://pbs.twimg.com/media/G05lL7oWkAAWDTd?format=png&name=small" width={13}  style={{marginTop:6,marginLeft:5}}/>
               </div>
              <div className="reco-views-container">
                <span>{value_convertor(item.statistics.viewCount)}</span>
                <span style={{ fontSize: "12.5px" }}> views</span>
                <span style={{ marginLeft: "5px" }}>
                  - {moment(item.snippet.publishedAt).fromNow()}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recomended;
