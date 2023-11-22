import './bootstrap'
import 'react-toastify/dist/ReactToastify.css'
import '../css/app.css'

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ToastContainer, toast } from 'react-toastify'
const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
	title: (title) => `${title} - ${appName}`,
	resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
	setup({ el, App, props }) {
		const root = createRoot(el)

		root.render(
			<>
				<App {...props} />
				<ToastContainer
					position='top-right'
					autoClose={3000}
					hideProgressBar={false}
				/>
			</>
		)
	},
	progress: {
		color: '#4B5563',
	},
})
