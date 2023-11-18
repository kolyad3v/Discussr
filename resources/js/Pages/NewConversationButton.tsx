import { FC, useState } from 'react'
import { Button } from '@mui/joy'
import GenericModal from './GenericModal'
import { People } from '@mui/icons-material'
import NewConversationForm from './NewConversationForm'

const NewConversationButton: FC = () => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<>
			<Button
				variant='soft'
				sx={{ width: '100%', transition: 'all 0.2s ease-in-out' }}
				onClick={() => setOpen(true)}
				startDecorator={'New Conversation'}
				endDecorator={<People />}></Button>

			<GenericModal
				width={480}
				height={480}
				open={open}
				setOpen={setOpen}>
				<NewConversationForm />
			</GenericModal>
		</>
	)
}

export default NewConversationButton
