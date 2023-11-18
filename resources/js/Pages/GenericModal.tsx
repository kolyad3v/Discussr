import * as React from 'react'
import { Transition } from 'react-transition-group'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import { FC } from 'react'
import { IGenericModal } from '@/types'

const GenericModal: FC<IGenericModal> = ({ open, setOpen, children, width, height }) => {
	return (
		<React.Fragment>
			<Transition
				in={open}
				timeout={400}>
				{(state: string) => (
					<Modal
						keepMounted
						open={!['exited', 'exiting'].includes(state)}
						onClose={() => setOpen(false)}
						slotProps={{
							backdrop: {
								sx: {
									opacity: 0,
									backdropFilter: 'none',
									transition: `opacity 400ms, backdrop-filter 400ms`,
									...{
										entering: { opacity: 1, backdropFilter: 'blur(8px)' },
										entered: { opacity: 1, backdropFilter: 'blur(8px)' },
									}[state],
								},
							},
						}}
						sx={{
							visibility: state === 'exited' ? 'hidden' : 'visible',
						}}>
						<ModalDialog
							sx={{
								opacity: 0,
								width,
								height,
								p: 4,
								transition: `opacity 300ms`,
								...{
									entering: { opacity: 1 },
									entered: { opacity: 1 },
								}[state],
							}}>
							{children}
						</ModalDialog>
					</Modal>
				)}
			</Transition>
		</React.Fragment>
	)
}

export default GenericModal
