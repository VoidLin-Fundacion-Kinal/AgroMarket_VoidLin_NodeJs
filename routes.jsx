import {Users} from './src/components/Users/Users'
import { Providers } from './src/components/Provider/Providers'
import { Products } from './src/components/Products/Products'
import { Inventory } from './src/components/Inventory/Inventory'
import { Categories } from './src/components/Categories/Categories'
import { Blog } from './src/components/Blog/Blog'
import { Invoices } from './src/components/Invoices/Invoices'
import { Cart } from './src/components/Cart/Cart'
import { DashboardPage } from './src/pages/DashboardPage'
import { Home } from './src/components/Home/Home'





export const routes =[
    {
        path: '/dasboardAdmin',
        element: <DashboardPage/>,
        children: [
            {
                path: 'blog',
                element: <Blog/>
            },
            {
                path: 'categories',
                element:<Categories/>
            },
            {
                path:'inventory',
                element:<Inventory/>
            },
            {
                path:'products',
                element:<Products/>
            },
            {
                path:'providers',
                element:<Providers/>
            },
            {
                path: 'users',
                element:<Users/>
            },
            {
                path: 'home',
                element:<Home/>
            },
            {
                path: 'carts',
                element:<Cart/>
            },
            {
                path: 'invoices',
                element:<Invoices/>
            }
        ]
    }
]