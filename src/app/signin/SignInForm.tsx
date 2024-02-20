'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FormEvent, useCallback, useState } from 'react';
import { Button } from '../(common)/Button';
import GoogleButton from '../(common)/GoogleButton';
import Loading from '../(common)/Loading';
import Input from '../(common)/Input';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import debounce from 'lodash.debounce';
import useStatsContext from '@/hooks/useStatsContext';

const SignInForm = () => {
	const { fetchAllUserDays } = useStatsContext();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const [passwordHint, setPasswordHint] = useState('');

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!email || !password) return;

		setLoading(true);
		setError('');

		try {
			const result = await signIn('credentials', {
				email: email.trim(),
				password,
				callbackUrl: '/',
				redirect: false,
			});

			if (result!.error) {
				setError(result!.error);
				setLoading(false);
				return;
			}

			await fetchAllUserDays();
			router.push('/');
		} catch (err: any) {
			setError(err.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	const getPasswordHint = async (email: string) => {
		if (email.trim() === '') return;
		setPasswordHint('');
		try {
			const res = await axios.get('/api/auth/password-hint?email=' + email);
			if (!res.data.hint) return;
			setPasswordHint(res.data.hint);
		} catch {}
	};

	// how can i rename a function below?
	const getPasswordHintDebounced = debounce((email: string) => {
		getPasswordHint(email);
	}, 300);

	const debounceGetPasswordHint = useCallback((email: string) => {
		getPasswordHintDebounced(email);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<form
			className='flex flex-col gap-4 w-full my-auto mx-auto max-w-md items-center rounded-lg'
			onSubmit={handleSubmit}>
			<h1 className='text-3xl font-bold'>Sign In</h1>
			<label className='w-full flex flex-col gap-1'>
				<p>E-mail</p>
				<Input
					placeholder='example@abc.com'
					type='email'
					value={email}
					onChange={e => {
						setEmail(e.target.value);
						debounceGetPasswordHint(e.target.value);
					}}
				/>
			</label>
			<div className='w-full flex flex-col gap-1'>
				<div className='flex gap-2'>
					<label htmlFor='password'>Password</label>{' '}
					<Link
						href='/forgot-password'
						className='cursor-pointer text-gray-400 hover:text-gray-300 transition'>
						<p>Forgot?</p>
					</Link>
				</div>
				{passwordHint && (
					<p>
						Your hint: <span className='text-gray-400'>{passwordHint}</span>
					</p>
				)}
				<div className='w-full flex items-center gap-2 mt-1'>
					<Input
						id='password'
						placeholder='SomePassword123#'
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
			</div>
			<div className='w-full flex flex-col xs:flex-row gap-2 mt-4'>
				<Button
					variant='primary'
					className='w-full'
					disabled={!email || !password}
					type='submit'>
					Sign In
				</Button>
				<GoogleButton text='Sign In With Google' />
			</div>
			<Link
				href='/signup'
				className='cursor-pointer text-gray-400 hover:text-gray-300 transition mx-auto text-center'>
				<p>{"Don't have an account yet? Sign up here"}</p>
			</Link>
			{error && <p className='error'>{error}</p>}
			{loading && <Loading />}
		</form>
	);
};

export default SignInForm;
