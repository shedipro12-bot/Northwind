import { ThemeProvider } from '@emotion/react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout-area/layout/layout'
import './index.css'
import { store } from './redux/store'
import { appTheme } from './utils/app-theme'
import { interceptor } from './utils/interceptor'

// Create interceptor: 
interceptor.create();

createRoot(document.getElementById('root')!).render(

    <ThemeProvider theme={appTheme}>

        <BrowserRouter>

            <Provider store={store}>

                <Layout />

            </Provider>

        </BrowserRouter>

    </ThemeProvider>

)
