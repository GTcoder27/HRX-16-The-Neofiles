import React, { useState } from 'react';
import { useFirebase } from '../context/Firebase.jsx';
import { useNavigate } from 'react-router-dom';

const PerformCRUDPage = () => {
  const {
    authUser,
    logout,
    putData,
    getData,
    updateData,
    deleteData,
  } = useFirebase();

  const navigate = useNavigate();

  const [key, setKey] = useState('');
  const [data, setData] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const parseKey = (key) => {
    const parts = key.split('/');
    if (parts.length !== 2) throw new Error("Key must be in 'collection/docId' format");
    return { collection: parts[0], docId: parts[1] };
  };

  const handleCreate = async () => {
    try {
      const { collection, docId } = parseKey(key);
      const res = await putData(collection, docId, JSON.parse(data));
      if (res.success) {
        setResult(res.message);
        console.log(res.message);
      } else {
        throw new Error(res.error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRead = async () => {
    try {
      const { collection, docId } = parseKey(key);
      const res = await getData(collection, docId);
      if (res.success) {
        setResult(JSON.stringify(res.data, null, 2));
        console.log('Read successfully');
      } else {
        throw new Error(res.error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const { collection, docId } = parseKey(key);
      const res = await updateData(collection, docId, JSON.parse(data));
      if (res.success) {
        setResult(res.message);
        console.log(res.message);
      } else {
        throw new Error(res.error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const { collection, docId } = parseKey(key);
      const res = await deleteData(collection, docId);
      if (res.success) {
        setResult(res.message);
        console.log(res.message);
      } else {
        throw new Error(res.error);
      }
    } catch (err) {
      setError(err.message);
    }
  };


  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1a1a1a] text-white px-6">
      <h1 className="text-3xl font-bold mb-4">Firebase CRUD Operations</h1>

      {authUser && (
        <div className="mb-6 text-center">
          <h3>Hello, {authUser.email || authUser.displayName}</h3>
          <button
            onClick={handleLogout}
            className="mt-2 bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}

      <div className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Enter Database Key (e.g. users/user1)"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white"
        />

        <textarea
          placeholder='Enter JSON data (e.g. {"name":"John", "age":30})'
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full px-4 py-2 h-24 rounded bg-gray-800 text-white resize-none"
        />

        <div className="flex justify-between gap-2">
          <button onClick={handleCreate} className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
            Create
          </button>
          <button onClick={handleRead} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            Read
          </button>
          <button onClick={handleUpdate} className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600">
            Update
          </button>
          <button onClick={handleDelete} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
            Delete
          </button>
        </div>

        {result && (
          <div className="mt-4 p-3 bg-gray-700 rounded text-green-300">
            <strong>Result:</strong>
            <pre>{result}</pre>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-gray-700 rounded text-red-400">
            <strong>Error:</strong>
            <pre>{error}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformCRUDPage;
