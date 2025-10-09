'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  // Lưu token và userId vào localStorage dưới key userData (dùng chung với CreatePost)
  const stored = { token: data.token, userId: data.userId };
  localStorage.setItem('token', JSON.stringify(stored));

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

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
      </form>
    </div>
  );
}
