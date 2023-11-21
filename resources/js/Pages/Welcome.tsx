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

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string; phpVersion: string }>) {
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
					{auth.user ? (
						<>
							<Typography>Welcome Back {auth.user.name}</Typography>
							<Link
								href={route('dashboard')}
								className='font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500'>
								Dashboard
							</Link>
						</>
					) : (
						<>
							<Button
								size='lg'
								endDecorator={<ArrowForward fontSize='xl' />}>
								<Link href={route('register')}>Get Started</Link>
							</Button>
							<Typography>
								Already a member? <Link href={route('login')}>Sign in</Link>
							</Typography>
						</>
					)}
				</TwoSidedLayout>
			</Box>
		</CssVarsProvider>
	)
}
