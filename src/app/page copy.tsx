import { redirect } from 'next/navigation';
import { defaultLocale } from '@/common/navigation';

export const dynamic = 'force-dynamic';

export default function RootPage() {
  redirect(defaultLocale);
}
