import { ListItem, ListItemButton, ListItemDecorator, Avatar, ListItemContent, ListDivider, Box, Typography, IconButton } from '@mui/joy'
import { FC } from 'react'
import { IConversationTab } from '@/types'
import { useForm } from '@inertiajs/react'
import { Clear } from '@mui/icons-material'

const ConversationTab: FC<IConversationTab> = ({ id, label, active, setConversationActive, avatarUrl, username, messageSnippet }) => {
	const style = {
		backgroundColor: active ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
		transition: ' 0.2s ease-in-out',
	}

	const form = useForm({
		id,
	}) // Initialize the form

	const handleDelete = () => {
		if (confirm('Are you sure you want to delete this conversation?')) {
			form.delete(route('api.conversations.destroy', id), {
				onSuccess: () => {
					alert('Conversation deleted successfully!')
				},
			})
		}
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
						{avatarUrl ? (
							<Avatar
								src={avatarUrl}
								size='lg'
							/>
						) : (
							<Avatar
								variant='soft'
								size='lg'>
								{label[0]}
							</Avatar>
						)}
					</ListItemDecorator>
					<ListItemContent>
						{/* @ts-ignore */}
						<Box sx={{ pl: 2, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
							<div style={{ position: 'relative' }}>
								<Box
									sx={{
										mb: 0.5,
									}}>
									<Typography
										level='body-md'
										sx={{ fontWeight: 'bold' }}>
										{username}
									</Typography>
								</Box>

								<Typography
									level='body-md'
									sx={{ mb: 0.5 }}>
									{label}
								</Typography>
								<Typography
									level='body-sm'
									sx={{ mb: 0.5 }}>
									{messageSnippet}
								</Typography>
							</div>
							<IconButton
								color='danger'
								style={{ cursor: 'pointer', float: 'right', transition: '0.2s ease-in-out', height: 'fit-content' }}
								size='xs'>
								<Clear
									onClick={handleDelete}
									fontSize='small'
									sx={{ fontSize: '16px' }}
								/>
							</IconButton>
						</Box>
					</ListItemContent>
				</ListItemButton>
			</ListItem>
			<ListDivider inset='gutter' />
		</>
	)
}

export default ConversationTab
