import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { CssVarsProvider, Grid, Sheet } from '@mui/joy'

import { IActiveMessage, IConversation, IMessage, PageProps } from '@/types'
import Header from './Header'
import SideBar from './SideBar'
import { useState } from 'react'

export default function Dashboard({ auth, conversationsData }: PageProps) {
	console.log(conversationsData)
	const [conversations, setConversations] = useState<IConversation[]>([])
	const [activeConversationId, setActiveConversationId] = useState<number>(0)
	const [activeMessages, setActiveMessages] = useState<IActiveMessage[]>([])
	const [messages, setMessages] = useState<IMessage[]>([])

	const setConversationActive = (id: number) => {
		setActiveConversationId(id)
		setConversations((prev) => {
			return prev.map((conversation) => {
				if (conversation.id === id) {
					conversation.active = true
				} else {
					conversation.active = false
				}
				return conversation
			})
		})
		let activeMessages = messages.filter((message) => message.conversation_id === id)
		setActiveMessages(activeMessages)
	}

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
							Sh S
						</Grid>
					</Grid>
				</Sheet>
			</CssVarsProvider>
		</AuthenticatedLayout>
	)
}
