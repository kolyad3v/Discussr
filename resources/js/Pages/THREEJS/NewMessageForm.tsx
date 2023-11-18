import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Textarea from '@mui/joy/Textarea'
import IconButton from '@mui/joy/IconButton'
import FormatBold from '@mui/icons-material/FormatBold'
import FormatItalic from '@mui/icons-material/FormatItalic'

import { useState, useCallback } from 'react'
import { useForm } from '@inertiajs/react'

const NewMessageForm = ({ activeConversationId, setOpen, messageId }: { activeConversationId: number; setOpen: any; messageId: number }) => {
	console.log('new message id', messageId)
	const [italic, setItalic] = useState(false)
	const [bold, setBold] = useState(false)

	const form = useForm({
		message: '',
		messageId,
	})

	const submitMessage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		form.post(route('api.conversations.messages.store', { conversation: activeConversationId }), {
			onSuccess: () => {
				setOpen(false)
				alert('Message submitted successfully')
				form.reset('message')
			},
			onError: () => {
				alert('Message submission failed')
			},
		})
	}

	return (
		<form
			onSubmit={submitMessage}
			style={{ height: '100%' }}>
			<FormControl
				sx={{
					width: 'auto',
					height: '100%',
				}}>
				<FormLabel>Your Message</FormLabel>
				<Textarea
					placeholder='Type something here…'
					minRows={10}
					value={form.data.message}
					onChange={(e) => form.setData('message', e.target.value)}
					endDecorator={
						// @ts-ignore
						<Box
							// @ts-ignore
							sx={{
								display: 'flex',
								gap: 'var(--Textarea-paddingBlock)',
								pt: 'var(--Textarea-paddingBlock)',
								borderTop: '1px solid',
								borderColor: 'divider',
								flex: 'auto',
							}}>
							<IconButton
								variant={bold ? 'soft' : 'plain'}
								color={bold ? 'primary' : 'neutral'}
								aria-pressed={bold}
								onClick={() => setBold((bool) => !bool)}>
								<FormatBold />
							</IconButton>

							<IconButton
								variant={italic ? 'soft' : 'plain'}
								color={italic ? 'primary' : 'neutral'}
								aria-pressed={italic}
								onClick={() => setItalic((bool) => !bool)}>
								<FormatItalic />
							</IconButton>
							<Button
								type='submit'
								variant='soft'
								color='primary'
								disabled={form.processing}
								sx={{ ml: 'auto', transition: 'all 0.2s ease-in-out' }}>
								{form.processing ? 'Submitting...' : 'Submit'}
							</Button>
						</Box>
					}
					sx={{
						minWidth: 300,
						fontWeight: bold ? 'bold' : 'normal',
						fontStyle: italic ? 'italic' : 'initial',
						height: '100%',
						p: 2,
					}}
				/>
			</FormControl>
		</form>
	)
}

export default NewMessageForm
