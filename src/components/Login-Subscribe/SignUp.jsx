import { useState } from 'react';
import { signUpAccount } from '../../../api/auth';
import './login-signup.css';
import { EyeIcon, EyeOffIcon } from '../Icons';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/`;

export const catAvatar = "https://res.cloudinary.com/dqdwmrgma/image/upload/v1755574100/white-cat-icon_a9qjn0.webp"
const avatarDefault = `${CLOUDINARY_BASE_URL}v1755574100/default_eyttrs.webp`;
const avatar1 = `${CLOUDINARY_BASE_URL}v1755574099/avatar1_iaxoqt.webp`;
const avatar2 = `${CLOUDINARY_BASE_URL}v1755574099/avatar2_ioytov.webp`;
const avatar3 = `${CLOUDINARY_BASE_URL}v1755574100/avatar3_jtvs5f.webp`;
const avatar4 = `${CLOUDINARY_BASE_URL}v1755574099/avatar4_zomuor.webp`;
const avatar5 = `${CLOUDINARY_BASE_URL}v1755574100/avatar5_bpqs1h.webp`;
const avatar6 = `${CLOUDINARY_BASE_URL}v1755574100/avatar6_n0orj5.webp`;
const avatar7 = `${CLOUDINARY_BASE_URL}v1755574100/avatar7_xubdaj.webp`;
const avatar8 = `${CLOUDINARY_BASE_URL}v1755574100/avatar8_ywczdr.webp`;

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatarDefault);
  const navigate = useNavigate();

  const avatars = [
    { key:"avatar-default", value: avatarDefault },
    { key:"avatar-1", value: avatar1 },
    { key:"avatar-2", value: avatar2 },
    { key:"avatar-3", value: avatar3 },
    { key:"avatar-4", value: avatar4 },
    { key:"avatar-5", value: avatar5 },
    { key:"avatar-6", value: avatar6 },
    { key:"avatar-7", value: avatar7 },
    { key:"avatar-8", value: avatar8 },
  ]

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    avatar: avatarDefault
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectAvatar = (value, e) => {    
    e.preventDefault();
    setSelectedAvatar(value);
    setFormData({
      ...formData,
      avatar: value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setSuccess('');

    try {
      const response = await signUpAccount(formData);
      
      setSuccess(response.data.message);
      
      // Set signup success flag for the success message
      localStorage.setItem("signupSuccess", "true");
      
      // Navigate to home page
      navigate('/');
      
      // Dispatch event to notify other components
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('authStateChange'));
      }, 100);
      
    } catch (err) {
      if (err.response?.data?.errors) {
        // Handle validation errors from express-validator
        setErrors(err.response.data.errors.map(error => error.msg));
      } else {
        setErrors([err.response?.data?.message || 'Signup failed. Please try again.']);
      }
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
        <form onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <div className="error-messages">
              {errors.map((error, index) => (
               <div key={`${error}-${index}`} className="error-message">{error}</div>
              ))}
            </div>
          )}

          {success && <div className="success-message">{success}</div>}

          <div className="signup-container-content">
            <div className='create-account-avatar no-select'>
              <h1>Choose avatar</h1>
              <div className='avatar-wrap'>
                {avatars.map((avatar)=> (
                  <Button key={avatar.key}
                          className={`avatar-btn ${selectedAvatar === avatar.value ? 'selected' : ''}`}
                          text={<img className={`avatar-imgs img-${avatar.key}`} src={avatar.value} alt={`avatar ${avatar.key}`}/>}
                          onClick={(e) => handleSelectAvatar(avatar.value, e)}
                          />
                ))}
              </div>
            </div>

          <div className='create-account-info'>
              <h1>Create Account</h1>

              <label htmlFor="username">Username:</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                value={formData.username}
                onChange={handleChange}
                required 
              />

              <label htmlFor="password">Password:</label>
              <span className='password-instruction'>(At least one number)</span>

              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Between 6~30 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="toggle-password-btn"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOffIcon className="eye-icon"/> : <EyeIcon className="eye-icon"/>}
                </button>
              </div>

              <label htmlFor="confirm-password">Confirm Password:</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="confirm-password"
                  name="confirmPassword"
                  placeholder="Between 6~30 characters"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(prev => !prev)}
                  className="toggle-password-btn"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <EyeOffIcon className="eye-icon"/> : <EyeIcon className="eye-icon"/>}
                </button>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
          </div>
        </form>
    </div>
  );
}

export default SignUp;