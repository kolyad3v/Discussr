import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'

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
import { useEffect, useState } from 'react'

import framesxTheme from './welcome/Theme'
import TwoSidedLayout from './welcome/TwoSidedLayout'

export default function Welcome({ auth }: PageProps<{ laravelVersion: string; phpVersion: string }>) {
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
						sx={{ fontStyle: 'italic' }}
						fontSize='lg'
						fontWeight='lg'>
						discuss: verb
					</Typography>
					<Typography color='secondary'>dis·​cuss | \ di-ˈskəs \</Typography>
					<Typography
						level='h1'
						fontWeight='xl'
						fontSize='clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)'>
						To investigate by reasoning or argument.
					</Typography>
					<Typography
						fontSize='lg'
						textColor='text.secondary'
						lineHeight='lg'>
						Facilitating Complex Conversations.
					</Typography>
					{auth.user ? (
						<>
							<Typography sx={{ fontWeight: 'bold' }}>Welcome back, {auth.user.name}</Typography>
							<Link
								href={route('dashboard')}
								className=''>
								<Button
									variant='soft'
									size='lg'
									sx={{ transition: 'all 0.2s ease-in-out' }}>
									Dashboard{' '}
									<ArrowForward
										fontSize='md'
										sx={{ mt: '-3px', ml: '2px' }}
									/>
								</Button>
							</Link>
						</>
					) : (
						<>
							<Link href={route('register')}>
								<Button
									size='lg'
									variant='soft'
									sx={{ transition: 'all 0.2s ease-in-out' }}
									endDecorator={
										<ArrowForward
											fontSize='xl'
											sx={{
												mt: '-3px',
											}}
										/>
									}>
									Get Started
								</Button>
							</Link>
							<Typography>
								Already a member?{' '}
								<Link
									href={route('login')}
									style={{ transition: 'color 0.2s ease-in-out' }}>
									Sign in
								</Link>
							</Typography>
						</>
					)}
				</TwoSidedLayout>
			</Box>
		</CssVarsProvider>
	)
}
