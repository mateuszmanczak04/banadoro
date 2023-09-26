'use client';

import { AccountSettingsContextProvider } from '@/context/AccountSettingsContext';
import { LocalSettingsContextProvider } from '@/context/LocalSettingsContext';
import { TasksContextProvider } from '@/context/TasksContext';
import { TimerContextProvider } from '@/context/TimerContext';
import { TimerSettingsContextProvider } from '@/context/TimerSettingsContext';
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <LocalSettingsContextProvider>
        <AccountSettingsContextProvider>
          <TimerSettingsContextProvider>
            <TasksContextProvider>
              <TimerContextProvider>
                <>{children}</>
              </TimerContextProvider>
            </TasksContextProvider>
          </TimerSettingsContextProvider>
        </AccountSettingsContextProvider>
      </LocalSettingsContextProvider>
    </SessionProvider>
  );
};

export default AppProviders;
