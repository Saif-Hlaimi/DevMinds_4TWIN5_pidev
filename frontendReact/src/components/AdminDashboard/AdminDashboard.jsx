import React, { useState, useEffect } from "react";
import {
  BarChart,
  PieChart,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import "./AdminDashboard.css";

const dummyCourses = [
  { id: 1, title: "React Basics", description: "Learn the fundamentals of React." },
  { id: 2, title: "Advanced Node.js", description: "Deep dive into Node.js." },
];

const dummyJobs = [
  { id: 1, title: "Frontend Developer", company: "Tech Corp", location: "Remote" },
  { id: 2, title: "Backend Developer", company: "Dev Solutions", location: "Onsite" },
];

const dummyGroups = [
  { id: 1, name: "React Enthusiasts", members: 120 },
  { id: 2, name: "Node.js Developers", members: 80 },
];

const dummyEvents = [
  { id: 1, name: "React Conference", date: "2023-12-01" },
  { id: 2, name: "Node.js Meetup", date: "2023-11-15" },
];

const defaultStatsData = {
  users: {
    total: 0,
    roles: [],
  },
  courses: {
    total: 0,
    categories: [
      { name: "Technical", value: 0 },
      { name: "Business", value: 0 },
      { name: "Design", value: 0 },
      { name: "Other", value: 0 },
    ],
  },
  skills: {
    total: 0,
    trending: [],
  },
};

const Message = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`message ${type}`}>
      {message}
    </div>
  );
};

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingData, setEditingData] = useState({
    username: "",
    email: "",
    role: "",
    phoneNumber: "",
    bio: "",
    location: "",
  });
  const [availableSkills, setAvailableSkills] = useState([]);
  const [assignedSkillIds, setAssignedSkillIds] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:5000/api/users/all");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleRowClick = async (id) => {
    if (selectedUser && selectedUser._id === id) {
      setSelectedUser(null);
      setUserSkills([]);
      setEditingUserId(null);
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedUser(data);
        setEditingUserId(null);
        const skillsResponse = await fetch(`http://localhost:5000/api/users/userskills?userId=${id}`);
        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json();
          setUserSkills(skillsData);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = async (user) => {
    setEditingUserId(user._id);
    setEditingData({
      username: user.username,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber || "",
      bio: user.bio || "",
      location: user.location || "",
    });
    try {
      const response = await fetch("http://localhost:5000/api/admin/skills");
      if (response.ok) {
        const skillsData = await response.json();
        setAvailableSkills(skillsData);
      }
    } catch (error) {
      console.error(error);
    }
    const currentSkillIds = userSkills.map((item) => item.skillId?._id);
    setAssignedSkillIds(currentSkillIds);
  };

  const cancelEditing = () => {
    setEditingUserId(null);
  };

  const handleEditingChange = (e) => {
    setEditingData({ ...editingData, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setAssignedSkillIds(selected);
  };

  const updateUserSkills = async (userId, skillsPayload) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/userskills`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, skills: skillsPayload }),
      });
      if (response.ok) {
        return true;
      } else {
        const data = await response.json();
        showMessage(data.message || "Error updating user skills", "error");
        return false;
      }
    } catch (err) {
      console.error(err);
      showMessage("Error updating user skills", "error");
      return false;
    }
  };

  const verifyUserSkill = async (skillId) => {
    try {
      const skillObj = userSkills.find((s) => s._id === skillId);
      const skillName = skillObj?.skillId?.name || "Skill";
      const response = await fetch(`http://localhost:5000/api/users/userskills/${skillId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationStatus: "verified" }),
      });
      if (response.ok) {
        const skillsResponse = await fetch(`http://localhost:5000/api/users/userskills?userId=${selectedUser._id}`);
        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json();
          setUserSkills(skillsData);
        }
        await fetch("http://localhost:5000/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: selectedUser._id,
            type: "SKILL_VERIFICATION",
            message: `${skillName} is verified by the admin, check your profile`,
          }),
        });
        showMessage("✅ Skill verified");
      } else {
        const data = await response.json();
        showMessage(data.message || "Error verifying skill", "error");
      }
    } catch (err) {
      console.error(err);
      showMessage("Error verifying skill", "error");
    }
  };

  const saveEditedUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingData),
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(users.map((u) => (u._id === data._id ? data : u)));
        setSelectedUser(data);

        const combinedPayload = [
          ...userSkills
            .filter((skill) => skill.skillType === "has")
            .map((skill) => ({
              skillId: skill.skillId?._id,
              skillType: "has",
              verificationStatus: "unverified",
            })),
          ...userSkills
            .filter((skill) => skill.skillType === "wantsToLearn")
            .map((skill) => ({
              skillId: skill.skillId?._id,
              skillType: "wantsToLearn",
              verificationStatus: skill.verificationStatus || "pending",
            })),
        ];
        const skillsUpdated = await updateUserSkills(userId, combinedPayload);
        if (skillsUpdated) {
          const skillsResponse = await fetch(`http://localhost:5000/api/users/userskills?userId=${userId}`);
          if (skillsResponse.ok) {
            const skillsData = await skillsResponse.json();
            setUserSkills(skillsData);
          }
          showMessage("✅ User updated");
        }
        setEditingUserId(null);
      } else {
        showMessage(data.message || "Error updating user", "error");
      }
    } catch (err) {
      console.error(err);
      showMessage("Error updating user", "error");
    }
  };

  const handleDeleteSkill = async (skillId) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      const skillToDelete = userSkills.find((skill) => skill._id === skillId);
      const skillName = skillToDelete?.skillId?.name || "Unknown Skill";

      const response = await fetch(`http://localhost:5000/api/users/userskills/${skillId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const skillsResponse = await fetch(`http://localhost:5000/api/users/userskills?userId=${selectedUser._id}`);
        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json();
          setUserSkills(skillsData);

          if (skillToDelete && skillToDelete.skillType === "has") {
            await fetch("http://localhost:5000/api/notifications", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: selectedUser._id,
                type: "SKILL_REMOVAL",
                message: `${skillName} was deleted from your skills by admin, check your profile`,
              }),
            });
          }
        }
        showMessage("🗑 Skill deleted successfully");
      } else {
        const data = await response.json();
        showMessage(data.message || "Error deleting skill", "error");
      }
    } catch (err) {
      console.error(err);
      showMessage("Error deleting skill", "error");
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(users.filter((u) => u._id !== userId));
        setSelectedUser(null);
        showMessage("User deleted successfully");
      } else {
        showMessage(data.message || "Error deleting user", "error");
      }
    } catch (err) {
      console.error(err);
      showMessage("Error deleting user", "error");
    }
  };

  const approveMentor = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "mentor" }),
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(users.map((u) => (u._id === data._id ? data : u)));
        setSelectedUser(data);

        const combinedPayload = userSkills.map((skill) => ({
          skillId: skill.skillId?._id,
          skillType: skill.skillType,
          verificationStatus: skill.skillType === "has" ? "verified" : (skill.verificationStatus || "pending"),
        }));

        const skillsUpdated = await updateUserSkills(userId, combinedPayload);
        if (skillsUpdated) {
          const skillsResponse = await fetch(`http://localhost:5000/api/users/userskills?userId=${userId}`);
          if (skillsResponse.ok) {
            const skillsData = await skillsResponse.json();
            setUserSkills(skillsData);
          }
          const notifRes = await fetch("http://localhost:5000/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: data._id,
              type: "SKILL_VERIFICATION",
              message: "Your mentor skills have been verified by the admin, check your profile",
            }),
          });
          if (notifRes.ok) {
            showMessage("✅ User role updated to mentor and skills verified");
          } else {
            showMessage("User role updated, but failed to send notification", "warning");
          }
        }
      } else {
        showMessage(data.message || "Error updating user role", "error");
      }
    } catch (err) {
      console.error(err);
      showMessage("Error updating user role", "error");
    }
  };

  const wantsToLearnSkills = userSkills.filter((s) => s.skillType === "wantsToLearn");
  const hasSkillsList = userSkills.filter((s) => s.skillType === "has");

  return (
    <div className="user-manager">
      {message && (
        <Message
          message={message.text}
          type={message.type}
          onClose={() => setMessage(null)}
        />
      )}
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role (👇 Click to expand)</th>
          </tr>
        </thead>
        <tbody>
          {users.map((userItem) => (
            <React.Fragment key={userItem._id}>
              <tr onClick={() => handleRowClick(userItem._id)}>
                <td>{userItem.username}</td>
                <td>{userItem.email}</td>
                <td>
                  {userItem.role}{" "}
                  {selectedUser && selectedUser._id === userItem._id ? null : "👇 Click to expand"}
                </td>
              </tr>
              {selectedUser && selectedUser._id === userItem._id && (
                <tr className="expanded">
                  <td colSpan="3">
                    <div className="expanded-user-details">
                      <div className="user-details-body">
                        <div className="user-details-row">
                          <span className="label">Username:</span>
                          {editingUserId === selectedUser._id ? (
                            <input
                              type="text"
                              name="username"
                              value={editingData.username}
                              onChange={handleEditingChange}
                            />
                          ) : (
                            <span className="value">{selectedUser.username}</span>
                          )}
                        </div>
                        <div className="user-details-row">
                          <span className="label">Email:</span>
                          {editingUserId === selectedUser._id ? (
                            <input
                              type="text"
                              name="email"
                              value={editingData.email}
                              onChange={handleEditingChange}
                            />
                          ) : (
                            <span className="value">{selectedUser.email}</span>
                          )}
                        </div>
                        <div className="user-details-row">
                          <span className="label">Role:</span>
                          {editingUserId === selectedUser._id ? (
                            <select name="role" value={editingData.role} onChange={handleEditingChange}>
                              <option value="learner">Learner</option>
                              <option value="unverified mentor">Unverified Mentor</option>
                              <option value="mentor">Mentor</option>
                              <option value="admin">Admin</option>
                            </select>
                          ) : (
                            <span className="value">{selectedUser.role}</span>
                          )}
                        </div>
                        <div className="user-details-row">
                          <span className="label">Phone:</span>
                          {editingUserId === selectedUser._id ? (
                            <input
                              type="text"
                              name="phoneNumber"
                              value={editingData.phoneNumber}
                              onChange={handleEditingChange}
                            />
                          ) : (
                            <span className="value">{selectedUser.phoneNumber || "N/A"}</span>
                          )}
                        </div>
                        <div className="user-details-row">
                          <span className="label">Bio:</span>
                          {editingUserId === selectedUser._id ? (
                            <textarea
                              name="bio"
                              value={editingData.bio}
                              onChange={handleEditingChange}
                            />
                          ) : (
                            <span className="value">{selectedUser.bio || "N/A"}</span>
                          )}
                        </div>
                        <div className="user-details-row">
                          <span className="label">Location:</span>
                          {editingUserId === selectedUser._id ? (
                            <input
                              type="text"
                              name="location"
                              value={editingData.location}
                              onChange={handleEditingChange}
                            />
                          ) : (
                            <span className="value">{selectedUser.location || "N/A"}</span>
                          )}
                        </div>
                        <div className="user-details-row">
                          <span className="label">Wants to Learn:</span>
                          <ul className="user-skills-list wants-to-learn">
                            {wantsToLearnSkills.length > 0 ? (
                              wantsToLearnSkills.map((skill) => (
                                <li key={skill._id} className="skill-item">
                                  <span className="skill-name">
                                    {skill.skillId ? skill.skillId.name : "Skill no longer available"}
                                  </span>
                                  <button className="delete-btn" onClick={() => handleDeleteSkill(skill._id)}>🗑</button>
                                </li>
                              ))
                            ) : (
                              <span className="value">No skills added</span>
                            )}
                          </ul>
                        </div>
                        <div className="user-details-row">
                          <span className="label">Has:</span>
                          <ul className="user-skills-list has-skills">
                            {hasSkillsList.length > 0 ? (
                              hasSkillsList.map((skill, index) => (
                                <li key={skill._id} className="skill-item">
                                  <div className="skill-card">
                                    <div className="skill-header">
                                      <span className="skill-name">
                                        {skill.skillId ? skill.skillId.name : "Skill no longer available"}
                                      </span>
                                      <span className="verification-status">
                                        ({skill.verificationStatus})
                                      </span>
                                    </div>
                                    {selectedUser.certificateImage && selectedUser.certificateImage[index] && (
                                      <div className="skill-certificate">
                                        <img
                                          src={`http://localhost:5000/api/files/${selectedUser.certificateImage[index].fileId}?t=${Date.now()}`}
                                          alt={selectedUser.certificateImage[index].filename}
                                        />
                                        <p>Certificate: {selectedUser.certificateImage[index].filename}</p>
                                      </div>
                                    )}
                                    <div className="skill-actions">
                                      {skill.verificationStatus !== "verified" && (
                                        <button className="verify-btn" onClick={() => verifyUserSkill(skill._id)}>✅ Verify</button>
                                      )}
                                      <button className="delete-btn" onClick={() => handleDeleteSkill(skill._id)}>🗑 Delete</button>
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <span className="value">No skills added</span>
                            )}
                          </ul>
                        </div>
                        {selectedUser.profileImage && (
                          <div className="user-image-container">
                            <img
                              src={`http://localhost:5000/api/files/${selectedUser.profileImage.fileId}?t=${Date.now()}`}
                              alt={selectedUser.profileImage.filename}
                            />
                          </div>
                        )}
                      </div>
                      <div className="user-actions">
                        {editingUserId !== selectedUser._id ? (
                          <>
                            <button onClick={() => startEditing(selectedUser)}>✏️ Edit</button>
                            <button onClick={() => deleteUser(selectedUser._id)}>🗑 Delete</button>
                            {selectedUser.role === "unverified mentor" && (
                              <button onClick={() => approveMentor(selectedUser._id)}>✅ Approve Mentor</button>
                            )}
                          </>
                        ) : (
                          <>
                            <button onClick={() => saveEditedUser(selectedUser._id)}>💾 Save</button>
                            <button onClick={cancelEditing}>❌ Cancel</button>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SkillManager = () => {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    tags: "",
  });
  const [message, setMessage] = useState(null);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editingData, setEditingData] = useState({
    name: "",
    category: "",
    description: "",
    tags: "",
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("http://localhost:5000/api/admin/skillCategories");
        const data = await response.json();
        setCategories(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, category: data[0] }));
        }
      } catch (err) {
        console.error("Error fetching skill categories:", err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch("http://localhost:5000/api/admin/skills");
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        } else {
          console.error("Error fetching skills:", response.statusText);
        }
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    }
    fetchSkills();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, description, tags } = formData;
    const tagsArray = tags.split(",").map((tag) => tag.trim()).filter((tag) => tag);
    try {
      const response = await fetch("http://localhost:5000/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, description, tags: tagsArray }),
      });
      const data = await response.json();
      if (response.ok) {
        showMessage("Skill added successfully!");
        setSkills((prev) => [...prev, data]);
        setFormData({
          name: "",
          category: categories.length > 0 ? categories[0] : "",
          description: "",
          tags: "",
        });
      } else {
        showMessage(data.message || "Error adding skill", "error");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      showMessage("Error adding skill", "error");
    }
  };

  const handleDeleteSkill = async (skillId) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      const skillData = skills.find((skill) => skill._id === skillId);
      if (!skillData) throw new Error("Skill details not found in local state");
      const skillName = skillData.name;

      const usersWithSkillResponse = await fetch(
        `http://localhost:5000/api/users/userskills/bySkillId/${skillId}`
      );
      let usersWithSkill = [];
      if (usersWithSkillResponse.ok) {
        usersWithSkill = await usersWithSkillResponse.json();
      } else if (usersWithSkillResponse.status === 404) {
        console.log("No users found with this skill.");
      } else {
        console.warn("Error fetching users with skill:", usersWithSkillResponse.statusText);
      }

      const deleteSkillResponse = await fetch(`http://localhost:5000/api/admin/skills/${skillId}`, {
        method: "DELETE",
      });
      if (!deleteSkillResponse.ok) {
        const deleteData = await deleteSkillResponse.json();
        throw new Error(deleteData.message || "Error deleting skill");
      }

      const deleteUserSkillsResponse = await fetch(
        `http://localhost:5000/api/users/userskills/removeBySkillId/${skillId}`,
        { method: "DELETE" }
      );
      if (!deleteUserSkillsResponse.ok) {
        console.warn("Error deleting UserSkill references:", deleteUserSkillsResponse.statusText);
      }

      setSkills((prev) => prev.filter((skill) => skill._id !== skillId));

      const usersWithHasSkill = usersWithSkill.filter((userSkill) => userSkill.skillType === "has");
      if (usersWithHasSkill.length > 0) {
        const notificationPromises = usersWithHasSkill.map((userSkill) =>
          fetch("http://localhost:5000/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: userSkill.userId,
              type: "SKILL_REMOVAL",
              message: `${skillName} is no longer available, check your profile`,
            }),
          })
        );
        await Promise.all(notificationPromises);
      }
      showMessage("🗑 Skill deleted successfully");
    } catch (error) {
      console.error("Error deleting skill:", error);
      showMessage("Error deleting skill: " + error.message, "error");
    }
  };

  const startEditing = (skill) => {
    setEditingSkillId(skill._id);
    setEditingData({
      name: skill.name,
      category: skill.category,
      description: skill.description,
      tags: Array.isArray(skill.tags) ? skill.tags.join(", ") : "",
    });
  };

  const cancelEditing = () => {
    setEditingSkillId(null);
    setEditingData({ name: "", category: "", description: "", tags: "" });
  };

  const handleEditingChange = (e) => {
    setEditingData({ ...editingData, [e.target.name]: e.target.value });
  };

  const saveEditedSkill = async (skillId) => {
    const tagsArray = editingData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/skills/${skillId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editingData.name,
          category: editingData.category,
          description: editingData.description,
          tags: tagsArray,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSkills((prev) => prev.map((s) => (s._id === data._id ? data : s)));
        setEditingSkillId(null);
        setEditingData({ name: "", category: "", description: "", tags: "" });
        showMessage("💾 Skill updated successfully");
      } else {
        showMessage(data.message || "Error updating skill", "error");
      }
    } catch (error) {
      console.error("Error updating skill:", error);
      showMessage("Error updating skill", "error");
    }
  };

  return (
    <div className="skill-manager">
      {message && (
        <Message
          message={message.text}
          type={message.type}
          onClose={() => setMessage(null)}
        />
      )}
      <form onSubmit={handleSubmit} className="skill-form">
        <div>
          <label>Skill Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Tags</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} />
        </div>
        <button type="submit">➕ Add Skill</button>
      </form>
      <h3>Skill List</h3>
      <table className="skill-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Tags</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill._id}>
              <td>
                {editingSkillId === skill._id ? (
                  <input type="text" name="name" value={editingData.name} onChange={handleEditingChange} />
                ) : (
                  skill.name
                )}
              </td>
              <td>
                {editingSkillId === skill._id ? (
                  <select name="category" value={editingData.category} onChange={handleEditingChange}>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                ) : (
                  skill.category
                )}
              </td>
              <td>
                {editingSkillId === skill._id ? (
                  <textarea name="description" value={editingData.description} onChange={handleEditingChange} />
                ) : (
                  skill.description
                )}
              </td>
              <td>
                {editingSkillId === skill._id ? (
                  <input type="text" name="tags" value={editingData.tags} onChange={handleEditingChange} />
                ) : (
                  Array.isArray(skill.tags) ? skill.tags.join(", ") : ""
                )}
              </td>
              <td>{new Date(skill.createdAt).toLocaleString()}</td>
              <td>
                {editingSkillId === skill._id ? (
                  <>
                    <button onClick={() => saveEditedSkill(skill._id)}>💾</button>
                    <button onClick={cancelEditing}>❌</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(skill)}>✏️</button>
                    <button onClick={() => handleDeleteSkill(skill._id)}>🗑</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("statistics");
  const [darkMode, setDarkMode] = useState(false);
  const [statsData, setStatsData] = useState(defaultStatsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode === "true") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/admin/dashboard-stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const data = await response.json();
        const cleanedData = {
          ...data,
          users: {
            ...data.users,
            roles: data.users.roles.map((role) => ({
              ...role,
              count: Math.floor(role.count),
            })),
          },
          courses: {
            ...data.courses,
            total: 0,
            categories: [
              { name: "Technical", value: 0 },
              { name: "Business", value: 0 },
              { name: "Design", value: 0 },
              { name: "Other", value: 0 },
            ], 
          },
        };
        setStatsData(cleanedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load statistics. Using default data.");
        setStatsData(defaultStatsData);
      } finally {
        setLoading(false);
      }
    }
    if (activeSection === "statistics") {
      fetchStats();
    }
  }, [activeSection]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  const renderSection = () => {
    switch (activeSection) {
      case "statistics":
        return (
          <div className="section-content">
            <h2>Overview Statistics</h2>
            {loading ? (
              <p>Loading statistics...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : (
              <div className="stats-grid">
                <div className="stats-card">
                  <h3>Users Overview</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={statsData.users.roles}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="role" />
                      <YAxis tickFormatter={(value) => Math.floor(value)} /> {/* Entiers uniquement */}
                      <Tooltip formatter={(value) => Math.floor(value)} /> {/* Entiers dans tooltips */}
                      <Legend />
                      <Bar dataKey="count" fill="var(--primary-color)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="stats-card">
                  <h3>Course Categories</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={statsData.courses.categories}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="var(--accent-color)"
                        label={({ name, value }) => `${name}: ${Math.floor(value)}`}
                      />
                      <Tooltip formatter={(value) => Math.floor(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="stats-card metric-group">
                  <div className="metric-box">
                    <h4>Total Users</h4>
                    <p className="metric-value">{statsData.users.total}</p>
                  </div>
                  <div className="metric-box">
                    <h4>Total Courses</h4>
                    <p className="metric-value">{statsData.courses.total}</p>
                  </div>
                  <div className="metric-box">
                    <h4>Skills Available</h4>
                    <p className="metric-value">{statsData.skills.total}</p>
                  </div>
                </div>
                <div className="stats-card">
                  <h3>Trending Skills</h3>
                  <ul className="trending-list">
                    {statsData.skills.trending.map((skill, index) => (
                      <li key={index} className="trending-item">
                        <span className="trending-rank">#{index + 1}</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );
      case "users":
        return (
          <div className="section-content">
            <h2>Users</h2>
            <UserManager />
          </div>
        );
      case "courses":
        return (
          <div className="section-content">
            <h2>Courses</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {dummyCourses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.title}</td>
                    <td>{course.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "jobs":
        return (
          <div className="section-content">
            <h2>Jobs</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {dummyJobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "groups":
        return (
          <div className="section-content">
            <h2>Groups</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {dummyGroups.map((group) => (
                  <tr key={group.id}>
                    <td>{group.name}</td>
                    <td>{group.members}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "events":
        return (
          <div className="section-content">
            <h2>Events</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {dummyEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.name}</td>
                    <td>{event.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "addSkill":
        return (
          <div className="section-content">
            <h2>Add New Skill</h2>
            <SkillManager />
          </div>
        );
      default:
        return <div>Select a section from the sidebar.</div>;
    }
  };

  return (
    <>
      <Header />
      <div className="admin-dashboard-container">
        <section className="admin-dashboard">
          <aside className="dashboard-sidebar">
            <h1 className="logo">SkillMinds Admin</h1>
            <ul>
              <li
                className={activeSection === "statistics" ? "active" : ""}
                onClick={() => setActiveSection("statistics")}
              >
                📊 Statistics
              </li>
              <li
                className={activeSection === "users" ? "active" : ""}
                onClick={() => setActiveSection("users")}
              >
                👥 Users
              </li>
              <li
                className={activeSection === "courses" ? "active" : ""}
                onClick={() => setActiveSection("courses")}
              >
                📚 Courses
              </li>
              <li
                className={activeSection === "jobs" ? "active" : ""}
                onClick={() => setActiveSection("jobs")}
              >
                💼 Jobs
              </li>
              <li
                className={activeSection === "groups" ? "active" : ""}
                onClick={() => setActiveSection("groups")}
              >
                👥 Groups
              </li>
              <li
                className={activeSection === "events" ? "active" : ""}
                onClick={() => setActiveSection("events")}
              >
                🗓 Events
              </li>
              <li
                className={activeSection === "addSkill" ? "active" : ""}
                onClick={() => setActiveSection("addSkill")}
              >
                ➕ Skills
              </li>
            </ul>
          </aside>
          <main className="dashboard-content">{renderSection()}</main>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;