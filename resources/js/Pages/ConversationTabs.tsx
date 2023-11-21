import { Grid, List } from '@mui/joy'
import { FC } from 'react'
import ConversationTab from './ConversationTab'
import { IConversation } from '@/types'

const ConversationTabs: FC<{ conversations: IConversation[]; setConversationActive: (conversation_id: number) => void; userId: number }> = ({ conversations, setConversationActive, userId }) => {
	console.log(conversations)
	return (
		<Grid
			className='g-0 mt-3 conversation-tabs'
			sx={{ overflow: 'scroll' }}>
			<List size='lg'>
				{conversations
					.slice()
					.reverse()
					.map(({ id, label, active, user_one_id }, index) => (
						<ConversationTab
							avatarUrl={user_one_id === userId ? conversations[index].user_two.avatar?.url : conversations[index].user_one.avatar?.url}
							// avatarUrl={conversations[index].user_one.avatar?.url}
							key={id}
							id={id}
							label={label}
							active={active}
							setConversationActive={setConversationActive}
						/>
					))}
			</List>
		</Grid>
	)
}

export default ConversationTabs
