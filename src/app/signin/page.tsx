import SignInForm from '@/app/signin/SignInForm';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import OfflineWrapper from '../(common)/OfflineWrapper';
import { getAuthSession } from '../api/auth/[...nextauth]/route';

const page = async () => {
	const session = await getAuthSession();

	if (session) {
		redirect('/');
	}

	return (
		<div className='bottom-menu container min-h-screen flex gap-4'>
			<OfflineWrapper
				className='flex-1 text-center'
				content='You are not able to sign in during being offline.'>
				<div className='flex-1 hidden p-8 lg:flex flex-col items-center justify-center text-center gap-8 max-w-md'>
					<Image
						src='/images/smile-svgrepo-com.svg'
						alt='smile icon'
						width={200}
						height={200}
					/>
					<h1 className='font-extrabold text-5xl leading-[90%]'>
						We are <span className='text-primary-400'>glad</span> to see you{' '}
						<span className='text-primary-400'>again!</span>
					</h1>
					<p className='leading-7'>
						Improve your focus and become better version of yourself{' '}
						<span className='text-primary-500'>EVERY DAY</span>.
					</p>
				</div>
				<SignInForm />
			</OfflineWrapper>
		</div>
	);
};

export default page;
