import axios from "axios";
import { useState } from "react";
import { CONFIG_UI_USER } from "../config-ui";

export function RegisterPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function register() {
    try {
      setLoading(true);
      const res = await axios.post('/api/register', { email, password, name });
      localStorage.setItem('token', res.data.token);
      window.location.href = CONFIG_UI_USER.register_redirect_path;
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
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name" />
      </div>
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
        <button onClick={register}>
          {loading ? 'Loading' : 'Register'}
        </button>
      </div>
    </div>
  );
}
