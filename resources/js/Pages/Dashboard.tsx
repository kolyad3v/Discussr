import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { CssVarsProvider, Grid, Sheet } from '@mui/joy'

import { IActiveMessage, IConversation, PageProps } from '@/types'
import Header from './Header'
import SideBar from './SideBar'
import { useEffect, useState } from 'react'
import Main from './THREEJS/Main'

export default function Dashboard({ auth, conversationsData }: PageProps) {
	const enhanceConversationsWithActiveState = (conversations: any[]) => {
		return conversations.map((conversation) => ({
			...conversation,
			active: false,
		}))
	}
	const [conversations, setConversations] = useState<IConversation[]>(enhanceConversationsWithActiveState(conversationsData || []))

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
		const activeConversation = conversations.find((conversation) => conversation.id === id)
		if (activeConversation && activeConversation.messages) {
			setActiveMessages(activeConversation.messages)
		} else {
			setActiveMessages([])
		}
	}

	// write a function to find the first conversationId
	const updateConversationActive = () => {
		if (activeConversationId !== 0) {
			setConversationActive(activeConversationId)
		} else if (conversations.length > 0) {
			setConversationActive(conversations[0].id)
		}
	}

	useEffect(() => {
		setConversations(enhanceConversationsWithActiveState(conversationsData))
		updateConversationActive()
	}, [conversationsData])

	console.log(activeMessages, 'active messages')

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
							<Main
								activeMessages={activeMessages}
								activeConversationId={activeConversationId}
							/>
						</Grid>
					</Grid>
				</Sheet>
			</CssVarsProvider>
		</AuthenticatedLayout>
	)
}
