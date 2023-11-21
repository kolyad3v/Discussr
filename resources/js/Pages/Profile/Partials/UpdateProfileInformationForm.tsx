import InputError from '@/Components/InputError'
import { Link, useForm, usePage } from '@inertiajs/react'
import { FormEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import { PageProps } from '@/types'
import { AspectRatio, Avatar, Box, Button, Card, CardActions, CardOverflow, FormControl, FormLabel, IconButton, Input, Stack, Typography } from '@mui/joy'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '', avatar = null }: { mustVerifyEmail: boolean; status?: string; className?: string; avatar?: any }) {
	const user = usePage<PageProps>().props.auth.user

	const { data, setData, patch, errors, processing } = useForm({
		name: user.name,
		email: user.email,
	})

	const [avatarUrl, setAvatarUrl] = useState<string>(avatar ? avatar.url : '')

	const submit: FormEventHandler = (e) => {
		e.preventDefault()

		patch(route('profile.update'))
	}
	const fileInputRef = useRef<HTMLInputElement>(null)

	const [savingImage, setSavingImage] = useState(false)

	const onImageSaved = (res: AxiosResponse) => {
		setAvatarUrl(res.data)
		toast.success('Profile image updated')
		setSavingImage(false)
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}
	const handleFileChange = useCallback(() => {
		const file = fileInputRef.current?.files?.[0]
		if (file) {
			let formData = new FormData()
			formData.append('avatar', file)
			const url = route('api.profile.avatar.store', user.id)
			setSavingImage(true)
			axios
				.post(url, formData)
				.then(onImageSaved)
				.catch((err) => {
					setSavingImage(false)
					toast.error('Error saving image')
				})
		}
	}, [])

	const handleProfileImageClick = () => {
		fileInputRef.current?.click()
	}

	return (
		<section className={className}>
			<header>
				<Typography
					level='h2'
					className='text-lg font-medium text-gray-900 dark:text-gray-100'>
					Profile Information
				</Typography>
			</header>

			<form
				onSubmit={submit}
				className='mt-6 space-y-6'>
				<Card>
					<Box
						// @ts-ignore
						sx={{ mb: 1 }}>
						<Typography level='title-md'>Personal info</Typography>
						<Typography level='body-sm'>Update your account's profile information and email address.</Typography>
						<Stack
							direction='row'
							spacing={3}
							sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}>
							<Stack
								direction='column'
								spacing={1}>
								<AspectRatio
									ratio='1'
									maxHeight={200}
									sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}>
									{avatar ? <Avatar src={avatarUrl} /> : <Avatar>{user.name[0]}</Avatar>}
								</AspectRatio>
								<IconButton
									aria-label='upload new picture'
									size='sm'
									variant='outlined'
									color='neutral'
									disabled={savingImage}
									sx={{
										bgcolor: 'background.body',
										position: 'absolute',
										zIndex: 2,
										borderRadius: '50%',
										left: 100,
										top: 170,
										boxShadow: 'sm',
										transition: '0.2s ease-in-out',
									}}
									onClick={handleProfileImageClick}>
									<EditRoundedIcon />
								</IconButton>
								<Input
									sx={{ display: 'none' }}
									type='file'
									onChange={handleFileChange}
									slotProps={{
										input: {
											ref: fileInputRef,
										},
									}}
								/>
							</Stack>
							<Stack
								spacing={1}
								sx={{ flexGrow: 1 }}>
								<FormLabel>Name</FormLabel>
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
										placeholder='Name'
										value={data.name}
										onChange={(e) => setData('name', e.target.value)}
										required
										autoComplete='name'
									/>

									<InputError
										className='mt-2'
										message={errors.name}
									/>
								</FormControl>
								<FormLabel>Email</FormLabel>
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
										placeholder='Email'
										required
										autoComplete='email'
										id='email'
										type='email'
										value={data.email}
										onChange={(e) => setData('email', e.target.value)}
									/>

									<InputError
										className='mt-2'
										message={errors.email}
									/>
								</FormControl>
							</Stack>
						</Stack>
					</Box>
					<CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
						<CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
							<Button
								sx={{ transition: '0.2s ease-in-out' }}
								size='sm'
								variant='outlined'
								color='neutral'>
								Cancel
							</Button>
							<Button
								sx={{ transition: '0.2s ease-in-out' }}
								size='sm'
								color='primary'
								variant='soft'
								disabled={processing}
								onClick={submit}>
								Save
							</Button>
						</CardActions>
					</CardOverflow>
				</Card>

				{mustVerifyEmail && user.email_verified_at === null && (
					<div>
						<p className='text-sm mt-2 text-gray-800 dark:text-gray-200'>
							Your email address is unverified.
							<Link
								href={route('verification.send')}
								method='post'
								as='button'
								className='underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800'>
								Click here to re-send the verification email.
							</Link>
						</p>

						{status === 'verification-link-sent' && <div className='mt-2 font-medium text-sm text-green-600 dark:text-green-400'>A new verification link has been sent to your email address.</div>}
					</div>
				)}
			</form>
		</section>
	)
}
