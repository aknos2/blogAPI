import { useState } from 'react';
import './login-signup.css';
import { EyeIcon, EyeOffIcon } from '../Icons'; // Optional: use your own icons or emojis

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="signup-container">
      <h1>Create Account</h1>

      <form action="/signup" method="post">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Password:</label>
        <span className='password-instruction'>(At least one number and one uppercase letter)</span>

        <div className="password-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Between 6~30 characters"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="toggle-password-btn"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        <label htmlFor="confirm-password">Confirm Password:</label>
        <div className="password-input-wrapper">
          <input
            type={showConfirm ? 'text' : 'password'}
            id="confirm-password"
            name="confirmPassword"
            placeholder="Between 6~30 characters"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm(prev => !prev)}
            className="toggle-password-btn"
            aria-label="Toggle confirm password visibility"
          >
            {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
