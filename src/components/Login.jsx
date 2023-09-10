import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_USER_API } = import.meta.env;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!email || !password) {
      Swal.fire('資料錯誤', '請填寫正確的登入資訊');
      return;
    }

    const loginData = {
      email: email,
      password: password,
    };
    setIsLoading(true);
    try {
      const res = await axios.post(`${VITE_USER_API}/users/sign_in`, loginData);
      const { data } = await res;
      document.cookie = `token=${data.token}; SameSite=None; Secure`;
      Swal.fire({
        title: '登入成功',
        showConfirmButton: false,
        timer: 500
      })
        setIsLoading(false);
        navigate('/todo');
    } catch (error) {
      Swal.fire('登入失敗', error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className="formControls" action="index.html">
        <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
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
        <span>此欄位不可留空</span>
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
        <input
          className="formControls_btnSubmit"
          type="button"
          value="登入"
          disabled={isLoading}
          onClick={handleLogin}
        />
        <NavLink to="/sign_up" className="formControls_btnLink">
          註冊帳號
        </NavLink>
      </form>
    </div>
  );
};

export default Login;