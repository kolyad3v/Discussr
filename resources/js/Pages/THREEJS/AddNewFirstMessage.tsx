import { FC, useState } from 'react'
import { Button } from '@mui/joy'
import FadeModalDialog from '../../forms/Modal'
import { Edit } from '@mui/icons-material'
import FirstMessageEntryForm from './FirstMessageEntryForm'

interface AddNewConversationProps {
	activeConversationId: number
}
const AddNewConversation: FC<AddNewConversationProps> = ({ activeConversationId }) => {
	const [open, setOpen] = useState<boolean>(false)
	console.log(activeConversationId)

	return (
		<>
			<Button
				variant='soft'
				sx={{ width: '160px', transition: 'all 0.2s ease-in-out', height: '160px' }}
				onClick={() => setOpen(true)}>
				<Edit />
			</Button>

			<FadeModalDialog
				width={1080}
				height={640}
				open={open}
				setOpen={setOpen}>
				<FirstMessageEntryForm
					setOpen={setOpen}
					activeConversationId={activeConversationId}
				/>
			</FadeModalDialog>
		</>
	)
}

export default AddNewConversation
