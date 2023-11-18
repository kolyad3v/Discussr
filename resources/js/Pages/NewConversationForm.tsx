import React, { FC, useEffect } from 'react'
import { Button, FormControl, FormLabel, Input, Stack } from '@mui/joy'
import { useForm } from '@inertiajs/react'
import axios from 'axios'

const NewConversationForm: FC<{ setOpen: any }> = ({ setOpen }) => {
	const { data, setData, processing, reset } = useForm({
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
		//@ts-ignore
		axios
			.post(route('api.conversations.store'), data)
			.then(() => {
				reset('label', 'username')
				alert('Conversation created successfully')
				setOpen(false)
			})
			.catch((err: any) => {
				if (err.response && err.response.status === 400) {
					alert('You cannot start a conversation with yourself.')
					setData('username', '')
				} else if (err.response && err.response.status === 404) {
					alert('Incorrect User Details')
				} else {
					alert('Failed to Add Conversation - Sorry! ')
					console.log(err)
				}
			})
	}
	return (
		<Stack sx={{ mt: 2 }}>
			<form onSubmit={submit}>
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
						Create New Conversation
					</Button>
				</Stack>
			</form>
		</Stack>
	)
}

export default NewConversationForm
