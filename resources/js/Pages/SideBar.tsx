import { FC, useState, Fragment, ReactNode, Dispatch, SetStateAction, ChangeEvent, useEffect } from 'react'
import GlobalStyles from '@mui/joy/GlobalStyles'
import Avatar from '@mui/joy/Avatar'
import Box from '@mui/joy/Box'

import Divider from '@mui/joy/Divider'
import Input from '@mui/joy/Input'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton'
import ListItemContent from '@mui/joy/ListItemContent'
import Typography from '@mui/joy/Typography'
import Sheet from '@mui/joy/Sheet'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import SupportRoundedIcon from '@mui/icons-material/SupportRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import NewConversationButton from './NewConversationButton'
import { IConversation } from '@/types'
import { closeSidebar } from './utils'
import ConversationTabs from './ConversationTabs'
import { Link } from '@inertiajs/react'

function Toggler({
	defaultExpanded = false,
	renderToggle,
	children,
}: {
	defaultExpanded?: boolean
	children: ReactNode
	renderToggle: (params: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => ReactNode
}) {
	const [open, setOpen] = useState(false)
	return (
		<Fragment>
			{renderToggle({ open, setOpen })}
			<Box
				// @ts-ignore
				sx={{
					display: 'grid',
					gridTemplateRows: open ? '1fr' : '0fr',
					transition: '0.2s ease',
					'& > *': {
						overflow: 'hidden',
					},
				}}>
				{children}
			</Box>
		</Fragment>
	)
}

const SideBar: FC<{ conversations: IConversation[]; setConversationActive: any; user: any }> = ({ conversations, setConversationActive, user }) => {
	const [searchInput, setSearchInput] = useState('')
	const filteredConversations = conversations.filter((conversation) => conversation.label && conversation.label.includes(searchInput))
	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value)
	}

	console.log(user, conversations)

	return (
		<Sheet
			className='Sidebar'
			sx={{
				position: {
					xs: 'fixed',
					md: 'sticky',
				},
				transform: {
					xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
					md: 'none',
				},
				transition: 'transform 0.4s, width 0.4s',
				zIndex: 10000,
				height: '100dvh',
				width: 'var(--Sidebar-width)',
				top: 0,
				p: 2,
				flexShrink: 0,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				borderRight: '1px solid',
				borderColor: 'divider',
			}}>
			<GlobalStyles
				styles={(theme) => ({
					':root': {
						'--Sidebar-width': '240px',
						[theme.breakpoints.up('lg')]: {
							'--Sidebar-width': '320px',
						},
					},
				})}
			/>
			<Box
				className='Sidebar-overlay'
				sx={{
					position: 'fixed',
					zIndex: 9998,
					top: 0,
					left: 0,
					width: '100vw',
					height: '100%',
					opacity: 'var(--SideNavigation-slideIn)',
					backgroundColor: 'var(--joy-palette-background-backdrop)',
					transition: 'opacity 0.4s',
					transform: {
						xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
						lg: 'translateX(-100%)',
					},
				}}
				onClick={() => closeSidebar()}
			/>
			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
				{user.avatar ? (
					<Avatar
						variant='outlined'
						size='lg'
						src={user.avatar.url}
					/>
				) : (
					<Avatar
						variant='outlined'
						size='lg'>
						{user.name.charAt(0) ? user.name.charAt(0) : 'D'}
					</Avatar>
				)}

				<Box sx={{ minWidth: 0, flex: 1 }}>
					<Typography level='title-md'>Welcome back, {user.name}</Typography>
					<Typography level='body-sm'>Signed in as {user.username}</Typography>
				</Box>

				{/* <ColorSchemeToggle sx={{ ml: 'auto' }} /> */}
			</Box>

			<Divider />
			<NewConversationButton />
			<Input
				size='sm'
				startDecorator={<SearchRoundedIcon />}
				placeholder='Search'
				variant='soft'
				value={searchInput}
				onChange={handleSearchChange}
			/>

			<Box
				sx={{
					minHeight: 0,
					overflow: 'hidden auto',
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
					[`& .${listItemButtonClasses.root}`]: {
						gap: 1.5,
					},
				}}>
				<List
					size='sm'
					sx={{
						gap: 1,
						'--List-nestedInsetStart': '30px',
						'--ListItem-radius': (theme) => theme.vars.radius.sm,
					}}>
					<ConversationTabs
						conversations={searchInput ? filteredConversations : conversations}
						setConversationActive={setConversationActive}
					/>
				</List>
			</Box>
			<Divider />
			<List
				size='sm'
				sx={{
					mt: 'auto',
					flexGrow: 0,
					'--ListItem-radius': (theme) => theme.vars.radius.sm,
					'--List-gap': '8px',
					mb: 0,
				}}>
				<ListItem nested>
					<Toggler
						defaultExpanded
						renderToggle={({ open, setOpen }) => (
							<ListItemButton onClick={() => setOpen(!open)}>
								<SettingsRoundedIcon />
								<ListItemContent>
									<Typography level='title-sm'>Settings</Typography>
								</ListItemContent>
								<KeyboardArrowDownIcon sx={{ transform: open ? 'none' : 'rotate(180deg)' }} />
							</ListItemButton>
						)}>
						<List sx={{ gap: 0.5 }}>
							<ListItem sx={{ mt: 0.5 }}>
								<ListItemButton>
									<GroupRoundedIcon />
									<Link
										as='div'
										style={{ width: '100%' }}
										href={route('profile.edit')}>
										Profile
									</Link>
								</ListItemButton>
							</ListItem>
							<ListItem>
								<ListItemButton>
									<SupportRoundedIcon />
									About
								</ListItemButton>
							</ListItem>
							<ListItem>
								<ListItemButton>
									<LogoutRoundedIcon />
									<Link
										method='post'
										as='div'
										style={{ width: '100%' }}
										href={route('logout')}>
										Log Out
									</Link>
								</ListItemButton>
							</ListItem>
						</List>
					</Toggler>
				</ListItem>
			</List>
		</Sheet>
	)
}

export default SideBar
