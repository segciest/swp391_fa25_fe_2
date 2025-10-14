 'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveToken } from '@/utils/auth';

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [remember, setRemember] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Login failed');

<<<<<<< HEAD
  // Save token using remember flag (localStorage vs sessionStorage)
  saveToken(data.token, remember);
  const stored = { token: data.token, userId: data.userId };
  localStorage.setItem('userData', JSON.stringify(stored));
=======
      // Lưu token hoặc user vào localStorage
      localStorage.setItem('token', data.access_token);
      
>>>>>>> dde74fe5d0e256f83692a7c6435563b1c001f215

      setMessage('Login successful!');
      router.push('/'); // chuyển về trang chủ
      // window.location.reload();
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formContainer signIn">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>

        <div className="formIcon">
          <a><i className="fa-brands fa-square-facebook"></i></a>
          <a><i className="fa-brands fa-twitter"></i></a>
          <a><i className="fa-brands fa-google-plus-g"></i></a>
          <a><i className="fa-brands fa-linkedin"></i></a>
          <a><i className="fa-brands fa-github"></i></a>
        </div>

        <span>or use your email password</span>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label className="flex items-center gap-2 mt-3 text-sm">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          <span>Remember me</span>
        </label>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
      </form>
    </div>
  );
}
