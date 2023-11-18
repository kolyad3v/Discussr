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
	const [[a1, a2, a3, b1, c1, d1]] = useState(() => [...Array(6)].map(createRef))
	const [nodes, setNodes] = useState<{ message: string; ref: any; color: string; position: number[]; connectedTo: any[]; isPassageNode: boolean }[]>([])

	const dateForHumans = new Date(createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })

	return (
		<>
			<mesh position={position}>
				<Html
					// To add back so that adding a new conversation is beautiful
					// style={{ filter: 'blur(10px)' }}
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
				{/* {nodes.length > 0 && (
					<PassageNodes>
						{nodes.map((node, index) => (
							<Node
								key={index}
								ref={node.ref}
								message={node.message}
								color={node.color}
								position={node.position}
								connectedTo={node.connectedTo}
								isPassageNode={node.isPassageNode}
							/>
						))}
					</PassageNodes>
				)} */}
			</mesh>
		</>
	)
}

export default Message
