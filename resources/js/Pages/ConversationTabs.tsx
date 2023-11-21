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
					.map(({ id, label, active, user_one_id, user_one, user_two, messages, updated_at }) => (
						<ConversationTab
							avatarUrl={user_one_id === userId ? user_two.avatar?.url : user_one.avatar?.url}
							key={id + label + updated_at}
							id={id}
							label={label}
							active={active}
							setConversationActive={setConversationActive}
							username={user_one_id === userId ? user_two.username : user_one.username}
							messageSnippet={getFirstMessageSnippet(messages)}
						/>
					))}
			</List>
		</Grid>
	)
}

export default ConversationTabs
