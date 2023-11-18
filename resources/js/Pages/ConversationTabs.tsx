import { Grid, List } from '@mui/joy'
import { FC } from 'react'
import ConversationTab from './ConversationTab'
import { IConversation } from '@/types'

const ConversationTabs: FC<{ conversations: IConversation[]; setConversationActive: (conversation_id: number) => void }> = ({ conversations, setConversationActive }) => {
	return (
		<Grid
			className='g-0 mt-3 conversation-tabs'
			sx={{ overflow: 'scroll' }}>
			<List size='lg'>
				{conversations
					.slice()
					.reverse()
					.map(({ id, label, active }) => (
						<ConversationTab
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
