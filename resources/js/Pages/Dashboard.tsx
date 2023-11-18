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
	const [messages, setMessages] = useState<IMessage[]>([])

	const setConversationActive = (id: number) => {
		setActiveConversationId(id)
		setConversations((prev) =>
			prev.map((conversation) => ({
				...conversation,
				active: conversation.id === id,
			}))
		)
		let activeMessages = messages.filter((message) => message.conversation_id === id)
		setActiveMessages(activeMessages)
	}

	useEffect(() => {
		setConversations(enhanceConversationsWithActiveState(conversationsData))
	}, [conversationsData])

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
