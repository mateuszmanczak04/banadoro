'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Page = () => {
  const { data: session } = useSession();

  if (session) {
    return redirect('/account/authenticated');
  }
  return redirect('/account/register');
};

export default Page;
