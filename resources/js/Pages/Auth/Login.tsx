import { useEffect, FormEventHandler, useState } from 'react'

import Checkbox from '@/Components/Checkbox'
import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Head, Link, useForm } from '@inertiajs/react'

import { CssVarsProvider, useColorScheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import CssBaseline from '@mui/joy/CssBaseline'
import IconButton from '@mui/joy/IconButton'
// Icons import
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react'
import Button from '@mui/joy/Button'

import Typography from '@mui/joy/Typography'
import ArrowForward from '@mui/icons-material/ArrowForward'

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
	function ColorSchemeToggle() {
		const { mode, setMode } = useColorScheme()
		const [mounted, setMounted] = useState(false)
		useEffect(() => {
			setMounted(true)
		}, [])
		if (!mounted) {
			return null
		}
		return (
			<IconButton
				id='toggle-mode'
				size='lg'
				variant='soft'
				color='neutral'
				onClick={() => {
					if (mode === 'light') {
						setMode('dark')
					} else {
						setMode('light')
					}
				}}
				sx={{
					position: 'fixed',
					zIndex: 999,
					top: '1rem',
					right: '1rem',
					borderRadius: '50%',
					boxShadow: 'sm',
				}}>
				{mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
			</IconButton>
		)
	}
	const { data, setData, post, processing, errors, reset } = useForm({
		email: '',
		password: '',
		remember: false,
	})

	useEffect(() => {
		return () => {
			reset('password')
		}
	}, [])

	const submit: FormEventHandler = (e) => {
		e.preventDefault()

		post(route('login'))
	}

	return (
		<CssVarsProvider
			disableTransitionOnChange
			theme={framesxTheme}>
			<CssBaseline />
			<ColorSchemeToggle />
			<Box
				sx={{
					height: '100vh',
					overflowY: 'scroll',
					scrollSnapType: 'y mandatory',
					'& > div': {
						scrollSnapAlign: 'start',
					},
				}}>
				<TwoSidedLayout>
					<Typography
						color='primary'
						fontSize='lg'
						fontWeight='lg'>
						The power to do more
					</Typography>
					<Typography
						level='h1'
						fontWeight='xl'
						fontSize='clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)'>
						A large headlinerer about our product features & services
					</Typography>
					<Typography
						fontSize='lg'
						textColor='text.secondary'
						lineHeight='lg'>
						A descriptive secondary text placeholder. Use it to explain your business offer better.
					</Typography>
					<Button
						size='lg'
						endDecorator={<ArrowForward fontSize='xl' />}>
						Get Started
					</Button>
					<Typography>
						Already a member? <Link fontWeight='lg'>Sign in</Link>
					</Typography>

					<Typography
						level='body-xs'
						sx={{
							position: 'absolute',
							top: '2rem',
							left: '50%',
							transform: 'translateX(-50%)',
						}}>
						HeroLeft01
					</Typography>
				</TwoSidedLayout>{' '}
				<GuestLayout>
					<Head title='Log in' />

					{status && <div className='mb-4 font-medium text-sm text-green-600'>{status}</div>}

					<form onSubmit={submit}>
						<div>
							<InputLabel
								htmlFor='email'
								value='Email'
							/>

							<TextInput
								id='email'
								type='email'
								name='email'
								value={data.email}
								className='mt-1 block w-full'
								autoComplete='username'
								isFocused={true}
								onChange={(e) => setData('email', e.target.value)}
							/>

							<InputError
								message={errors.email}
								className='mt-2'
							/>
						</div>

						<div className='mt-4'>
							<InputLabel
								htmlFor='password'
								value='Password'
							/>

							<TextInput
								id='password'
								type='password'
								name='password'
								value={data.password}
								className='mt-1 block w-full'
								autoComplete='current-password'
								onChange={(e) => setData('password', e.target.value)}
							/>

							<InputError
								message={errors.password}
								className='mt-2'
							/>
						</div>

						<div className='block mt-4'>
							<label className='flex items-center'>
								<Checkbox
									name='remember'
									checked={data.remember}
									onChange={(e) => setData('remember', e.target.checked)}
								/>
								<span className='ms-2 text-sm text-gray-600 dark:text-gray-400'>Remember me</span>
							</label>
						</div>

						<div className='flex items-center justify-end mt-4'>
							{canResetPassword && (
								<Link
									href={route('password.request')}
									className='underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800'>
									Forgot your password?
								</Link>
							)}

							<PrimaryButton
								className='ms-4'
								disabled={processing}>
								Log in
							</PrimaryButton>
						</div>
					</form>
				</GuestLayout>
			</Box>
		</CssVarsProvider>
	)
}
