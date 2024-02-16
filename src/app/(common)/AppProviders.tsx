'use client';

import { AccountSettingsContextProvider } from '@/context/AccountSettingsContext';
import { LocalSettingsContextProvider } from '@/context/LocalSettingsContext';
import { TasksContextProvider } from '@/context/TasksContext';
import { TimerContextProvider } from '@/context/TimerContext';
import { TimerSettingsContextProvider } from '@/context/TimerSettingsContext';
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';
import { OnlineStatusContextProvider } from '@/context/OnlineStatusContext';
import { StatsContextProvider } from '@/context/StatsContext';

interface AppProvidersProps {
	children: ReactNode;
}

const AppProviders: FC<AppProvidersProps> = ({ children }) => {
	return (
		<OnlineStatusContextProvider>
			<SessionProvider>
				<LocalSettingsContextProvider>
					<AccountSettingsContextProvider>
						<StatsContextProvider>
							<TimerSettingsContextProvider>
								<TasksContextProvider>
									<TimerContextProvider>
										<>{children}</>
									</TimerContextProvider>
								</TasksContextProvider>
							</TimerSettingsContextProvider>
						</StatsContextProvider>
					</AccountSettingsContextProvider>
				</LocalSettingsContextProvider>
			</SessionProvider>
		</OnlineStatusContextProvider>
	);
};

export default AppProviders;
