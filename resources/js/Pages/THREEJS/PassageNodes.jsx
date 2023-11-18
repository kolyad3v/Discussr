import * as THREE from 'three'
import { createContext, useMemo, useRef, useState, useContext, useLayoutEffect, forwardRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html, QuadraticBezierLine } from '@react-three/drei'
import { useDrag } from '@use-gesture/react'

const context = createContext()
const Circle = forwardRef(({ children, opacity = 1, radius = 0.05, segments = 32, color = '#ff1050', ...props }, ref) => (
	<mesh
		ref={ref}
		{...props}>
		<circleGeometry args={[radius, segments]} />
		<meshBasicMaterial
			transparent={opacity < 1}
			opacity={opacity}
			color={color}
		/>
		{children}
	</mesh>
))

export function PassageNodes({ children }) {
	const group = useRef()
	const [nodes, set] = useState([])

	// Connect the nodes and generate lines
	const lines = useMemo(() => {
		const lines = []
		for (let node of nodes)
			node.connectedTo
				.map((ref) => [node.position, ref.current.position])
				.forEach(([start, end]) => lines.push({ start: start.clone().add({ x: 0, y: 0, z: 0 }), end: end.clone().add({ x: 0, y: 0, z: 0 }) }))
		return lines
	}, [nodes])

	// Animate the lines
	useFrame((_, delta) => group.current.children.forEach((group) => (group.children[0].material.uniforms.dashOffset.value -= delta * 5)))

	return (
		// Provide global state to all children
		<context.Provider value={set}>
			{/* Render the lines */}
			<group ref={group}>
				{lines.map((line, index) => (
					<group key={index}>
						<QuadraticBezierLine
							{...line}
							// color='#f0f4f8'
							color='black'
							dashed
							dashScale={50}
							gapSize={10}
						/>
						<QuadraticBezierLine
							{...line}
							color='#f0f4f8'
							lineWidth={0.5}
							transparent
							opacity={0.1}
						/>
					</group>
				))}
			</group>
			{children}
		</context.Provider>
	)
}

export const Node = forwardRef(({ color = 'black', content, connectedTo = [], position = [0, 0, 0], ...props }, ref) => {
	const set = useContext(context)
	const { size, camera } = useThree()
	const [pos, setPos] = useState(() => new THREE.Vector3(...position))
	const state = useMemo(() => ({ position: pos, connectedTo }), [pos, connectedTo])
	// Register this node on mount, unregister on unmount
	useLayoutEffect(() => {
		set((nodes) => [...nodes, state])
		return () => void set((nodes) => nodes.filter((n) => n !== state))
	}, [state, pos])
	// Drag n drop, hover
	const [hovered, setHovered] = useState(false)
	useEffect(() => void (document.body.style.cursor = hovered ? 'grab' : 'auto'), [hovered])
	const bind = useDrag(({ down, xy: [x, y] }) => {
		document.body.style.cursor = down ? 'grabbing' : 'grab'
		setPos(new THREE.Vector3((x / size.width) * 2 - 1, -(y / size.height) * 2 + 1, 0).unproject(camera).multiply({ x: 1, y: 1, z: 0 }).clone())
	})
	return (
		<Circle
			radius={0.1}
			position={pos}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			color={hovered ? '#ff1050' : color}
			ref={ref}
			opacity={1}
			{...bind()}
			{...props}></Circle>
	)
})
