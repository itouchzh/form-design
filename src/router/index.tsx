import { Suspense, lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Home from '../pages/home'
import Main from '../pages/main'
// const Home = lazy(() => import('@/pages/home'))
const suspense = (comp: JSX.Element) => <Suspense fallback={<>Loading...</>}>{comp}</Suspense>

export type RoutesItems = {
    path: string
    element: JSX.Element
    children?: RoutesItems[]
}
const routes: RoutesItems[] = [
    {
        path: '/',
        element: <Main />,
    },
    {
        path: '/home',
        // element: suspense(<Home />),
        element: <Home />,
    },
    {
        path: '*',
        element: <p>ERROR-PAGE</p>,
    },
]
export default routes
