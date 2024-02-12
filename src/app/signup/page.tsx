import SignUpForm from '@/app/signup/SignUpForm';
import { getAuthSession } from '@/lib/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import OfflineWrapper from '../(common)/OfflineWrapper';

const page = async () => {
	const session = await getAuthSession();

	if (session) {
		redirect('/');
	}

	return (
		<div className='bottom-menu container min-h-screen flex gap-4'>
			<OfflineWrapper
				className='flex-1 text-center'
				content='You are not able to create an account during being offline.'>
				<div className='flex-1 hidden p-8 lg:flex flex-col items-center justify-center text-center gap-8 max-w-md'>
					<Image
						src='/images/goal-success-svgrepo-com.svg'
						alt='smile icon'
						width={200}
						height={200}
					/>
					<h1 className='font-extrabold text-5xl leading-[90%]' id='lol'>
						Reach your <span className='text-primary-400'>goals</span> with us!
					</h1>
					<p className='leading-7'>
						Improve your focus and become better version of yourself{' '}
						<span className='text-primary-500'>EVERY DAY</span>.
					</p>
				</div>
				<SignUpForm />
			</OfflineWrapper>
		</div>
	);
};

export default page;
