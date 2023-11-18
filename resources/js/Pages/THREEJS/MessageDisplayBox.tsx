import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import IconButton from '@mui/joy/IconButton'
import Typography from '@mui/joy/Typography'
import { Share } from '@mui/icons-material'
import { FC, useCallback, useMemo, useState } from 'react'
import { PassageType } from '@/types'

import GenericModal from '../GenericModal'
import MessageEntryBox from './NewMessageForm'

type MessageDisplayBoxProps = {
	children: React.ReactNode
	createdAt: string
	passages: PassageType[]
	conversationId: number
	messageId: number
}

const MessageDisplayBox: FC<MessageDisplayBoxProps> = ({ children, createdAt, passages, conversationId, messageId }) => {
	const getTitleSnippetFromChildren = useCallback(() => {
		if (children && typeof children === 'string') {
			const match = children.match(/^(\S+\s){0,4}\S+/)
			return match ? `${match[0]}...` : `${children}...`
		}
	}, [children])

	console.log('message passages!', passages)
	const titleSnippet = getTitleSnippetFromChildren()

	const highlightedText = useMemo(() => {
		if (typeof children !== 'string') {
			return children
		}

		let lastIndex = 0
		const sortedPassages = [...passages].sort((a, b) => a.start - b.start)
		const segments = sortedPassages.flatMap((passage, index) => {
			const startSegment = children.slice(lastIndex, passage.start)
			const highlightedSegment = children.slice(passage.start, passage.start + passage.length)
			lastIndex = passage.start + passage.length
			return [
				startSegment,
				<Typography
					level='body-md'
					variant='soft'
					color='success'>
					{highlightedSegment}
				</Typography>,
			]
		})

		segments.push(children.slice(lastIndex))

		return segments
	}, [children, passages])

	const [open, setOpen] = useState<boolean>(false)

	return (
		<>
			<Card
				color='primary'
				variant='soft'
				sx={{ width: 640 }}>
				<div>
					<Typography level='title-lg'>{titleSnippet}</Typography>
					<Typography level='body-sm'>{createdAt}</Typography>
					<IconButton
						aria-label='share'
						variant='soft'
						color='primary'
						size='sm'
						sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem', transition: 'all 0.2s ease-in-out' }}>
						<Share />
					</IconButton>
					<IconButton
						aria-label='share'
						variant='soft'
						color='primary'
						size='sm'
						sx={{ position: 'absolute', top: '0.875rem', right: '3rem', transition: 'all 0.2s ease-in-out' }}
						onClick={() => setOpen(true)}>
						+
					</IconButton>
				</div>

				<CardContent orientation='horizontal'>
					<Typography level='body-md'>{highlightedText}</Typography>
				</CardContent>
			</Card>
			<GenericModal
				width={640}
				height={640}
				open={open}
				setOpen={setOpen}>
				<MessageEntryBox
					conversationId={conversationId}
					messageId={messageId}
				/>
			</GenericModal>
		</>
	)
}
export default MessageDisplayBox
