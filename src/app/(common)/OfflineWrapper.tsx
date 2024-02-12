'use client';

import useOnlineStatusContext from '@/hooks/useOnlineStatusContext';
import { FC } from 'react';

interface OfflineWrapperProps {
	children: React.ReactNode;
	className?: string;
	content?: string;
}

const OfflineWrapper: FC<OfflineWrapperProps> = ({
	children,
	className,
	content,
}) => {
	const { online } = useOnlineStatusContext();

	if (online) return <>{children}</>;

	return (
		<div className={className}>
			{content
				? content
				: 'You are offline. Reconnect to the internet to see the content.'}
		</div>
	);
};

export default OfflineWrapper;
