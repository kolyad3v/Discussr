import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useState } from 'react'

const CameraDriftToPosition = ({ targetPosition }) => {
	const { camera } = useThree()
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [startPosition, setStartPosition] = useState()
	const lerpFactor = 0.05 // Adjust this for speed of transition

	useEffect(() => {
		if (targetPosition) {
			//@ts-ignore
			setStartPosition(camera.position.clone())
			setIsTransitioning(true)
		}
	}, [targetPosition])

	useFrame(() => {
		if (isTransitioning) {
			camera.position.lerp(targetPosition, lerpFactor)
			if (camera.position.distanceTo(targetPosition) < 0.1) {
				setIsTransitioning(false) // Stop transitioning when close to target
			}
		}
	})

	return null
}
export default CameraDriftToPosition
