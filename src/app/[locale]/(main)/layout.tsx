import { AuthAppBar } from '@organisms';
import { SessionProvider } from 'next-auth/react';

export default function AuthLayout(props: React.PropsWithChildren) {
  return (
    <SessionProvider>
      <AuthAppBar>{props.children}</AuthAppBar>
    </SessionProvider>
  );
}
