import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import DeleteUserForm from './Partials/DeleteUserForm'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'

import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import { Breadcrumbs, Stack, Typography, Link } from '@mui/joy'

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
	return (
		<AuthenticatedLayout user={auth.user}>
			<Stack
				spacing={4}
				sx={{
					display: 'flex',
					maxWidth: '800px',
					mx: 'auto',
					px: {
						xs: 2,
						md: 6,
					},
					py: {
						xs: 2,
						md: 3,
					},
				}}>
				<Breadcrumbs
					size='sm'
					aria-label='breadcrumbs'
					separator={<ChevronRightRoundedIcon fontSize='sm' />}
					sx={{ pl: 0 }}>
					<Link
						href={route('dashboard')}
						color='neutral'
						aria-label='Home'>
						<HomeRoundedIcon />
					</Link>

					<Typography
						color='neutral'
						fontWeight={500}
						fontSize={12}>
						My profile
					</Typography>
				</Breadcrumbs>
				<UpdateProfileInformationForm
					mustVerifyEmail={mustVerifyEmail}
					status={status}
					className='max-w-xl'
				/>

				<UpdatePasswordForm className='max-w-xl' />

				<DeleteUserForm className='max-w-xl' />
			</Stack>
		</AuthenticatedLayout>
	)
}
