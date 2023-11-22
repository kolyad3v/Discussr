import { useState, PropsWithChildren, ReactNode } from 'react'
import ApplicationLogo from '@/Components/ApplicationLogo'
import Dropdown from '@/Components/Dropdown'
import NavLink from '@/Components/NavLink'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'
import { Link } from '@inertiajs/react'
import { User } from '@/types'

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User; header?: ReactNode }>) {
	const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)

	return (
		<div className='min-h-screen'>
			<main>{children}</main>
		</div>
	)
}
