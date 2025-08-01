import { Link } from 'react-router-dom';
import Button from '../Button';
import { CloseIcon } from '../Icons';
import './login-signup.css';

function LoginScreen({ onToggleLogin }) {
  return (
    <div className="background-overlay">
      <div className="login-container">


        <form action="/login" method="POST">
          <label htmlFor="username">Username:</label>
          <input type="username" id="username" name="username" required />
          
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          
          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/signup"><span onClick={onToggleLogin}>Sign up here</span></Link>
        </p>

        <Button className="close-login-btn" onClick={onToggleLogin} text={<CloseIcon/>}/>
      </div>
    </div>
  );
}

export default LoginScreen;
