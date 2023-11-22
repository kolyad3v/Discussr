import React, { FC, useEffect } from 'react'
import { Button, FormControl, FormLabel, Input, Stack } from '@mui/joy'
import { useForm } from '@inertiajs/react'
import { toast } from 'react-toastify'

const NewConversationForm: FC<{ setOpen: any }> = ({ setOpen }) => {
	const { data, setData, processing, post, reset } = useForm({
		label: '',
		username: '',
	})
	useEffect(() => {
		return () => {
			reset('label', 'username')
		}
	}, [])

	const submit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		post(route('api.conversations.store'), {
			onSuccess: () => {
				reset('label', 'username')
				toast.success('Conversation created successfully!')
				setOpen(false)
			},
			onError: (err) => {
				if (typeof err.response === 'object' && (err.response as any).status === 400) {
					toast.warning('Cannot chat with yourself!')
					setData('username', '')
				} else if (typeof err.response === 'object' && (err.response as any).status === 404) {
					toast.warning('User not found!')
				} else {
					toast.error('Something went wrong! Please try again later...')
					console.log(err)
				}
			},
		})
	}

	return (
		<form onSubmit={submit}>
			<Stack sx={{ mt: 2 }}>
				<Stack
					direction='column'
					alignItems='stretch'
					spacing={3}>
					<FormControl required>
						<FormLabel sx={{ fontWeight: 'bold' }}>Conversation Label</FormLabel>
						<Input
							variant='soft'
							color='primary'
							type='text'
							name='label'
							value={data.label}
							onChange={(e) => setData('label', e.target.value)}
						/>
					</FormControl>
					<FormControl required>
						<FormLabel sx={{ fontWeight: 'bold' }}>Invite by Username</FormLabel>
						<Input
							variant='soft'
							color='primary'
							type='text'
							name='username'
							value={data.username}
							onChange={(e) => setData('username', e.target.value)}
						/>
					</FormControl>
					<Button
						type='submit'
						variant='outlined'
						color='primary'
						disabled={processing}
						sx={{
							justifySelf: 'end',
							transition: 'all 0.2s ease-in-out',
						}}>
						{processing ? 'Creating...' : 'Create New Conversation'}
					</Button>
				</Stack>
			</Stack>
		</form>
	)
}

export default NewConversationForm
