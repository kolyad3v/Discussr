import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { CssVarsProvider, Grid, Sheet } from '@mui/joy'

import { PageProps } from '@/types'
import Header from './Header'

export default function Dashboard({ auth, conversationsData }: PageProps) {
	console.log(conversationsData)
	return (
		<AuthenticatedLayout user={auth.user}>
			<CssVarsProvider>
				<Sheet>
					<Grid
						container
						sx={{ minHeight: '100vh', height: '100%' }}>
						<Header />
						<h2> Sidebar</h2>

						<Grid
							xs
							sx={{ zIndex: 0 }}>
							<h2> Main</h2>
							Sh
						</Grid>
					</Grid>
				</Sheet>
			</CssVarsProvider>
		</AuthenticatedLayout>
	)
}
