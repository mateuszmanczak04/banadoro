'use client';

import useAccountSettingsContext from '@/hooks/useAccountSettingsContext';
import useOnlineStatusContext from '@/hooks/useOnlineStatusContext';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Button } from '../(common)/Button';
import Input from '../(common)/Input';
import Loading from '../loading';

const PasswordHint = () => {
	// state
	const { passwordHint: initialPasswordHint, setPasswordHint } =
		useAccountSettingsContext();
	const [newHint, setNewHint] = useState(initialPasswordHint);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isDone, setIsDone] = useState(false);
	const { online } = useOnlineStatusContext();

	// send PUT request to update user's password hint
	const handleSubmit = async (e: FormEvent) => {
		if (!online) {
			// cancel this request if user is offline
			return;
		}
		e.preventDefault();
		setIsLoading(true);
		setError('');
		setIsDone(false);
		try {
			await axios.put('/api/auth/password-hint', { hint: newHint });
			setPasswordHint(newHint);
			setIsDone(true);
		} catch (error: any) {
			if (error.response) {
				setError(error.response.data.message);
			} else {
				setError('An unknown error occurred.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='w-full flex flex-col gap-2 bg-gray-800 p-4 rounded-md'>
			<label
				htmlFor='password-hint'
				className='cursor-pointer flex items-center gap-2'>
				Password Hint
			</label>
			<div className='flex flex-col xs:flex-row gap-2'>
				<Input
					type='text'
					id='password-hint'
					className='self-stretch'
					value={newHint}
					onChange={e => setNewHint(e.target.value)}
				/>
				<Button
					variant='primary'
					type='submit'
					className='self-stretch'
					disabled={isLoading || newHint === initialPasswordHint}>
					Update
				</Button>
			</div>
			<small className='opacity-75'>
				Leaving it empty will disable this option.
			</small>
			{isLoading && <Loading />}
			{error && <p className='error'>{error}</p>}
			{isDone && <p className='opacity-75'>Password hint updated.</p>}
		</form>
	);
};

export default PasswordHint;
