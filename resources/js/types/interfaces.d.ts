export interface User {
	id: number
	name: string
	username: string
	avatar_url?: string
	email: string
	email_verified_at: string
}

export interface IGenericModal {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	children: React.ReactNode
	width: number
	height: number
}

export interface IConversation {
	id: number
	created_at: string
	messages: []
	updated_at: string
	user_one_id: number
	user_two_id: number
	label: string
	user_one: {}
	user_two: {}
	active: boolean
}

export interface IConversationTab {
	id: number

	label: string

	active: boolean
	setConversationActive: (id: number) => void
}

export type PassageType = {
	id: number
	start: number
	length: number
	message_id: number
	updated_at: string
	created_at: string
}

export interface IActiveMessage {
	id: number
	content: null | string
	created_at: string
	to_current_user: boolean
	passage_id: null | number
	conversation_id: number
	passages: PassageType[]
}

export interface IMessage extends IActiveMessage {}
