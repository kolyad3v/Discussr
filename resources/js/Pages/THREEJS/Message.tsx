import { Html } from '@react-three/drei'
import { useState, createRef, FC } from 'react'
//@ts-ignore
import { PassageNodes, Node } from './PassageNodes.jsx'
//@ts-ignore
import MessageDisplayBox from './MessageDisplayBox'
import { PassageType } from '@/types/interfaces.js'

type MessageProps = {
	position: [number, number, 0]
	message: string | null
	createdAt: string
	passages: PassageType[]
	messageId: number
	conversationId: number
}
const Message: FC<MessageProps> = ({ position, message, createdAt, passages, messageId, conversationId }) => {
	const dateForHumans = new Date(createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })

	return (
		<>
			<mesh position={position}>
				<Html
					transform
					position={[-4, 0, 0]}>
					<MessageDisplayBox
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
