import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { CssVarsProvider, Grid, Sheet } from '@mui/joy'

import { IActiveMessage, IConversation, IMessage, PageProps } from '@/types'
import Header from './Header'
import SideBar from './SideBar'
import { useEffect, useState } from 'react'

export default function Dashboard({ auth, conversationsData }: PageProps) {
	const enhanceConversationsWithActiveState = (conversations: any[]) => {
		return conversations.map((conversation) => ({
			...conversation,
			active: false,
		}))
	}
	const [conversations, setConversations] = useState<IConversation[]>(enhanceConversationsWithActiveState(conversationsData || []))
	console.log(conversations)

	const [activeConversationId, setActiveConversationId] = useState<number>(0)
	const [activeMessages, setActiveMessages] = useState<IActiveMessage[]>([])

	const setConversationActive = (id: number) => {
		setActiveConversationId(id)
		setConversations((prev) =>
			prev.map((conversation) => ({
				...conversation,
				active: conversation.id === id,
			}))
		)
		// Find the active conversation
		const activeConversation = conversations.find((conversation) => conversation.id === id)
		if (activeConversation && activeConversation.messages) {
			setActiveMessages(activeConversation.messages)
		} else {
			setActiveMessages([]) // Reset or handle no messages case
		}
	}

	useEffect(() => {
		setConversations(enhanceConversationsWithActiveState(conversationsData))
	}, [conversationsData])

	console.log(activeMessages)

	return (
		<AuthenticatedLayout user={auth.user}>
			<CssVarsProvider>
				<Sheet>
					<Grid
						container
						sx={{ minHeight: '100vh', height: '100%' }}>
						<Header />
						<SideBar
							user={auth.user}
							conversations={conversations}
							setConversationActive={setConversationActive}
						/>
						<Grid
							xs
							sx={{ zIndex: 0 }}>
							<h2> Main</h2>
						</Grid>
					</Grid>
				</Sheet>
			</CssVarsProvider>
		</AuthenticatedLayout>
	)
}
