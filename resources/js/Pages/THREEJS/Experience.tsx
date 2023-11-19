import { FC, createRef, memo, useCallback, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { Html, Text, OrbitControls } from '@react-three/drei'
import { IActiveMessage, PassageType } from '../../types/index.js'
import Message from './Message'

import NewFirstMessageButton from './NewFirstMessageButton.js'
import { PassageNodes, Node } from './PassageNodes.jsx'

const Experience: FC<{ activeMessages: IActiveMessage[]; activeConversationId: number }> = memo(({ activeMessages, activeConversationId }) => {
	// const { raycaster, scene, pointer, viewport } = useThree()

	// const createPassage = useCallback(() => {
	// 	console.log('Clicked')
	// 	console.log(scene)
	// 	console.log(raycaster.intersectObjects(scene.children, true))
	// 	console.log(pointer)
	// 	console.log(viewport)
	// 	let newNode = {
	// 		name: '',
	// 		ref: createRef(),
	// 		color: '#000000',
	// 		position: [pointer.x + (viewport.width / viewport.height) * 3, pointer.y * viewport.height - viewport.width / viewport.height, 0],
	// 	}
	// 	if (confirm('create new message?')) {
	// 		setNodes((prev) => [...prev, newNode])
	// 	}
	// }, [scene, raycaster])

	const gapY = 25 // Vertical spacing between messages
	let gapYIncrement = 0.01
	const explorBranch = (message: IActiveMessage, depth: number, siblingIndex = 0) => {
		let yPosition = (siblingIndex % 2 === 0 ? -1 : 1) * Math.ceil(siblingIndex / 2.1) * gapY

		let finalArray = [
			<Message
				position={[depth * 20, yPosition, 0]}
				message={message.message}
				createdAt={message.created_at}
				passages={message.passages}
				messageId={message.id}
				conversationId={message.conversation_id}
			/>,
		]

		let childMessages = getChildren(message.passages)

		childMessages.forEach((childMessage, index: number) => {
			if (childMessage) {
				let branch = explorBranch(childMessage, depth + 1, index)
				if (branch) {
					finalArray = [...finalArray, ...branch]
				}
			}
		})

		return finalArray
	}

	const getChildren = (passages: PassageType[]) => {
		return passages.map((passage) => activeMessages.find((message) => message.passage_id === passage.id)).filter((msg) => msg !== undefined)
	}

	const renderMessages = () => {
		let firstMessage = activeMessages.find((message) => message.passage_id === null)
		return firstMessage ? explorBranch(firstMessage, 0) : null
	}

	// const [[a1, a2, a3, b1, c1, d1]] = useState(() => [...Array(6)].map(createRef))
	// const [nodes, setNodes] = useState<{ ref: any; position: [number, number, number]; connectedTo: any[] }[]>([])

	return (
		<>
			<OrbitControls
				enableRotate={false}
				enableZoom={true}
			/>
			<ambientLight intensity={0.5} />
			{activeConversationId === 0 && <Text>Select A Conversation To Begin</Text>}
			{activeMessages.length === 0 && activeConversationId !== 0 && <NewFirstMessageButton activeConversationId={activeConversationId} />}
			{activeMessages.length !== 0 && renderMessages()}
			{/*
			{nodes.length > 0 && (
				<PassageNodes>
					{nodes.map((node, index) => (
						<Node
							key={index}
							ref={node.ref}
							position={node.position}
							connectedTo={node.connectedTo}
						/>
					))}
				</PassageNodes>
			)} */}
		</>
	)
})

export default Experience
