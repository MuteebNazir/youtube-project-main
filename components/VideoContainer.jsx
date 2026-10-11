import { useEffect, useState } from "react";
import { GOOGLE_API_KEY, YOUTUBE_VIDEO_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link, useOutletContext } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonLoading from "./SkeletonLoading";
import SkeletonLoading1 from "./SkeletonLoading1";
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const { category } = useOutletContext();

  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [error, setError] = useState(null);

  const isMenuOpen = useSelector((store) => store.youtube.isMenuOpen);

  //console.log(videos);

  useEffect(() => {
    // Reset videos when category changes
    setVideos([]);
    setNextPageToken(null);
    getVideos();
  }, [category]);

  const getVideos = async () => {
    try {
      setError(null);
      let fetchedVideos = [];
      let apiNextPageToken = null;

      const standardCategoryNames = [
        "Gaming",
        "Songs",
        "Cooking",
        "Sports",
        "Music",
        "News",
      ];
      const isSearch =
        category &&
        typeof category === "object" &&
        category.name !== "All" &&
        !standardCategoryNames.includes(category.name);

      if (isSearch) {
        // 1. Fetch search results
        const searchQuery = category.name;
        let searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&q=${encodeURIComponent(searchQuery)}&key=${GOOGLE_API_KEY}`;
        if (nextPageToken) {
          searchUrl += `&pageToken=${nextPageToken}`;
        }

        const searchRes = await fetch(searchUrl);
        if (!searchRes.ok) {
          const errorText = await searchRes.text();
          console.error("Search API Error:", searchRes.status, errorText);
          setError("Failed to load search results.");
          return;
        }

        const searchJson = await searchRes.json();
        apiNextPageToken = searchJson.nextPageToken;

        if (videoIds) {
          // 2. Fetch video details (to get statistics & contentDetails)
          const detailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${GOOGLE_API_KEY}`;
          const detailsRes = await fetch(detailsUrl);
          if (detailsRes.ok) {
            const detailsJson = await detailsRes.json();
            fetchedVideos = detailsJson.items || [];
          }
        }
      } else {
        // Fetch popular videos by category ID
        let url = YOUTUBE_VIDEO_API;
        let categoryId = null;

        if (category) {
          if (typeof category === "object") {
            if (category.name !== "All" && category.id) {
              categoryId = category.id;
            }
          } else if (category !== 0) {
            categoryId = category;
          }
        }

        if (categoryId) {
          url += `&videoCategoryId=${categoryId}`;
        }

        if (nextPageToken) {
          url += `&pageToken=${nextPageToken}`;
        }

        const res = await fetch(url);
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Popular API Error:", res.status, errorText);
          setError("Failed to load videos for this category.");
          return;
        }

        const json = await res.json();
        apiNextPageToken = json.nextPageToken;
        fetchedVideos = json.items || [];
      }

      if (fetchedVideos.length === 0) {
        setError("No videos found for this category.");
        return;
      }

      const uniqueChannelIds = fetchedVideos.map((v) => v.snippet.channelId);

      const channelData = await Promise.all(
        uniqueChannelIds.map(async (channelId) => {
          try {
            const channelApiUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${GOOGLE_API_KEY}`;
            const res = await fetch(channelApiUrl);
            const channelJson = await res.json();
            const logoUrl =
              channelJson.items?.[0]?.snippet?.thumbnails?.default?.url;
            return { channelId, logoUrl };
          } catch (err) {
            console.error("Channel fetch failed:", err);
            return { channelId, logoUrl: null };
          }
        }),
      );

      const channelLogoMap = {};
      channelData.forEach((item) => {
        if (item.logoUrl) {
          channelLogoMap[item.channelId] = item.logoUrl;
        }
      });

      const videosWithLogos = fetchedVideos.map((video) => ({
        ...video,
        channelLogo: channelLogoMap[video.snippet.channelId],
      }));

      setVideos((prev) => {
        const existingIds = new Set(prev.map((v) => v.id?.videoId || v.id));
        const newUniqueVideos = videosWithLogos.filter(
          (v) => !existingIds.has(v.id?.videoId || v.id),
        );
        return [...prev, ...newUniqueVideos];
      });

      setNextPageToken(apiNextPageToken);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  if (error)
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <p style={{ fontSize: "16px", color: "#606060", marginBottom: "16px" }}>
          {error}
        </p>
        <button
          onClick={() => {
            setError(null);
            setVideos([]);
            setNextPageToken(null);
            getVideos();
          }}
          style={{
            padding: "10px 24px",
            backgroundColor: "#065fd4",
            color: "white",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Try Again
        </button>
      </div>
    );

  if (videos.length === 0) return <SkeletonLoading />;

  return (
    <InfiniteScroll
      dataLength={videos.length}
      next={getVideos}
      hasMore={!!nextPageToken}
      loader={<SkeletonLoading1 />}
      endMessage={<h4>No more videos to show</h4>}
    >
      <div
        className={`${isMenuOpen ? "Video-card-container" : "Video-card-container1"}`}
      >
        {videos.map((video) => (
          <Link
            key={`${video.id}-${video.etag}`}
            to={`/watch?v=${video.id}`}
            style={{ textDecoration: "none" }}
          >
            <VideoCard info={video} />
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default VideoContainer;
