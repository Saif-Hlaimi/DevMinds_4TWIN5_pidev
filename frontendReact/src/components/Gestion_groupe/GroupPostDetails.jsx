import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Back from "../common/back/Back";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { franc } from "franc";
import html2pdf from "html2pdf.js";
import "./groupStyles.css";

const GroupPostDetails = () => {
  const { groupId, postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isGroupOwner, setIsGroupOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [reportModal, setReportModal] = useState({ open: false, groupId: null, postId: null, commentId: null, type: null });
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  const utteranceRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const currentUserId = currentUser.id || currentUser._id;

  const languageVoiceMap = {
    eng: "en-US",
    fra: "fr-FR",
    spa: "es-ES",
    deu: "de-DE",
    ita: "it-IT",
    por: "pt-BR",
    ara: "ar-SA",
    zho: "zh-CN",
    jpn: "ja-JP",
    rus: "ru-RU",
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (likeClicked) {
      const timer = setTimeout(() => setLikeClicked(false), 300);
      return () => clearTimeout(timer);
    }
  }, [likeClicked]);

  useEffect(() => {
    if (dislikeClicked) {
      const timer = setTimeout(() => setDislikeClicked(false), 300);
      return () => clearTimeout(timer);
    }
  }, [dislikeClicked]);

  const fetchPostData = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    try {
      const response = await axios.get(
          `http://localhost:5000/api/groups/posts/${groupId}/${postId}`,
          { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      const data = response.data;

      if (!prevPostRef.current || JSON.stringify(prevPostRef.current) !== JSON.stringify(data)) {
        setPost(data);
        setComments(data.comments || []);
        setLikesCount(data.likesCount || 0);
        setDislikesCount(data.dislikesCount || 0);
        setHasLiked(data.hasLiked || false);
        setHasDisliked(data.hasDisliked || false);
        setIsGroupOwner(data.isGroupOwner || false);
        prevPostRef.current = data;
      }
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load post.");
      if (err.response?.status === 401) navigate("/signin");
    }
  };

  const prevPostRef = useRef(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      navigate("/signin");
      return;
    }
    fetchPostData();
    const interval = setInterval(fetchPostData, 5000);
    return () => clearInterval(interval);
  }, [groupId, postId, navigate]);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      if (!post || !post.content) {
        setToastMessage("No content available to read.");
        return;
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content, "text/html");
      const plainText = doc.body.textContent || "";
      if (!plainText.trim()) {
        setToastMessage("No readable text found in post.");
        return;
      }

      const detectedLang = franc(plainText, { minLength: 10 });
      const langCode = languageVoiceMap[detectedLang] || "en-US";

      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.lang = langCode;
      utteranceRef.current = utterance;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        utteranceRef.current = null;
      };
      utterance.onerror = () => {
        setToastMessage("TTS stopped!");
        setIsPlaying(false);
        utteranceRef.current = null;
      };

      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      utteranceRef.current = null;
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const jwtToken = localStorage.getItem("jwtToken");
    const tempComment = {
      _id: `temp-${Date.now()}`,
      content: newComment,
      userId: { _id: currentUserId, username: currentUser.username },
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [...prev, tempComment]);
    try {
      const response = await axios.post(
          `http://localhost:5000/api/groups/posts/${groupId}/${postId}/comment`,
          { content: newComment },
          { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      setComments(response.data.comments);
      setNewComment("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add comment.");
      setComments((prev) => prev.filter((c) => c._id !== tempComment._id));
    }
  };

  const handleDeleteComment = async (commentId) => {
    const jwtToken = localStorage.getItem("jwtToken");
    try {
      const response = await axios.delete(
          `http://localhost:5000/api/groups/posts/${groupId}/${postId}/comment/${commentId}`,
          { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      setComments(response.data.comments);
      setToastMessage("Comment deleted successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete comment.");
    }
  };

  const handleEditComment = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditedCommentContent(currentContent);
  };

  const handleSaveEditComment = async (commentId) => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!editedCommentContent.trim()) {
      setError("Comment content cannot be empty.");
      return;
    }

    try {
      const response = await axios.put(
          `http://localhost:5000/api/groups/posts/${groupId}/${postId}/comment/${commentId}`,
          { content: editedCommentContent },
          { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      setComments(response.data.comments);
      setEditingCommentId(null);
      setEditedCommentContent("");
      setToastMessage("Comment updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update comment.");
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentContent("");
  };

  const handleLikeToggle = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    try {
      const endpoint = `http://localhost:5000/api/groups/posts/${groupId}/${postId}/like`;
      let response;
      if (hasLiked) {
        response = await axios.delete(endpoint, { headers: { Authorization: `Bearer ${jwtToken}` } });
      } else {
        response = await axios.post(endpoint, {}, { headers: { Authorization: `Bearer ${jwtToken}` } });
      }
      setLikesCount(response.data.likesCount);
      setDislikesCount(response.data.dislikesCount);
      setHasLiked(response.data.hasLiked);
      setHasDisliked(response.data.hasDisliked);
      setLikeClicked(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to toggle like.");
    }
  };

  const handleDislikeToggle = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    try {
      const endpoint = `http://localhost:5000/api/groups/posts/${groupId}/${postId}/dislike`;
      let response;
      if (hasDisliked) {
        response = await axios.delete(endpoint, { headers: { Authorization: `Bearer ${jwtToken}` } });
      } else {
        response = await axios.post(endpoint, {}, { headers: { Authorization: `Bearer ${jwtToken}` } });
      }
      setLikesCount(response.data.likesCount);
      setDislikesCount(response.data.dislikesCount);
      setHasLiked(response.data.hasLiked);
      setHasDisliked(response.data.hasDisliked);
      setDislikeClicked(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to toggle dislike.");
    }
  };

  const handleDeletePost = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    try {
      await axios.delete(`http://localhost:5000/api/groups/posts/${groupId}/${postId}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setToastMessage("Post has been deleted.");
      setPost(null);
      setTimeout(() => {
        navigate(`/groups/${groupId}`);
      }, 2000);
    } catch (err) {
      setToastMessage(err.response?.data?.message || "Failed to delete post.");
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    const jwtToken = localStorage.getItem("jwtToken");
    const { groupId, postId, commentId, type } = reportModal;
    let url;
    if (type === "group") {
      url = `http://localhost:5000/api/groups/${groupId}/report`;
    } else if (type === "post") {
      url = `http://localhost:5000/api/groups/posts/${groupId}/${postId}/report`;
    } else if (type === "comment") {
      url = `http://localhost:5000/api/groups/posts/${groupId}/${postId}/comment/${commentId}/report`;
    }

    try {
      await axios.post(
          url,
          { reason: reportReason, details: reportDetails },
          { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      setToastMessage(`${type === "group" ? "Group" : type === "post" ? "Post" : "Comment"} reported successfully.`);
      setReportModal({ open: false, groupId: null, postId: null, commentId: null, type: null });
      setReportReason("");
      setReportDetails("");
    } catch (err) {
      setToastMessage(err.response?.data?.message || `Failed to report ${type === "group" ? "group" : type === "post" ? "post" : "comment"}.`);
    }
  };

  const handlePrintPDF = () => {
    if (!post || !post.title || !post.subject || !post.content) {
      setToastMessage("No post content available to print.");
      return;
    }

    const element = document.createElement("div");
    element.style.padding = "20px";
    element.style.fontFamily = "Arial, sans-serif";
    element.style.maxWidth = "8.5in";
    element.style.margin = "0 auto";

    element.innerHTML = `
      <h1 style="font-size: 24pt; color: #a47f18; margin-bottom: 10px; text-align: center;">${post.title}</h1>
      <h2 style="font-size: 18pt; color: #666; margin-bottom: 20px; text-align: center;">${post.subject}</h2>
      <div style="font-size: 12pt; line-height: 1.6; color: #333;">${post.content}</div>
    `;

    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${post.title.replace(/\s+/g, "_")}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
        .set(opt)
        .from(element)
        .save()
        .catch(() => {
          setToastMessage("Failed to generate PDF.");
        });
  };

  const renderContent = (htmlContent) => {
    if (!htmlContent || typeof htmlContent !== "string") {
      return <p>No content available.</p>;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      const elements = Array.from(doc.body.childNodes);

      const rendered = elements
          .map((node, index) => {
            if (node.nodeName === "P") {
              return (
                  <p key={index} className="group-post-details__paragraph">
                    {node.textContent || node.innerText}
                  </p>
              );
            }

            if (node.nodeName === "PRE" && node.className.includes("ql-syntax")) {
              const codeContent = node.textContent || node.innerText || "";
              const languageMatch = node.className.match(/language-(\w+)/);
              const language = languageMatch ? languageMatch[1] : "text";
              return (
                  <SyntaxHighlighter
                      key={index}
                      style={vscDarkPlus}
                      language={language}
                      PreTag="div"
                      className="group-post-details__code-block"
                  >
                    {codeContent}
                  </SyntaxHighlighter>
              );
            }

            if (node.nodeName === "#text" && node.textContent.trim()) {
              return (
                  <p key={index} className="group-post-details__paragraph">
                    {node.textContent}
                  </p>
              );
            }

            return null;
          })
          .filter(Boolean);

      return rendered.length > 0 ? rendered : <p>No renderable content found.</p>;
    } catch (err) {
      return <p>Error rendering content: {err.message}</p>;
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="group-form__error">{error}</p>;
  if (!post)
    return (
        <>
          {toastMessage && <div className="toast-message">{toastMessage}</div>}
          <p>Post not found.</p>
        </>
    );

  const isPostAuthor = post.userId?.id === currentUserId || post.userId?._id === currentUserId;

  return (
      <>
      <Back title="Post Details" />
      <section className="group-section">
        <div className="group-container">
          <div className="group-post-details">
            <div className="group-post-details__content">
              {/* Meta Information at the Top */}
              <div className="group-post-details__meta-info">
                <span className="group-post-details__meta">
                  Posted by: <label>{post.userId?.username || "Unknown"}</label>
                </span>
                <span className="group-post-details__meta">
                  Created: <label>{new Date(post.createdAt).toLocaleString()}</label>
                </span>
              </div>

              {/* Post Title and Subject */}
              <div className="group-post-details__header">
                <h1 className="group-post-details__title">{post.title}</h1>
                <h2 className="group-post-details__subject">{post.subject}</h2>
              </div>

              {/* Post Content */}
              <div className="group-post-details__text">{renderContent(post.content)}</div>

              {/* Media Section */}
              {post.media && post.media.length > 0 && (
                  <div className="group-post-details__media">
                    <h4>Media</h4>
                    {post.media.map((media, index) => (
                        <div key={media.fileId || index} className="group-post-details__media-item">
                          {media.contentType?.startsWith("image/") ? (
                              <img
                                  src={`http://localhost:5000/api/groups/media/${media.fileId}`}
                                  alt={media.filename}
                                  className="media-image"
                                  onError={(e) => (e.target.src = "/fallback-image.jpg")}
                              />
                          ) : media.contentType?.startsWith("video/") ? (
                              <video
                                  controls
                                  className="media-video"
                                  src={`http://localhost:5000/api/groups/media/${media.fileId}`}
                              >
                                Your browser does not support the video tag.
                              </video>
                          ) : (
                              <a
                                  href={`http://localhost:5000/api/groups/media/${media.fileId}`}
                                  download={media.filename}
                                  className="media-link"
                              >
                                Download {media.filename} ({(media.length / 1024).toFixed(2)} KB)
                              </a>
                          )}
                          <p>
                            {media.filename} ({media.contentType}, {media.length} bytes)
                          </p>
                        </div>
                    ))}
                  </div>
              )}

              {/* Interaction Section */}
              <div className="group-post-details__interaction">
                <div className="group-post-details__actions">
                  <div className="group-post-details__action-item">
                    <span
                        className={`group-emoji group-emoji--like ${hasLiked ? "active" : ""} ${likeClicked ? "clicked" : ""}`}
                        onClick={handleLikeToggle}
                        title={hasLiked ? `Unlike this post (${likesCount})` : `Like this post (${likesCount})`}
                    >
                      {hasLiked ? "👍" : "👆"}
                    </span>
                    <span className="group-post-details__counter">{likesCount}</span>
                  </div>
                  <div className="group-post-details__action-item">
                    <span
                        className={`group-emoji group-emoji--dislike ${hasDisliked ? "active" : ""} ${dislikeClicked ? "clicked" : ""}`}
                        onClick={handleDislikeToggle}
                        title={hasDisliked ? `Undislike this post (${dislikesCount})` : `Dislike this post (${dislikesCount})`}
                    >
                      {hasDisliked ? "👎" : "👇"}
                    </span>
                    <span className="group-post-details__counter">{dislikesCount}</span>
                  </div>
                  <div className="group-post-details__action-item">
                    <span
                        className={`group-emoji group-emoji--read ${isPlaying ? "active" : ""}`}
                        onClick={handleTogglePlay}
                        title={isPlaying ? "Stop reading" : "Read post aloud"}
                    >
                      {isPlaying ? "⏹️" : "▶️"}
                    </span>
                  </div>
                  <div className="group-post-details__action-item">
                    <span
                        className="group-emoji group-emoji--print"
                        onClick={handlePrintPDF}
                        title="Print this post as PDF"
                    >
                      📄
                    </span>
                  </div>
                  {(isPostAuthor || isGroupOwner) && (
                      <div className="group-post-details__action-item">
                      <span
                          className="group-emoji group-emoji--delete"
                          onClick={handleDeletePost}
                          title="Delete this post"
                      >
                        🗑️
                      </span>
                      </div>
                  )}
                  {!isPostAuthor && (
                      <div className="group-post-details__action-item">
                      <span
                          className="group-emoji group-emoji--report"
                          onClick={() => setReportModal({ open: true, groupId, postId, commentId: null, type: "post" })}
                          title="Report this post"
                      >
                        🚨
                      </span>
                      </div>
                  )}
                </div>

                {/* Comment Form */}
                <form onSubmit={handleAddComment} className="group-post-details__comment-form">
                  <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="group-form__textarea group-post-details__comment-input"
                  />
                  <button
                      type="submit"
                      className="group-post-details__comment-btn"
                      title="Submit comment"
                  >
                    Comment
                  </button>
                </form>

                {/* Comments Section */}
                <div className="group-post-details__comments">
                  <h4>Comments ({comments.length})</h4>
                  {comments.length > 0 ? (
                      comments.map((comment) => (
                          <div key={comment._id} className="group-post-details__comment">
                            {editingCommentId === comment._id ? (
                                <div className="group-post-details__edit-comment">
                            <textarea
                                value={editedCommentContent}
                                onChange={(e) => setEditedCommentContent(e.target.value)}
                                className="group-form__textarea group-post-details__comment-input"
                            />
                                  <div className="group-post-details__edit-actions">
                              <span
                                  className="group-emoji group-emoji--submit"
                                  onClick={() => handleSaveEditComment(comment._id)}
                                  title="Save edited comment"
                              >
                                💾
                              </span>
                                    <span
                                        className="group-emoji group-emoji--cancel"
                                        onClick={handleCancelEdit}
                                        title="Cancel editing"
                                    >
                                ❌
                              </span>
                                  </div>
                                </div>
                            ) : (
                                <>
                                  <p>{comment.content}</p>
                                  <span className="group-post-details__comment-meta">
                              By: <label>{comment.userId?.username || "Unknown"}</label> |{" "}
                                    {new Date(comment.createdAt).toLocaleString()}
                                    {isPostAuthor && (
                                        <span className="group-post-details__report-count">
                                  | Reports: <label>{comment.reportCount || 0}</label>
                                </span>
                                    )}
                                    {((comment.userId?.id === currentUserId || comment.userId?._id === currentUserId) || isPostAuthor) && (
                                        <>
                                          {(comment.userId?.id === currentUserId || comment.userId?._id === currentUserId) && (
                                              <span
                                                  className="group-emoji group-emoji--edit"
                                                  onClick={() => handleEditComment(comment._id, comment.content)}
                                                  title="Edit this comment"
                                              >
                                      ✏️
                                    </span>
                                          )}
                                          <span
                                              className="group-emoji group-emoji--delete"
                                              onClick={() => handleDeleteComment(comment._id)}
                                              title="Delete this comment"
                                          >
                                    🗑️
                                  </span>
                                        </>
                                    )}
                                    {(comment.userId?.id !== currentUserId && comment.userId?._id !== currentUserId) && (
                                        <span
                                            className="group-emoji group-emoji--report"
                                            onClick={() => setReportModal({ open: true, groupId, postId, commentId: comment._id, type: "comment" })}
                                            title="Report this comment"
                                        >
                                  🚨
                                </span>
                                    )}
                            </span>
                                </>
                            )}
                          </div>
                      ))
                  ) : (
                      <p>No comments yet.</p>
                  )}
                </div>

                {/* Navigation Section */}
                <div className="navigation-buttons">
                  <span
                      className="group-emoji group-emoji--view-posts"
                      onClick={() => navigate("/groups")}
                      title="View group list"
                  >
                    📋
                  </span>
                  <span
                      className="group-emoji group-emoji--view-posts"
                                    onClick={() => navigate(`/groups/${groupId}`)}
                  title="Back to posts"
                  >
                  🔙
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

  {/* Report Modal */}
  {reportModal.open && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Report {reportModal.type === "group" ? "Group" : reportModal.type === "post" ? "Post" : "Comment"}</h2>
          <form onSubmit={handleReportSubmit} className="group-form">
            <div className="group-form__group">
              <label htmlFor="reason">Reason</label>
              <select
                  id="reason"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  required
              >
                <option value="">Select a reason</option>
                <option value="Inappropriate Content">Inappropriate Content</option>
                <option value="Spam">Spam</option>
                <option value="Off-Topic">Off-Topic</option>
                <option value="Harassment">Harassment</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="group-form__group">
              <label htmlFor="details">Details (optional)</label>
              <textarea
                  id="details"
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Provide more details..."
                  maxLength="500"
              />
            </div>
            <div className="modal-actions">
                <span
                    className="group-emoji group-emoji--submit"
                    onClick={handleReportSubmit}
                    title="Submit report"
                >
                  📨
                </span>
              <span
                  className="group-emoji group-emoji--cancel"
                  onClick={() => setReportModal({ open: false, groupId: null, postId: null, commentId: null, type: null })}
                  title="Cancel report"
              >
                  ❌
                </span>
            </div>
          </form>
        </div>
      </div>
  )}

  {/* Toast Message */}
  {toastMessage && <div className="toast-message">{toastMessage}</div>}
</>
);
};

export default GroupPostDetails;