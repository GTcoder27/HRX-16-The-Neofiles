import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase.jsx';

export default function ProfilePage() {
  const { authUser, getData, updateData } = useFirebase();
  const [form, setForm] = useState({
    firstName: '',
    surname: '',
    expertiseLevel: '',
    programmingLanguages: '',
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchUserDetails() {
      if (authUser?.uid) {
        const res = await getData('users', authUser.uid);
        if (res.success && res.data) {
          setForm({
            firstName: res.data.firstName || '',
            surname: res.data.surname || '',
            expertiseLevel: res.data.expertiseLevel || '',
            programmingLanguages: res.data.programmingLanguages || '',
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

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (authUser?.uid) {
      await updateData('users', authUser.uid, form);
      setEditMode(false);
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-center text-white">Loading...</div>;

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
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          User Details
        </h2>
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block font-semibold mb-1 text-slate-200">First Name</label>
            <input
              type="text"
              name="firstName"
              className="w-full border border-slate-700 rounded-lg px-3 py-2 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              value={form.firstName}
              onChange={handleChange}
              disabled={!editMode}
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-slate-200">Surname</label>
            <input
              type="text"
              name="surname"
              className="w-full border border-slate-700 rounded-lg px-3 py-2 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              value={form.surname}
              onChange={handleChange}
              disabled={!editMode}
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-slate-200">Expertise Level</label>
            <input
              type="text"
              name="expertiseLevel"
              className="w-full border border-slate-700 rounded-lg px-3 py-2 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              value={form.expertiseLevel}
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
              className="w-full border border-slate-700 rounded-lg px-3 py-2 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              value={form.programmingLanguages}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="e.g. JavaScript, Python, C++"
              autoComplete="off"
            />
          </div>
          <div className="flex gap-4 mt-8 justify-center">
            {editMode ? (
              <>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold shadow hover:from-blue-500 hover:to-green-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-slate-700 text-slate-200 rounded-lg font-semibold shadow hover:bg-slate-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  onClick={() => setEditMode(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold shadow hover:from-purple-600 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={(e) => {
                  e.preventDefault(); // prevent accidental form submit
                  setEditMode(true);
                }}
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
