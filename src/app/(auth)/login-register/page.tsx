'use client';
// import LoginRegister from './LoginRegister';
import dynamic from 'next/dynamic';
const LoginRegister = dynamic(() => import('./LoginRegister'), { ssr: false });
export default function Page() {
    return <LoginRegister />;
}
