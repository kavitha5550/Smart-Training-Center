import React, { useState } from 'react';
import { LockOpen } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Password = () => {
  const [userdata, setUserData] = useState('');
  const [updatedata, setUpdateData] = useState('');
  const navigate = useNavigate();

  const UpdateValue = (e) => {
    setUserData(e.target.value);
  };

  const checkUpdate = (e) => {
    axios
      .post('http://localhost:5002/checkupdate', { userdata })
      .then((res) => {
        if (res.data.data) {
          setUpdateData(res.data.data);
          navigate('/forgetpassword', { state: { FEdata: userdata } });
        } else {
          window.alert('Not Found');
        }
      })
      .catch((err) => {
        console.log('server error', err);
      });
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center p-2'
      style={{ backgroundColor: 'var(--main-bg)', color: 'var(--main-text)' }}
    >
      <div
        className='flex flex-col rounded-md text-center md:w-2/6 sm:w-full px-5 py-5 border'
        style={{
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-fg)',
          borderColor: 'var(--sidebar-bg)',
        }}
      >
        {/* Header */}
        <div className='flex items-center justify-center gap-3 px-5 py-5'>
          <label className='font-pop font-bold text-xl'>
            Find Your Account
          </label>
          <LockOpen size={18} />
        </div>

        {/* Input Label */}
        <span className='font-pop text-sm text-start p-1'>
          Enter Your FactId or EmailId
        </span>

        {/* Input Field */}
        <input
          type='text'
          placeholder='factId or EmailId'
          required
          value={userdata}
          onChange={UpdateValue}
          className='px-2 py-2 mt-1 w-full rounded outline-none transition-colors duration-200'
          style={{
            backgroundColor: 'var(--sidebar-bg)',
            color: 'var(--sidebar-text)',
            border: '1px solid var(--sidebar-text)',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--hover-bg)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--sidebar-text)')}
        />

        {/* Next Button */}
        <div className='flex justify-end px-2 py-2'>
          <button
            onClick={checkUpdate}
            className='flex items-center justify-end space-x-2 px-4 py-2 rounded font-pop transition-colors duration-200 cursor-pointer'
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
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Password;
