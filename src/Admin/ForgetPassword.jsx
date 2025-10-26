import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ForgetPassword = () => {
  const [msg, setMsg] = useState('');
  const [userdata, setUserData] = useState('');

  const loc = useLocation(); 
  const identifier = loc.state?.FEdata;

  const resetpassword = (e) => {
    setUserData(e.target.value);
  };

  const reset = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5002/reset', {
        query: identifier,
        newPassword: userdata
      })
      .then((res) => {
        setMsg('✅ Password Updated Successfully!');
      })
      .catch((err) => {
        console.log(err);
        setMsg('❌ Something went wrong!');
      });
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center p-2'
      style={{ backgroundColor: 'var(--main-bg)', color: 'var(--main-text)' }}
    >
      <div
        className='flex flex-col gap-4 px-10 py-10 rounded-md w-full max-w-md'
        style={{
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-fg)',
          border: '1px solid var(--sidebar-bg)',
        }}
      >
        <p
          className='text-lg font-pop font-bold mb-2'
          style={{ color: 'var(--navbar-text)' }}
        >
          Create New Password
        </p>

        {/* Password Input */}
        <input
          type="password"
          name='resetpass'
          value={userdata}
          onChange={resetpassword}
          className='border p-2 w-full outline-none rounded-md'
          style={{
            backgroundColor: 'var(--sidebar-bg)',
            color: 'var(--sidebar-text)',
            borderColor: 'var(--sidebar-text)',
          }}
          placeholder='Enter new password'
        />

        {/* Message */}
        {msg && (
          <p
            className='font-pop p-1 rounded'
            style={{
              color: msg.includes('✅') ? '#16a34a' : '#dc2626', // green/red
            }}
          >
            {msg}
          </p>
        )}

        {/* Update Button */}
        <div className='flex justify-end'>
          <button
            onClick={reset}
            className='px-4 py-2 rounded-md font-pop transition-colors duration-200'
            style={{
              backgroundColor: 'var(--sidebar-hover)',
              color: 'var(--hover-text)',
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = 'var(--hover-bg)')
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = 'var(--sidebar-hover)')
            }
          >
            UPDATE
          </button>
        </div>

        {/* Debug / Show passed identifier */}
        {identifier && (
          <p className='mt-2 text-sm' style={{ color: 'var(--main-text)' }}>
            {identifier}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;


