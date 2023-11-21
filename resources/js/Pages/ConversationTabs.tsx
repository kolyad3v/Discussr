import { Grid, List } from '@mui/joy'
import { FC } from 'react'
import ConversationTab from './ConversationTab'
import { IConversation, MessageType } from '@/types'

const ConversationTabs: FC<{ conversations: IConversation[]; setConversationActive: (conversation_id: number) => void; userId: number }> = ({ conversations, setConversationActive, userId }) => {
	console.log(conversations, 'convos')

	function getFirstMessageSnippet(messages: MessageType[]): string {
		if (messages.length > 0 && typeof messages[0].message === 'string') {
			return `${messages[0].message.substring(0, 20)}...`
		} else {
			return 'No messages yet...'
		}
	}

	return (
		<Grid
			className='g-0 mt-3 conversation-tabs'
			sx={{ overflow: 'scroll' }}>
			<List size='lg'>
				{conversations
					.slice()
					.reverse()
					.map(({ id, label, active, user_one_id, messages }, index) => (
						<ConversationTab
							avatarUrl={user_one_id === userId ? conversations[index].user_two.avatar?.url : conversations[index].user_one.avatar?.url}
							key={id}
							id={id}
							label={label}
							active={active}
							setConversationActive={setConversationActive}
							username={user_one_id === userId ? conversations[index].user_two.username : conversations[index].user_one.username}
							messageSnippet={getFirstMessageSnippet(messages)}
						/>
					))}
			</List>
		</Grid>
	)
}

export default ConversationTabs
