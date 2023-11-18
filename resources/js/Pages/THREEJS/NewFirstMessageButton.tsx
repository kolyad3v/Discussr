import { FC, useState } from 'react'
import { Button } from '@mui/joy'
import GenericModal from '../GenericModal'
import { Edit } from '@mui/icons-material'
import FirstMessageEntryForm from './FirstMessageForm'
import { Html } from '@react-three/drei'

interface NewFirstMessageButtonProps {
	activeConversationId: number
}
const NewFirstMessageButton: FC<NewFirstMessageButtonProps> = ({ activeConversationId }) => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<>
			<Html>
				<Button
					variant='soft'
					sx={{ width: '160px', transition: 'all 0.2s ease-in-out', height: '160px' }}
					onClick={() => setOpen(true)}>
					<Edit />
				</Button>

				<GenericModal
					width={1080}
					height={640}
					open={open}
					setOpen={setOpen}>
					<FirstMessageEntryForm
						setOpen={setOpen}
						activeConversationId={activeConversationId}
					/>
				</GenericModal>
			</Html>
		</>
	)
}

export default NewFirstMessageButton
