import { Facebook, Github, Instagram, ShoppingBag, Twitter } from 'lucide-react'

export const Footer = () => {

    return (
        <footer className="bg-gradient-to-t from-lime-700 via-lime-400 to-lime-700 text-white pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    <div className="space-y-4">
                        <div className="flex items-center m-0 pb-4">
                            <ShoppingBag />
                            <span className="ml-2 text-xl font-bold">AgroMarket</span>
                        </div>
                        <p className="text-stone-950 pb-1">¡Del campo a tu vida |⛺☀| !</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-stone-950 hover:text-white transition">
                                <span className="sr-only">Facebook</span>
                                <Facebook />
                            </a>
                            <a href="#" className="text-stone-950 hover:text-white transition">
                                <span className="sr-only">Twitter</span>
                                <Twitter />
                            </a>
                            <a href="#" className="text-stone-950 hover:text-white transition">
                                <span className="sr-only">Instagram</span>
                                <Instagram />
                            </a>
                            <a href="#" className="text-stone-950 hover:text-white transition">
                                <span className="sr-only">GitHub</span>
                                <Github />
                            </a>
                            
                            
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-stone-950 hover:text-white transition">Home</a></li>
                            <li><a href="#" className="text-stone-950 hover:text-white transition">Blog</a></li>
                            <li><a href="#" className="text-stone-950 hover:text-white transition">Marketplace</a></li>
                            <li><a href="#" className="text-stone-950 hover:text-white transition">Features</a></li>
                            <li><a href="#" className="text-stone-950 hover:text-white transition">Team</a></li>
                        </ul>
                    </div>

                    

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contact Us</h3>
                        <address className="not-italic text-stone-950">
                            <p>Guatemala City</p>
                            <p>Cuidad Cayala, Zona 16</p>
                            <p className="mt-2">Email: <a href="mailto:info@company.com" className="hover:text-white transition">support@agromarket.gt</a></p>
                            <p>Phone: <a href="tel:+11234567890" className="hover:text-white transition">+502 6678-4510</a></p>
                        </address>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-stone-950 text-sm mb-4 md:mb-0">© 2025 AgroMarket. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-stone-950 hover:text-white text-sm transition">Privacy Policy</a>
                        <a href="#" className="text-stone-950 hover:text-white text-sm transition">Terms of Service</a>
                        <a href="#" className="text-stone-950 hover:text-white text-sm transition">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

