// 'use client';

// import { useSession } from 'next-auth/react';

import AuthButton from '@/components/AuthButton';

const DashBoard = () => {
  return (
    <div>
      <div>Dashboard Page</div>
      <AuthButton isSignIn={false}>Logout</AuthButton>
    </div>
  );
};

export default DashBoard;
