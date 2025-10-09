'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      setMessage('Registration successful!');
      router.push('/login-register'); // chuyển về trang login
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formContainer signUp">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <div className="formIcon">
          <a><i className="fa-brands fa-square-facebook"></i></a>
          <a><i className="fa-brands fa-twitter"></i></a>
          <a><i className="fa-brands fa-google-plus-g"></i></a>
          <a><i className="fa-brands fa-linkedin"></i></a>
          <a><i className="fa-brands fa-github"></i></a>
        </div>
        <span>or use your email for registration</span>

        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          required
        />
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
        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
      </form>
    </div>
  );
}
