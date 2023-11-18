import { FC } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { IActiveMessage } from '@/types'

const Main: FC<{ activeMessages: IActiveMessage[]; activeConversationId: number }> = ({ activeMessages, activeConversationId }) => {
	console.log('canvas re render')
	return (
		<Canvas
			camera={{
				fov: 45,
				near: 0.1,
				far: 200,
				position: [0, 0, 40],
			}}>
			<Experience
				activeMessages={activeMessages}
				activeConversationId={activeConversationId}
			/>
		</Canvas>
	)
}

export default Main
