import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate()
  
  const backLoginPage = () => {
    navigate('/')
  };

  return (
    <>
      <div className="vhContainer center bg-yellow">
        <div>
          <img className="d-m-n" src="/img.png" alt="workImg" />
        </div>
        <div className="formControls">
        <h2>Not Found The Page</h2>
        <p style={{fontSize:'60px', textAlign: 'center', marginTop:'10px', marginBottom:'10px'}}>404</p>
          <input
            className="formControls_btnSubmit"
            type="button"
            value="返回登入頁"
            onClick={backLoginPage}
          />
        </div>
      </div>
    </>
  );
};

export default NotFound;