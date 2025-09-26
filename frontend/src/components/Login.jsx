import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error)
    }
  }

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-xl-5 col-lg-6 col-md-8'>
          <div className='card rounded-5'>
            <div className='card-body p-5'>
              <h1 className='card-title text-center mb-4 fw-bold'>Login</h1>
              <p className='text-center text-muted'>Enter your credentials to access your account</p>
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label fw-bolder'>Email Address</label>
                  <div className="input-group mb-3">
                    <input
                      type='email'
                      className='form-control'
                      value={username}
                      placeholder='name@example.com'
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label fw-bolder'>Password</label>
                  <div className="input-group mb-3">
                    <input
                      type='password'
                      className='form-control'
                      value={password}
                      placeholder='Enter your password'
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-auto form-check'>
                    <input type="checkbox" className='form-check-input' />
                    <label className="form-check-label text-muted" >Remember me</label>
                  </div>
                  <div className='col text-end'>
                    <Link to="" className='text-link'>Forgot Password?</Link>
                  </div>
                </div>
                <button type='submit' className='btn rounded-3'>Login</button>
              </form>
              <p className='mt-3 text-center text-muted'>Don't have an account? <Link to="" className='text-link'>Sign up for free</Link></p>
              {message && <p className='mt-3 text-center text-info'>{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login