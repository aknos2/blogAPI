import { Link } from "react-router-dom";
import Header from "./Header/Header";

const ErrorPage = () => {
  return (
    <>
      <Header/>
      <div className="error-container">
        <h1>Oh no, this route doesn't exist!</h1>
        <Link to="/">
          <p>
            You can go back to the home page by clicking here! 
          </p>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;