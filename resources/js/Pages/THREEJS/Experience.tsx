
import { FC, createRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html, Text, OrbitControls, QuadraticBezierLine } from '@react-three/drei'
import { IActiveMessage, PassageType } from '../../types/index.js'
import Message from './Message'

import NewFirstMessageButton from './NewFirstMessageButton.js'
import * as THREE from 'three'
import { useColorScheme } from '@mui/joy'
// import { PassageNodes, Node } from './PassageNodes.jsx'

//TODO: go through and update any types
const Experience: FC<{ activeMessages: IActiveMessage[]; activeConversationId: number; user: any }> = memo(({ activeMessages, activeConversationId, user }) => {
	const fixedCameraZPosition = 40
	const { camera } = useThree()
	const controlsRef = useRef<any>()
	const [moving, setMoving] = useState(false)
	const [startTargetPos, setStartTargetPos] = useState(new THREE.Vector3())
	const [endTargetPos, setEndTargetPos] = useState(new THREE.Vector3())
	const [targetPosition, setTargetPosition] = useState<[number, number, number]>()

	let messageLinks: any = []
	const groupRefs = useMemo(() => messageLinks.map(() => createRef()), [messageLinks])

	const startMovingToTarget = (newTargetPos: [number, number, number]) => {
		setStartTargetPos(controlsRef.current.target.clone())
		setEndTargetPos(new THREE.Vector3(newTargetPos[0], newTargetPos[1], newTargetPos[2]))
		setMoving(true)
	}

	let messagePassageIdToPositionMap = new Map<number | null, [number, number, number]>()

	const handlePassageClick = useCallback(
		(passageId: number | null) => {
			if (passageId === null) return
			const targetPos = messagePassageIdToPositionMap.get(passageId)
			if (targetPos) {
				setTargetPosition(targetPos)
				startMovingToTarget(targetPos)
				setMoving(true)
			}
		},
		[messagePassageIdToPositionMap]
	)

	useFrame(() => {
		if (moving) {
			// Interpolate camera position
			camera.position.lerp(new THREE.Vector3(targetPosition![0], targetPosition![1], fixedCameraZPosition), 0.1)

			// Interpolate controls target
			controlsRef.current.target.lerp(endTargetPos, 0.05)
			controlsRef.current.update()

			if (camera.position.distanceTo(new THREE.Vector3(targetPosition![0], targetPosition![1], fixedCameraZPosition)) < 0.5 && controlsRef.current.target.distanceTo(endTargetPos) < 0.5) {
				setMoving(false)
			}
		}
	})

	useEffect(() => {
		if (moving) {
			controlsRef.current.target.copy(startTargetPos) // Initialize the target position
		}
	}, [moving, startTargetPos])

	const gapY = 15 // Vertical spacing between messages

	const exploreBranch = (message: IActiveMessage, depth: number, siblingIndex = 0, parentYPosition = 0) => {
		let dynamicGapY = 25 * Math.pow(0.8, depth)
		let yPositionOffset = (siblingIndex % 2 === 0 ? -1 : 1) * Math.ceil(siblingIndex / 2.1) * dynamicGapY
		let yPosition = parentYPosition + yPositionOffset

		const messagePosition: [number, number, 0] = [depth * 20, yPosition, 0]
		messagePassageIdToPositionMap.set(message.passage_id, messagePosition)
		let finalArray = [
			<Message
				key={message.id}
				user={user.id === message.user_from_id ? user.username : 'From other person'}
				handlePassageClick={handlePassageClick}
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
				let branch = exploreBranch(childMessage, depth + 1, index, yPosition)
				if (branch) {
					finalArray = [...finalArray, ...branch]

					const childPosition = messagePassageIdToPositionMap.get(childMessage.passage_id)
					if (childPosition) {
						messageLinks.push({
							parentPosition: messagePosition,
							childPosition: childPosition,
						})
					}
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
		return firstMessage ? exploreBranch(firstMessage, 0) : null
	}

	// const [[a1, a2, a3, b1, c1, d1]] = useState(() => [...Array(6)].map(createRef))
	// const [nodes, setNodes] = useState<{ ref: any; position: [number, number, number]; connectedTo: any[] }[]>([])
	const { mode, setMode } = useColorScheme()

	const renderBezierCurves = () => {
		return messageLinks.map((link, index) => (
			<group
				ref={groupRefs[index]}
				key={index}>
				<QuadraticBezierLine
					start={link.parentPosition}
					end={link.childPosition}
					mid={calculateMidPoint(link.parentPosition, link.childPosition)}
					color={mode === 'dark' ? '#fff' : '#000'}
					lineWidth={1}
					dashed={true}
					dashScale={10}
					gapSize={1}
				/>
			</group>
		))
	}

	const calculateMidPoint = (start: number[], end: number[]) => {
		// This function calculates the control point for the bezier curve.
		// You can adjust this logic based on how you want the curve to be shaped.
		return [
			(start[0] + end[0]) / 2,
			Math.max(start[1], end[1]) + 0, // Adjust the Y value for the mid-point
			(start[2] + end[2]) / 2,
		]
	}

	useFrame((_, delta) => {
		groupRefs.forEach((groupRef) => {
			if (groupRef.current) {
				const line = groupRef.current.children[0]
				if (line && line.material.uniforms.dashOffset) {
					line.material.uniforms.dashOffset.value -= delta * 5
				}
			}
		})
	})

	return (
		<>
			<OrbitControls
				enableRotate={false}
				enableZoom={true}
				ref={controlsRef}
			/>
			<ambientLight intensity={0.5} />
			{activeConversationId === 0 && <Text>Select A Conversation To Begin</Text>}
			{activeMessages.length === 0 && activeConversationId !== 0 && <NewFirstMessageButton activeConversationId={activeConversationId} />}
			{activeMessages.length !== 0 && renderMessages()}

			{renderBezierCurves()}
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
