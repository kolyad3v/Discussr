import { Html } from '@react-three/drei'
import { FC } from 'react'

import MessageDisplayBox from './MessageDisplayBox'
import { PassageType } from '@/types/interfaces.js'

type MessageProps = {
	handlePassageClick: (passageId: number) => void
	position: [number, number, 0]
	message: string | null
	createdAt: string
	passages: PassageType[]
	messageId: number
	conversationId: number
	user: string
}
const Message: FC<MessageProps> = ({ position, message, createdAt, passages, messageId, conversationId, handlePassageClick, user }) => {
	const dateForHumans = new Date(createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })

	return (
		<>
			<mesh position={position}>
				<Html
					transform
					position={[-4, 0, 0]}>
					<MessageDisplayBox
						user={user}
						handlePassageClick={handlePassageClick}
						conversationId={conversationId}
						passages={passages}
						createdAt={dateForHumans}
						messageId={messageId}>
						{message}
					</MessageDisplayBox>
				</Html>
			</mesh>
		</>
	)
}

export default Message
