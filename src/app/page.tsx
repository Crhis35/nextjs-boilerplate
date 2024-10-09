import { redirect } from 'next/navigation';
import { defaultLocale } from '@/libs/navigation';

export const dynamic = 'force-dynamic';

export default function RootPage() {
  redirect(defaultLocale);
}
