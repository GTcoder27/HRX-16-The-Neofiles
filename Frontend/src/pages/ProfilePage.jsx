import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase.jsx';
import toast from 'react-hot-toast';
import {Loader} from "lucide-react";

export default function ProfilePage() {
  const { authUser, getData, update_user } = useFirebase();
  const [form, setForm] = useState({
    fullname: '',
    experience: [],
    programmingLanguages: ''
  });
  const [newSkill, setNewSkill] = useState({
    domain: '',
    level: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function fetchUserDetails() {
      if (authUser?.email) {
        const res = await getData('users', authUser.email);
        if (res.success && res.data) {
          setForm({
            fullname: res.data.fullname || '',
            experience: stringToSkills(res.data.experience) || [],
            programmingLanguages: res.data.programmingLanguages || ''
          });
        }
      }
      setLoading(false);
    }
    fetchUserDetails();
  }, [authUser, getData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNewSkillChange = (e) => {
    setNewSkill({ ...newSkill, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    if (newSkill.domain.trim() && newSkill.level) {
      setForm({
        ...form,
        experience: [...form.experience, { ...newSkill }]
      });
      setNewSkill({ domain: '', level: '' });
    }
  };

  const skillsToString = (skillsArray) => {
    return skillsArray.map(skill => `${skill.domain}:${skill.level}`).join(',');
  };

  const stringToSkills = (skillsString) => {
    if (!skillsString || skillsString.trim() === '') return [];
    return skillsString.split(',').map(skill => {
      const [domain, level] = skill.split(':');
      return { domain: domain || '', level: level || '' };
    }).filter(skill => skill.domain && skill.level);
  };

  const removeSkill = (index) => {
    const updatedExperience = form.experience.filter((_, i) => i !== index);
    setForm({ ...form, experience: updatedExperience });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    // Reset form to original data
    fetchUserDetails();
  };

  const fetchUserDetails = async () => {
    if (authUser?.email) {
      const res = await getData('users', authUser.email);
      if (res.success && res.data) {
        setForm({
          fullname: res.data.fullname || '',
          experience: stringToSkills(res.data.experience) || [],
          programmingLanguages: res.data.programmingLanguages || ''
        });
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    if (authUser?.email) {
      const userData = {
        fullname: form.fullname,
        experience: skillsToString(form.experience),
        programmingLanguages: form.programmingLanguages
      };

      const result = await update_user(authUser.email,userData.fullname, userData.experience);

      if (result.success) {
        toast.success("Profile updated successfully");
        setEditMode(false);
      } else {
        toast.error("Failed to update profile");
        console.error('Failed to update user:', result.error);
      }
    }
    setSaving(false);
  };

  if (loading){
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated/Gradient Backgrounds */}
      <div className="absolute inset-0 -z-10 select-none pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"
          style={{ animationDelay: '4s', transform: 'translate(-50%,-50%)' }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* User Details Card */}
      <div className="relative z-[1] max-w-xl w-full mx-auto bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            User Details
          </h2>
          {!editMode ? (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium shadow hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium shadow hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block font-semibold mb-1 text-slate-200">Full Name</label>
            <input
              type="text"
              name="fullname"
              className="w-full border border-slate-700 rounded-lg px-3 py-2 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
              value={form.fullname}
              onChange={handleChange}
              disabled={!editMode}
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-200">Programming Languages</label>
            <input
              type="text"
              name="programmingLanguages"
              className="w-full border border-slate-700 rounded-lg px-3 py-2 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
              value={form.programmingLanguages}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="e.g. JavaScript, Python, C++"
              autoComplete="off"
            />
          </div>

          {/* Skills Section */}
          <div>
            <label className="block font-semibold mb-3 text-slate-200">Skills & Experience</label>

            {/* Display existing skills */}
            <div className="space-y-2 mb-4">
              {form.experience.map((skill, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
                  <div className="flex-1">
                    <span className="text-slate-100 font-medium">{skill.domain}</span>
                    <span className="text-slate-400 ml-2">({skill.level})</span>
                  </div>
                  {editMode && (
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-red-400 hover:text-red-300 ml-2 px-2 py-1 rounded"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              {form.experience.length === 0 && (
                <div className="text-slate-400 text-sm italic">No skills added yet</div>
              )}
            </div>

            {/* Add new skill form - only show in edit mode */}
            {editMode && (
              <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 space-y-3">
                <h4 className="text-slate-200 font-medium">Add New Skill</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Domain/Technology</label>
                    <input
                      type="text"
                      name="domain"
                      placeholder="e.g. JavaScript, Machine Learning, etc."
                      className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition text-sm"
                      value={newSkill.domain}
                      onChange={handleNewSkillChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Experience Level</label>
                    <select
                      name="level"
                      className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition text-sm"
                      value={newSkill.level}
                      onChange={handleNewSkillChange}
                    >
                      <option value="">Select level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addSkill}
                  disabled={!newSkill.domain.trim() || !newSkill.level}
                  className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium shadow hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Skill
                </button>
              </div>
            )}
          </div>

          {/* Save button - only show in edit mode */}
          {editMode && (
            <button
              type="submit"
              disabled={saving}
              className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium shadow hover:from-emerald-500 hover:to-green-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}