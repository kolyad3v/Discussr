import React, { FC, useEffect } from 'react'
import { Button, FormControl, FormLabel, Input, Stack } from '@mui/joy'
import { useForm } from '@inertiajs/react'
import axios from 'axios'

const NewConversationForm: FC = () => {
	const { data, setData, post, processing, errors, reset } = useForm({
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
			})
			.catch((err: any) => {
				console.error(err)
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
						<FormLabel>Conversation label</FormLabel>
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
						<FormLabel>Invite by Username</FormLabel>
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
