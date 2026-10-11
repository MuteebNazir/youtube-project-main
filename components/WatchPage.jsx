import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import value_convertor, { GOOGLE_API_KEY } from "../utils/constants";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { PiShareFatThin } from "react-icons/pi";
import { TfiDownload } from "react-icons/tfi";
import { MdSort } from "react-icons/md";

import { VscVerified } from "react-icons/vsc";
import Recomended from "./Recomended";
import moment from "moment";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const [searchParams] = useSearchParams();

  const videoId = searchParams.get("v");

  const [apiData, setApiData] = useState(null);

  const [channelData, setChannelData] = useState(null);

  const [commentData, setcommentData] = useState([]);

  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${searchParams.get("v")}&key=${GOOGLE_API_KEY}`;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };

  const fetchOtherData = async () => {
    try {
      const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${GOOGLE_API_KEY}`;
      const data = await fetch(channelDataUrl);
      const json = await data.json();
      if (json.items && json.items.length > 0) {
        setChannelData(json.items[0]);
      }
    } catch (err) {
      console.error("Failed to fetch channel details:", err);
    }

    try {
      const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${searchParams.get("v")}&maxResults=50&key=${GOOGLE_API_KEY}`;
      const res = await fetch(commentUrl);
      const data = await res.json();
      setcommentData(data.items || []);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      setcommentData([]);
    }
  };

  const formatViewCount = (count) => {
    if (Number(count) >= 1_000_000) {
      return (Number(count) / 1_000_000).toFixed(1) + "M";
    } else if (Number(count) >= 1_000) {
      return (Number(count) / 1_000).toFixed(1) + "K";
    } else {
      return count?.toString() || "0";
    }
  };

  // console.log(commentData);

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apiData?.snippet?.channelId) {
      fetchOtherData();
    }
  }, [apiData]);

  return (
    <div className="watch-page-wrapper">
      <div className="watch-page-container">
        <div className="video-frame-container">
          <iframe
            className="iframe"
            width="100%"
            height="552"
            src={"https://www.youtube.com/embed/" + searchParams.get("v")}
            allowFullScreen
          ></iframe>
        </div>
        <div className="the-after-iframe-full-container-till-the-second-div">
          <h3 className="watch-title">
            {apiData ? apiData.snippet.title : "Tiele Here"}
          </h3>
          <div className="logo-chanelId-sub-lik-shr-down-container">
            <img
              src={
                channelData ?
                  channelData.snippet.thumbnails.default.url
                : "shata"
              }
              width="40px"
            />
            <div className="channel-verified-sub-container">
              <div className="channel-verified-container">
                <p>{apiData ? apiData.snippet.channelTitle : "Tiele Here"}</p>
                <img
                  src="https://pbs.twimg.com/media/G05lL7oWkAAWDTd?format=png&name=small"
                  style={{ marginLeft: "5px", marginTop: 2, width: 14 }}
                />
              </div>
              <span>
                {channelData ?
                  formatViewCount(channelData.statistics.subscriberCount)
                : "6.07M"}
              </span>{" "}
              <span>subscribers</span>
            </div>

            <div className="Subscribe-btn-container">
              <p>Subscribe</p>
            </div>

            <div className="like-container">
              <AiOutlineLike size={23} style={{ marginLeft: "15px" }} />{" "}
              <span>
                {apiData ?
                  value_convertor(apiData.statistics.likeCount)
                : "745K"}
              </span>{" "}
              <span style={{ color: "#D9D9D9", marginLeft: "9   px" }}>|</span>
              <AiOutlineDislike size={23} style={{ marginLeft: "15px" }} />
            </div>

            <div className="share-container">
              <PiShareFatThin size={23} style={{ marginLeft: "15px" }} />{" "}
              <span>Share</span>
            </div>

            <div className="download-container">
              <TfiDownload fontSize={17} style={{ marginLeft: "15px" }} />{" "}
              <span>Download</span>
            </div>

            <div className="option-container">
              <span>...</span>
            </div>
          </div>

          <div className="views-time-description-container">
            <div className="views-time-container">
              <p>
                {" "}
                {apiData ?
                  value_convertor(apiData.statistics.viewCount)
                : "2,713,059"}{" "}
                views
              </p>
              <p>
                {apiData ?
                  moment(apiData.snippet.publishedAt).fromNow()
                : "10 Hours ago"}
              </p>
            </div>
            <div className="description-container">
              <p>
                {apiData ?
                  showFullDescription ?
                    apiData.snippet.description // full text
                  : apiData.snippet.description.slice(0, 300) + "..." // truncated
                : "STAR STUDIO18 PRESENTS"}
              </p>
              {apiData && apiData.snippet.description.length > 300 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#065fd4",
                    cursor: "pointer",
                    padding: 0,
                    marginTop: "5px",
                  }}
                >
                  {showFullDescription ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          </div>
          <div className="comment-container">
            <div className="comment-sort-container">
              <p>
                {apiData ? apiData.statistics.commentCount : "5,097 Comments"}{" "}
                Comments
              </p>
              <div className="sort">
                <MdSort size={24} />
                <p>Sort by</p>
              </div>
            </div>
            <hr style={{ marginTop: "20px", color: "#E5E5E5" }} />

            <div className="thewholecommentreplybox">
              {commentData?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="logo-user-comment-lik-dislik-reply-container"
                  >
                    <div className="logo-user-comment-container">
                      <img
                        src={
                          item.snippet.topLevelComment.snippet
                            .authorProfileImageUrl
                        }
                        width="38px"
                        style={{ borderRadius: "50px" }}
                      />
                      <div className="user-comment">
                        <p>
                          {
                            item.snippet.topLevelComment.snippet
                              .authorDisplayName
                          }
                          <span className="user-comment-reply-time">
                            {moment(
                              item.snippet.topLevelComment.snippet.publishedAt,
                            ).fromNow()}
                          </span>
                        </p>
                        <p>
                          {item.snippet.topLevelComment.snippet.textDisplay}
                        </p>
                      </div>
                    </div>
                    <div className="like-dislike-reply-container">
                      <AiOutlineLike size={23} />
                      <span
                        style={{
                          color: "#606060",
                          fontFamily: "RobotoRegular",
                          fontSize: "12px",
                          marginLeft: "6px",
                        }}
                      >
                        {value_convertor(
                          item.snippet.topLevelComment.snippet.likeCount,
                        )}
                      </span>
                      <AiOutlineDislike
                        size={23}
                        style={{ color: "black", marginLeft: "20px" }}
                      />
                      <span
                        style={{
                          fontFamily: "RobotoBold",
                          fontSize: "12px",
                          marginLeft: "30px",
                        }}
                      >
                        Reply
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="recommended-container">
        <LiveChat />
        <Recomended videoId={videoId} />
      </div>
    </div>
  );
};

export default WatchPage;
