import LoginButton from '@/components/AuthButton';

export default function Landing() {
  return (
    <div>
      This is my landing page and I am writing shit here.
      <div>
        <LoginButton isSignIn={true}>Login</LoginButton>
      </div>
    </div>
  );
}
