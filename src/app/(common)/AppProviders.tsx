'use client';

import { SettingsContextProvider } from '@/context/SettingsContext';
import { TasksContextProvider } from '@/context/TasksContext';
import { TimerContextProvider } from '@/context/TimerContext';
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <SettingsContextProvider>
        <TasksContextProvider>
          <TimerContextProvider>{children}</TimerContextProvider>
        </TasksContextProvider>
      </SettingsContextProvider>
    </SessionProvider>
  );
};

export default AppProviders;
