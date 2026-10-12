import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import value_convertor, { GOOGLE_API_KEY } from "../utils/constants";
import moment from "moment";
import { LuDot } from "react-icons/lu";

const SearchResults = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query");

 

 

    

      if (!searchResponse.ok) {
        const text = await searchResponse.text();
        throw new Error(`Search API failed: ${text}`);
      }

      const searchJson = await searchResponse.json();
      const videoIds = (searchJson.items || [])
        .map((item) => item.id?.videoId)
        .filter(Boolean)
        .join(",");

      if (!videoIds) {
        setVideos([]);
        setLoading(false);
        return;
      }

      // 2️⃣ Videos API (get stats + snippet)
      const detailsResponse = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${GOOGLE_API_KEY}`,
      );

      if (!detailsResponse.ok) {
        const text = await detailsResponse.text();
        throw new Error(`Videos API failed: ${text}`);
      }

      const detailsJson = await detailsResponse.json();
      const videosWithDetails = detailsJson.items || [];

      // 3️⃣ Channels API (batch in groups of 50)
      const channelIds = Array.from(
        new Set(
          videosWithDetails.map((v) => v.snippet?.channelId).filter(Boolean),
        ),
      );

      const channelMap = {};
      for (let i = 0; i < channelIds.length; i += 50) {
        const batchIds = channelIds.slice(i, i + 50).join(",");
        const channelResponse = await fetch(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${batchIds}&key=${GOOGLE_API_KEY}`,
        );

        if (!channelResponse.ok) continue;

        const channelJson = await channelResponse.json();
        (channelJson.items || []).forEach((ch) => {
          channelMap[ch.id] =
            ch.snippet?.thumbnails?.default?.url || "/default-logo.png";
        });
      }

      // 4️⃣ Merge channel logos
      const finalVideos = videosWithDetails.map((v) => ({
        ...v,
        channelLogo: channelMap[v.snippet?.channelId] || "/default-logo.png",
      }));

      setVideos(finalVideos);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch videos. Check API key or quota.");
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading.....</p>;
  if (error) return <p>{error}</p>;

  console.log(videos);

  return (
    <div className="search-final-wrapper">
      {videos.map((video) => (
        <Link
          key={video.id}
          to={`/watch?v=${video.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="search-final-container">
            <div>
              <img
                src={
                  video.snippet?.thumbnails?.medium?.url || "/default-thumb.png"
                }
                alt={video.snippet?.title || "Video thumbnail"}
                className="search-final-image"
                width={500}
              />
            </div>
            <div className="search-final-title-views-logo-container">
              <div>
                <p className="search-title">
                  {video.snippet?.title || "No title"}
                </p>
                <div className="search-views-publish-dot-container">
                  <p className="search-views-publish">
                    {value_convertor(video.statistics?.viewCount) || 0} views
                  </p>
                  <LuDot className="search-dot-icon" />{" "}
                  <span>{moment(video.snippet?.publishedAt).fromNow()}</span>
                </div>
              </div>
              <div className="search-final-logo-channelid-container">
                <img
                  src={video.channelLogo}
                  alt={video.snippet?.channelTitle || "channel"}
                  className="search-final-logo"
                />
                <p className="text-xs text-gray-600">
                  {video.snippet?.channelTitle || "Unknown channel"}
                </p>
              </div>
              <p className="search-final-description">
                {video.snippet?.description ?
                  video.snippet.description.slice(0, 110) + "..."
                : "No description"}
              </p>
              <div className="search-final-box-container">
                <div className="search-final-box">
                  <p>4K</p>
                </div>
                <div className="search-final-box1">
                  <p>CC</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
