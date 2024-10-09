'use client';

import React from 'react';

import {
  EmailVerification,
  CodeVerification,
} from '@/libs/common/components/ui/templates';

export default function AccountRecovery() {
  const [email, setEmail] = React.useState('');

  return (
    <main>
      {email ? (
        <CodeVerification email={email} />
      ) : (
        <EmailVerification setEmail={setEmail} />
      )}
    </main>
  );
}
