import { Outlet } from 'react-router-dom';
import workIcon from '../assets/left.png';
import logoLgImg from '../assets/logo_lg.png';

const Auth = () => {
  return (
    <>
      <div className="bg-yellow">
        <div className="container signUpPage vhContainer">
          <div className="side">
            <img className="logoImg" src={logoLgImg} alt="logo" />
            <img className="d-m-n" src={workIcon} alt="workImg" />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;