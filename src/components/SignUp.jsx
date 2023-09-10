import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_USER_API } = import.meta.env;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password || !nickname) {
      Swal.fire('資料錯誤', '請填寫正確的註冊資訊');
      return;
    }
    if (password !== passwordCheck) {
      Swal.fire('資料錯誤', '密碼與確認密碼不同');
      return;
    }
    const signUpData = {
      email,
      password,
      nickname,
    };
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${VITE_USER_API}/users/sign_up`,
        signUpData
      );
      Swal.fire('註冊成功', '即將前往登入頁').then(() => {
        setIsLoading(false);
        navigate('/');
      });
    } catch (error) {
      Swal.fire('註冊失敗', error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className="formControls" action="index.html">
        <h2 className="formControls_txt">註冊帳號</h2>
        <label className="formControls_label" htmlFor="email">
          Email
        </label>
        <input
          className="formControls_input"
          type="text"
          id="email"
          name="email"
          placeholder="請輸入 email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="formControls_label" htmlFor="name">
          您的暱稱
        </label>
        <input
          className="formControls_input"
          type="text"
          name="name"
          id="name"
          placeholder="請輸入您的暱稱"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <label className="formControls_label" htmlFor="pwd">
          密碼
        </label>
        <input
          className="formControls_input"
          type="password"
          name="pwd"
          id="pwd"
          placeholder="請輸入密碼"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="formControls_label" htmlFor="pwdCheck">
          再次輸入密碼
        </label>
        <input
          className="formControls_input"
          type="password"
          name="pwd"
          id="pwdCheck"
          placeholder="請再次輸入密碼"
          required
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <input
          className="formControls_btnSubmit"
          type="button"
          value="註冊帳號"
          disabled={isLoading}
          onClick={handleSignUp}
        />
        <NavLink to="/" className="formControls_btnLink">
          登入
        </NavLink>
      </form>
    </div>
  );
};

export default SignUp;