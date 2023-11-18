import { useRef, FormEventHandler } from 'react'
import InputError from '@/Components/InputError'
import { useForm } from '@inertiajs/react'
import { Transition } from '@headlessui/react'
import { Box, Button, Card, CardActions, CardOverflow, FormControl, FormLabel, Input, Stack, Typography } from '@mui/joy'

export default function UpdatePasswordForm({ className = '' }: { className?: string }) {
	const passwordInput = useRef<HTMLInputElement>()
	const currentPasswordInput = useRef<HTMLInputElement>()

	const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
		current_password: '',
		password: '',
		password_confirmation: '',
	})

	const updatePassword: FormEventHandler = (e) => {
		e.preventDefault()

		put(route('password.update'), {
			preserveScroll: true,
			onSuccess: () => reset(),
			onError: (errors) => {
				if (errors.password) {
					reset('password', 'password_confirmation')
					passwordInput.current?.focus()
				}

				if (errors.current_password) {
					reset('current_password')
					currentPasswordInput.current?.focus()
				}
			},
		})
	}

	return (
		<section className={className}>
			<header>
				<h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'></h2>

				<p className='mt-1 text-sm text-gray-600 dark:text-gray-400'></p>
			</header>

			<form
				onSubmit={updatePassword}
				className='mt-6 space-y-6'>
				<Card>
					<Box sx={{ mb: 1 }}>
						<Typography level='title-md'>Update Password</Typography>
						<Typography level='body-sm'>Ensure your account is using a long, random password to stay secure.</Typography>
						<Stack
							direction='row'
							spacing={3}
							sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}>
							<Stack
								spacing={1}
								sx={{ flexGrow: 1 }}>
								<FormLabel>Current Password</FormLabel>
								<FormControl
									sx={{
										display: {
											sm: 'flex-column',
											md: 'flex-row',
										},
										gap: 2,
									}}>
									<Input
										size='sm'
										type='password'
										value={data.current_password}
										onChange={(e) => setData('current_password', e.target.value)}
									/>

									<InputError
										className='mt-2'
										message={errors.current_password}
									/>
								</FormControl>
								<FormLabel>New Password</FormLabel>
								<FormControl
									sx={{
										display: {
											sm: 'flex-column',
											md: 'flex-row',
										},
										gap: 2,
									}}>
									<Input
										size='sm'
										placeholder='New Password'
										required
										id='password'
										type='password'
										value={data.password}
										onChange={(e) => setData('password', e.target.value)}
									/>

									<InputError
										className='mt-2'
										message={errors.password}
									/>
								</FormControl>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl
									sx={{
										display: {
											sm: 'flex-column',
											md: 'flex-row',
										},
										gap: 2,
									}}>
									<Input
										size='sm'
										placeholder='Confirm Password'
										required
										id='confirm_password'
										type='password'
										value={data.password_confirmation}
										onChange={(e) => setData('password_confirmation', e.target.value)}
									/>

									<InputError
										className='mt-2'
										message={errors.password_confirmation}
									/>
								</FormControl>
							</Stack>
						</Stack>
					</Box>
					<CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
						<CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
							<Button
								size='sm'
								variant='outlined'
								color='neutral'>
								Cancel
							</Button>
							<Button
								size='sm'
								color='primary'
								variant='soft'
								disabled={processing}
								onClick={updatePassword}>
								Save
							</Button>
						</CardActions>
					</CardOverflow>
				</Card>

				<div className='flex items-center gap-4'>
					<Transition
						show={recentlySuccessful}
						enter='transition ease-in-out'
						enterFrom='opacity-0'
						leave='transition ease-in-out'
						leaveTo='opacity-0'>
						<p className='text-sm text-gray-600 dark:text-gray-400'>Saved.</p>
					</Transition>
				</div>
			</form>
		</section>
	)
}
