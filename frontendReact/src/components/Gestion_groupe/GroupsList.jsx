import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Back from "../common/back/Back";
import "./groupStyles.css";

const GroupsList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [requests, setRequests] = useState({});
  const [memberships, setMemberships] = useState({});
  const [reportModal, setReportModal] = useState({ open: false, groupId: null, type: null });
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [privacyFilter, setPrivacyFilter] = useState("all");
  const [activeMenu, setActiveMenu] = useState("all");
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const currentUserId = currentUser.id || currentUser._id;

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const fetchGroups = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    try {
      const response = await axios.get("http://localhost:5000/api/groups/all", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setGroups(response.data);
      setLoading(false);

      const membershipPromises = response.data.map((group) =>
          axios.get(`http://localhost:5000/api/groups/${group._id}/membership`, {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }).then((res) => res.data.isMember)
      );
      const membershipResponses = await Promise.all(membershipPromises);
      const membershipStatus = {};
      membershipResponses.forEach((isMember, index) => {
        membershipStatus[response.data[index]._id] = isMember;
      });
      setMemberships(membershipStatus);

      const requestPromises = response.data.map((group) =>
          axios.get(`http://localhost:5000/api/groups/${group._id}/requests`, {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }).catch(() => ({ data: [] }))
      );
      const requestResponses = await Promise.all(requestPromises);
      const requestStatus = {};
      requestResponses.forEach((res, index) => {
        const groupId = response.data[index]._id;
        const userRequest = res.data.find((req) => req.userId?._id === currentUserId);
        if (userRequest) requestStatus[groupId] = userRequest;
      });
      setRequests(requestStatus);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load groups.");
      if (err.response?.status === 401) navigate("/signin");
    }
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      navigate("/signin");
      return;
    }
    fetchGroups();
    const interval = setInterval(fetchGroups, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleCreateGroup = () => navigate("/create-group");
  const handleViewPosts = (groupId) => navigate(`/groups/${groupId}`);
  const handleViewRequests = (groupId) => navigate(`/groups/${groupId}/requests`);
  const handleEditGroup = (groupId) => navigate(`/groups/${groupId}/edit`);
  const handleViewMembers = (groupId) => navigate(`/groups/${groupId}/members`);

  const handleDeleteGroup = async (groupId) => {
    const jwtToken = localStorage.getItem("jwtToken");
    try {
      await axios.delete(`http://localhost:5000/api/groups/${groupId}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setGroups((prev) => prev.filter((g) => g._id !== groupId));
      setToastMessage("Group has been deleted.");
    } catch (err) {
      setToastMessage(err.response?.data?.message || "Failed to delete group.");
    }
  };

  const handleJoinGroup = async (groupId, privacy) => {
    const jwtToken = localStorage.getItem("jwtToken");
    try {
      const isMember = memberships[groupId];
      const isPending = requests[groupId]?.status === "pending";

      if (isMember) {
        setToastMessage("You are already a member of this group.");
        navigate(`/groups/${groupId}`);
        return;
      }

      if (privacy === "public") {
        const response = await axios.post(
            `http://localhost:5000/api/groups/${groupId}/join`,
            {},
            { headers: { Authorization: `Bearer ${jwtToken}` } }
        );
        setMemberships((prev) => ({ ...prev, [groupId]: true }));
        setGroups((prev) =>
            prev.map((group) =>
                group._id === groupId
                    ? { ...group, memberCount: response.data.group.memberCount }
                    : group
            )
        );
        setToastMessage("Joined group successfully!");
        navigate(`/groups/${groupId}`);
      } else if (privacy === "private" && !isPending) {
        await axios.post(
            `http://localhost:5000/api/groups/${groupId}/request`,
            {},
            { headers: { Authorization: `Bearer ${jwtToken}` } }
        );
        setRequests((prev) => ({ ...prev, [groupId]: { status: "pending" } }));
        setToastMessage("Join request sent successfully.");
      } else if (isPending) {
        setToastMessage("Your request to join is still pending.");
      }
    } catch (err) {
      setToastMessage(err.response?.data?.message || "Failed to join/request group.");
    }
  };

  const handleLeaveGroup = async (groupId) => {
    const jwtToken = localStorage.getItem("jwtToken");
    try {
      const response = await axios.post(
          `http://localhost:5000/api/groups/${groupId}/leave`,
          {},
          { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      setMemberships((prev) => ({ ...prev, [groupId]: false }));
      setGroups((prev) =>
          prev.map((group) =>
              group._id === groupId
                  ? { ...group, memberCount: response.data.group.memberCount }
                  : group
          )
      );
      setRequests((prev) => {
        const newRequests = { ...prev };
        delete newRequests[groupId];
        return newRequests;
      });
      setToastMessage("You have left the group.");
    } catch (err) {
      setToastMessage(err.response?.data?.message || "Failed to leave group.");
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    const jwtToken = localStorage.getItem("jwtToken");
    const { groupId, type } = reportModal;
    const url =
        type === "group"
            ? `http://localhost:5000/api/groups/${groupId}/report`
            : `http://localhost:5000/api/groups/posts/${groupId}/${reportModal.postId}/report`;
    try {
      await axios.post(
          url,
          { reason: reportReason, details: reportDetails },
          { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      setToastMessage(`${type === "group" ? "Group" : "Post"} reported successfully.`);
      setReportModal({ open: false, groupId: null, type: null });
      setReportReason("");
      setReportDetails("");
    } catch (err) {
      setToastMessage(err.response?.data?.message || `Failed to report ${type === "group" ? "group" : "post"}.`);
    }
  };

  const handleMenuClick = (option) => {
    setActiveMenu(option);
    if (option === "forYou") {
      navigate('/ai-recommendation');
    }
  };

  const filteredGroups = groups.filter((group) =>
      searchQuery
          ? group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.description.toLowerCase().includes(searchQuery.toLowerCase())
          : true
  ).filter((group) => (privacyFilter === "all" ? true : group.privacy === privacyFilter));

  if (loading) return <p>Loading groups...</p>;
  if (error) return <p className="group-form__error">{error}</p>;

  return (
      <>
        <Back title="Available Groups" />
        <section className="group-section">
          <div className="group-container">
            <div className="group-menu">
              <button
                  className={`group-menu__item ${activeMenu === "all" ? "group-menu__item--active" : ""}`}
                  onClick={() => handleMenuClick("all")}
              >
                All
              </button>
              <button
                  className={`group-menu__item ${activeMenu === "forYou" ? "group-menu__item--active" : ""}`}
                  onClick={() => handleMenuClick("forYou")}
              >
                For You
              </button>
            </div>

            <div className="group-controls">
              <input
                  type="text"
                  placeholder="Search groups by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="group-search__input"
              />
              <select
                  value={privacyFilter}
                  onChange={(e) => setPrivacyFilter(e.target.value)}
                  className="group-filter__select"
              >
                <option value="all">All Privacy</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="group-grid">
              <div className="group-card group-card--create">
                <div className="group-card__content">
                  <h1 className="group-card__title">Create a New Group</h1>
                  <p className="group-card__description">Start your own community!</p>
                  <span className="group-emoji group-emoji--create" onClick={handleCreateGroup} title="Create Group">
                  ➕
                </span>
                </div>
              </div>
              {filteredGroups.map((group) => {
                const isOwner = group.createdBy?._id === currentUserId || group.createdBy?.id === currentUserId;
                const isPending = requests[group._id]?.status === "pending";
                const isMember = memberships[group._id];

                return (
                    <div className="group-card" key={group._id}>
                      <div className="group-card__content">
                        <h1 className="group-card__title">{group.name}</h1>
                        <p className="group-card__description">{group.description}</p>
                        <span className="group-card__meta">
                      Privacy: <label>{group.privacy}</label>
                    </span>
                        <span className="group-card__meta">
                      Created By: <label>{group.createdBy?.username || "Unknown"}</label>
                    </span>
                        <span className="group-card__meta">
                      Members: <label>{group.memberCount || 0}</label>
                    </span>
                        <div className="group-card__actions">
                          {isOwner ? (
                              <>
                          <span className="group-emoji group-emoji--view-posts" onClick={() => handleViewPosts(group._id)} title="View Posts">
                            📄
                          </span>
                                <span className="group-emoji group-emoji--view-requests" onClick={() => handleViewRequests(group._id)} title="View Requests">
                            📩
                          </span>
                                <span className="group-emoji group-emoji--view-members" onClick={() => handleViewMembers(group._id)} title="View Members">
                            👥
                          </span>
                                <span className="group-emoji group-emoji--edit" onClick={() => handleEditGroup(group._id)} title="Edit Group">
                            ✏️
                          </span>
                                <span className="group-emoji group-emoji--delete" onClick={() => handleDeleteGroup(group._id)} title="Delete Group">
                            🗑️
                          </span>
                              </>
                          ) : (
                              <>
                                {isMember ? (
                                    <>
                              <span className="group-emoji group-emoji--view-posts" onClick={() => handleViewPosts(group._id)} title="View Posts">
                                📄
                              </span>
                                      <span className="group-emoji group-emoji--leave" onClick={() => handleLeaveGroup(group._id)} title="Leave Group">
                                🚪
                              </span>
                                    </>
                                ) : (
                                    <span
                                        className={`group-emoji group-emoji--join ${isPending ? "group-emoji--disabled" : ""}`}
                                        onClick={() => !isPending && handleJoinGroup(group._id, group.privacy)}
                                        title={isPending ? "Request Pending" : "Join Group"}
                                    >
                              {isPending ? "⏳" : "🤝"}
                            </span>
                                )}
                                <span
                                    className="group-emoji group-emoji--report"
                                    onClick={() => setReportModal({ open: true, groupId: group._id, type: "group" })}
                                    title="Report Group"
                                >
                            ⚠️
                          </span>
                              </>
                          )}
                        </div>
                      </div>
                    </div>
                );
              })}
            </div>
          </div>
        </section>
        {reportModal.open && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Report {reportModal.type === "group" ? "Group" : "Post"}</h2>
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
                <span className="group-emoji group-emoji--submit" onClick={handleReportSubmit} title="Submit Report">
                  ✅
                </span>
                    <span
                        className="group-emoji group-emoji--cancel"
                        onClick={() => setReportModal({ open: false, groupId: null, type: null })}
                        title="Cancel"
                    >
                  ❌
                </span>
                  </div>
                </form>
              </div>
            </div>
        )}
        {toastMessage && <div className="toast-message">{toastMessage}</div>}
      </>
  );
};

export default GroupsList;