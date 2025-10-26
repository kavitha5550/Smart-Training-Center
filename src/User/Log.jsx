import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Log = () => {
  const [userdata, setUserdata] = useState({
    factid: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userdata, [name]: value });
  };

  const Login = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5002/login', userdata)
      .then((res) => {
        setMessage(res.data.message);
        setMessageType('success');

      
        setTimeout(() => {
          navigate('/sidenavbar');
        }, 3000);

        console.log("factid:", userdata.factid);
        console.log("password:", userdata.password);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setMessage(error.response.data.message);
          setMessageType('error');
        } else {
          setMessage('Login failed or server not found');
          setMessageType('error');
        }
      });
  };

  return (
    <div>
      <center>
        <form className="min-h-screen bg-blue-50 flex items-center justify-center p-4" onSubmit={Login}>
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Login</h2>

              <div className="mb-4">
                <label className="block text-md text-start font-pop text-gray-700 mb-1">Faculty Id</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your Id"
                  name="factid"
                  value={userdata.factid}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-6">
                <label className="block text-md text-start font-pop text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  name="password"
                  value={userdata.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition-colors"
              >
                Login
              </button>

              {message && (
                <p className={`mt-3 text-sm ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        </form>
      </center>
    </div>
  );
};

export default Log;
