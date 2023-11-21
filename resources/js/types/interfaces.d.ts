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

export type MessageType = {
	id: number
	created_at: string
	updated_at: string
	message: string
	user_from_id: number
	user_to_id: number
	passage_id: null | number
	conversation_id: number
	passages: PassageType[]
}

export interface IConversation {
	id: number
	created_at: string
	messages: MessageType[]
	updated_at: string
	user_one_id: number
	user_two_id: number
	label: string
	user_one: {
		username: string
		avatar: {
			url: string
		}
	}
	user_two: {
		username: string
		avatar: {
			url: string
		}
	}

	active: boolean
}

export interface IConversationTab {
	id: number
	label: string
	active: boolean
	setConversationActive: (id: number) => void
	avatarUrl: string | null
	username: string
	messageSnippet: string
}

export type PassageType = {
	created_at: string
	id: number
	length: number
	message_id: number
	start: number
	updated_at: string
}

export interface IActiveMessage {
	conversation_id: number
	created_at: string
	id: number
	message: string
	passage_id: null | number
	passages: PassageType[]
	updated_at: string
	user_from_id: number
	user_to_id: number
}
