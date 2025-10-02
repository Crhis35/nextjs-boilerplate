import { AuthAppBar } from '@organisms';

export default function AuthLayout(props: React.PropsWithChildren) {
  return <AuthAppBar>{props.children}</AuthAppBar>;
}
