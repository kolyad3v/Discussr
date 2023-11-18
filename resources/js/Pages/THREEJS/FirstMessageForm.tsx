import * as React from 'react'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Textarea from '@mui/joy/Textarea'
import IconButton from '@mui/joy/IconButton'
import FormatBold from '@mui/icons-material/FormatBold'
import FormatItalic from '@mui/icons-material/FormatItalic'

import { useState, useCallback } from 'react'
import axios from 'axios'

const FirstMessageForm = ({ activeConversationId, setOpen }: { activeConversationId: number; setOpen: any }) => {
	const [italic, setItalic] = useState(false)
	const [bold, setBold] = useState(false)
	const [netowrking, setNetowrking] = useState(false)
	const [message, setMessage] = useState<string>('')

	const submitMessage = useCallback((message: string): void => {
		setNetowrking(true)
		console.log(`submitting message with convo id ${activeConversationId}, message: ${message}`)
		axios
			.post(route('api.conversations.messages.store', { conversation: activeConversationId }), { message: message, messageId: null })
			.then((response) => {
				console.log(response.data)
				alert('Message submitted successfully')
				setMessage('')
				setOpen(false)
				setNetowrking(false)
			})
			.catch((error) => {
				console.error(error)
				alert('Message submission failed')
				setNetowrking(false)
			})
	}, [])

	return (
		<FormControl
			sx={{
				width: 'auto',
				height: '100%',
			}}>
			<FormLabel>Your Message</FormLabel>
			<Textarea
				placeholder='Type something here…'
				minRows={10}
				value={message}
				onChange={(e) => {
					setMessage(e.target.value)
				}}
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
							variant='soft'
							color='primary'
							disabled={netowrking}
							onClick={() => submitMessage(message)}
							sx={{ ml: 'auto', transition: 'all 0.2s ease-in-out' }}>
							{netowrking ? 'Submitting...' : 'Submit'}
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
	)
}

export default FirstMessageForm
