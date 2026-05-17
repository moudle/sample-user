import axios from "axios";
import { useState } from "react";
import { CONFIG_UI_USER } from "../config-ui";

export function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function login() {
    try {
      setLoading(true);
      const res = await axios.post('/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = CONFIG_UI_USER.login_redirect_path;
    } catch (err: any) {
      alert(err?.response.data.toString());
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email" />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password" />
      </div>
      <div>
        <button onClick={login}>
          {loading ? 'Loading' : 'Login'}
        </button>
      </div>
    </div>
  );
}
