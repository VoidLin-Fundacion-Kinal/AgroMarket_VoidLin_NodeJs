import imgLogo from '../../assets/logoAgroMarket.png';
import { House, 
        PackageSearch, 
        Truck, 
        TableOfContents, 
        Users, 
        FileBox, 
        MessageSquareText,
        Receipt,
        ShoppingCart} from 'lucide-react';
import '../../../styles.css';
import { useNavigate } from 'react-router-dom';


export const Navbar = () => {

  const navigate = useNavigate()


  const handleNavigateToPage = (page)=>{
   navigate('/dasboardAdmin' + page)
  }
  return (
    <div className="bg-gray-400/55 py-2.5 top-0 right-0 ">
      <nav className="container mx-auto flex items-center justify-between p-4 ">
        <a href="#" className=' fixed left-0 m-3.5 not-2xl:hidden' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/home')}}>
          <img
            src={imgLogo}
            className="h-10 m-1.5 sm:h-12 md:h-14 lg:h-16 xl:h-20 w-auto"
            alt="AgroMarket Logo"
            
          />
        </a>

        <div className=" hidden lg:flex lg:items-center lg:space-x-8">
          <div className='group cursor-pointer' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/home')}}>
            <a
              href="#"
              className="text-white text-lg group-hover:text-gray-700 transition-colors font-semibold "
            >
              Home
            </a>
            <House 
              className='inline-flex m-1.5 mt-0.5 text-white group-hover:text-gray-700 transition-colors' 
              size={18}
              
            />
          </div>
          <div className='group cursor-pointer ' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/products')}}>
            <a
              href="#"
              className="text-white text-lg group-hover:text-gray-700 transition-colors font-semibold"
            >
              Products
            </a>
            <PackageSearch className='inline-flex m-1.5 mt-0.5 text-white group-hover:text-gray-700 transition-colors ' size={18}/>
          </div>
          <div className='group cursor-pointer '  onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/providers')}}>
            <a
              href="#"
              className="text-white text-lg group-hover:text-gray-700 transition-colors font-semibold"
            >
              Providers
            </a>
            <Truck className='inline-flex m-1.5 mt-0.5 text-white group-hover:text-gray-700 transition-colors ' size={18}/>
          </div>
          <div className='group cursor-pointer' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/categories')}}>
            <a
              href="#"
              className="text-white text-lg group-hover:text-gray-700 transition-colors font-semibold"
            >
              Categories
            </a>
            <TableOfContents className='inline-flex m-1.5 mt-0.5 text-white group-hover:text-gray-700 transition-colors ' size={18}/>
          </div>
          <div className='group cursor-pointer' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/users')}}>
            <a
              href="#"
              className="text-white text-lg group-hover:text-gray-700 transition-colors font-semibold"
            >
              Users
            </a>
            <Users className='inline-flex m-1.5 mt-0.5 text-white group-hover:text-gray-700 transition-colors ' size={18}/>
          </div>
          <div className='group cursor-pointer' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/inventory')}}>
          <a
            href="#"
            className="text-white text-lg group-hover:text-gray-700 transition-colors font-semibold"
          >
            Inventory
          </a>
          <FileBox className='inline-flex m-1.5 mt-0.5 text-white group-hover:text-gray-700 transition-colors ' size={18}/>
          </div>
          <div className='group cursor-pointer' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/invoices')}}>
          <a
            href="#"
            className="text-white text-lg group-hover:text-gray-700 transition-colors font-semibold"
          >
            Invoices
          </a>
          <Receipt className='inline-flex m-1.5 mt-0.5 text-white group-hover:text-gray-700 transition-colors ' size={18}/>
          </div>
          <div className='group cursor-pointer' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/carts')}}>
          <a
            href="#"
            className="text-white text-lg group-hover:text-gray-700 transition-colors font-semibold"
          >
            Carts
          </a>
          <ShoppingCart className='inline-flex m-1.5 mt-0.5 text-white group-hover:text-gray-700 transition-colors ' size={18}/>
          </div>
          <div className='group cursor-pointer' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/blog')}}>
          <a
            href="#"
            className="text-white text-lg group-hover:text-gray-700 transition-colors font-semibold"
          >
            Blog
          </a>
          <MessageSquareText className='inline-flex m-1.5 mt-0.5 text-white group-hover:text-gray-700 transition-colors ' size={18}/>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <img
            src={imgLogo}
            className="h-10 w-10 rounded-full object-cover inline-flex cursor-pointer"
            alt="Profile"
          />
          <a
            className="text-white font-semibold px-4 py-2 mr-3.5 hover:text-green-700 transition-colors not-lg:hidden"
            href="#"
          >
            Profile
          </a>
        </div>
      </nav>

      <div className="lg:hidden px-4 mt-4 bg-gray-400/50">
        <ul className="flex flex-col space-y-2">
          <li className=' group rounded-sm hover:bg-green-700 p-2.5 transition-colors' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/home')}}>
            <a href="#" className="text-green-800  p-2.5 group-hover:text-white">Home</a>
            <House className='inline-flex m-1.5 mt-0.5 text-green-800 group-hover:text-white' size={18}/>
          </li>
          <li className=' group rounded-sm hover:bg-green-700 p-2.5 transition-colors' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/products')}}>
            <a href="#" className="text-green-800 group-hover:text-white rounded-sm  p-2.5 ">Products</a>
            <PackageSearch className='inline-flex m-1.5 mt-0.5 text-green-800 group-hover:text-white' size={18}/>
          </li>
          <li className=' group rounded-sm hover:bg-green-700 p-2.5 transition-colors' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/providers')}}>
            <a href="#" className="text-green-800 group-hover:text-white rounded-sm  p-2.5 ">Providers</a>
            <Truck className='inline-flex m-1.5 mt-0.5 text-green-800 group-hover:text-white' size={18}/>
          </li>
          <li className=' group rounded-sm hover:bg-green-700 p-2.5 transition-colors' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/categories')}}>
            <a href="#" className="text-green-800 group-hover:text-white rounded-sm  p-2.5 ">Categories</a>
            <TableOfContents className='inline-flex m-1.5 mt-0.5 text-green-800 group-hover:text-white' size={18}/>
          </li>
          <li className=' group rounded-sm hover:bg-green-700 p-2.5 transition-colors' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/users')}}>
            <a href="#" className="text-green-800 group-hover:text-white rounded-sm  p-2.5 ">Users</a>
            <Users className='inline-flex m-1.5 mt-0.5 text-green-800 group-hover:text-white' size={18}/>
          </li>
          <li className=' group rounded-sm hover:bg-green-700 p-2.5 transition-colors' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/inventory')}}>
            <a href="#" className="text-green-800 group-hover:text-white rounded-sm  p-2.5 " >Inventory</a>
            <FileBox className='inline-flex m-1.5 mt-0.5 text-green-800 group-hover:text-white' size={18}/>
          </li>
          <li className=' group rounded-sm hover:bg-green-700 p-2.5 transition-colors' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/invoices')}}>
            <a href="#" className="text-green-800 group-hover:text-white rounded-sm  p-2.5 ">Invoices</a>
            <Receipt className='inline-flex m-1.5 mt-0.5 text-green-800 group-hover:text-white' size={18}/>
          </li>
          <li className=' group rounded-sm hover:bg-green-700 p-2.5 transition-colors' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/carts')}}>
            <a href="#" className="text-green-800 group-hover:text-white rounded-sm  p-2.5 ">Carts</a>
            <ShoppingCart className='inline-flex m-1.5 mt-0.5 text-green-800 group-hover:text-white' size={18}/>
          </li>
          <li className=' group rounded-sm hover:bg-green-700 p-2.5 transition-colors' onClick={(e)=> {e.preventDefault() ;handleNavigateToPage('/blog')}}>
            <a href="#" className="text-green-800 group-hover:text-white rounded-sm  p-2.5 ">BLog</a>
            <MessageSquareText className='inline-flex m-1.5 mt-0.5 text-green-800 group-hover:text-white ' size={18}/>
          </li>
        </ul>
      </div>
    </div>
  );
};
