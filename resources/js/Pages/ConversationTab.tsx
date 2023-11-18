import { ListItem, ListItemButton, ListItemDecorator, Avatar, ListItemContent, ListDivider, Box, Typography } from '@mui/joy'
import { FC } from 'react'
import { IConversationTab } from '@/types'

const ConversationTab: FC<IConversationTab> = ({ id, label, active, setConversationActive }) => {
	const style = {
		backgroundColor: active ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
		transition: ' 0.2s ease-in-out',
	}

	return (
		<>
			<ListItem>
				<ListItemButton
					variant='soft'
					color='primary'
					sx={style}
					onClick={() => setConversationActive(id)}>
					<ListItemDecorator>
						<Avatar />
					</ListItemDecorator>
					<ListItemContent>
						{/* @ts-ignore */}
						<Box sx={{ pl: 2, width: '100%' }}>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									mb: 0.5,
								}}>
								<Typography level='body-xs'>Username</Typography>
							</Box>
							<div>
								<Typography sx={{ mb: 0.5 }}>{label}</Typography>
								<Typography level='body-sm'>Conversation snippet</Typography>
							</div>
						</Box>
					</ListItemContent>
				</ListItemButton>
			</ListItem>
			<ListDivider inset='gutter' />
		</>
	)
}

export default ConversationTab
