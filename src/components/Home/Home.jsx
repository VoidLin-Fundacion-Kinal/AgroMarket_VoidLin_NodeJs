import React from 'react'
import image from '../../assets/home.jpg'

export const Home = () => {
  return (
    <div>
      <div className="dark:bg-gray-900">
        <div className="container mx-auto  md:py-12 lg:py-24">
          <div className="flex flex-col lg:flex-row justify-center items-strech mx-4">
            <div className="lg:w-4/12 flex justify-center items-center">
              <div>
                <h1 className="dark:text-white text-4xl md:text-5xl xl:text-6xl font-semibold text-white w-9/12">Agro Market</h1>
                <p className="dark:text-gray-300 md:w-7/12 lg:w-11/12 xl:w-10/12 mt-4 lg:mt-5 text-base leading-normal text-gray-300">En AgroMarket, creemos en el poder de la tierra, el trabajo honesto y el corazón del agricultor. Somos más que una tienda agropecuaria: somos el aliado del pueblo rural, el impulso que fortalece cosechas, cría y sueños.

Ofrecemos productos de calidad para el campo: fertilizantes, herramientas, alimentos balanceados, semillas y más. Pero también brindamos asesoría, cercanía y compromiso con quienes cultivan el alimento de nuestro país.</p>
              </div>
            </div>
            <div className="lg:w-8/12 mt-6 md:mt-8 lg:mt-0">
              <div className="relative w-full  h-8/10">
                <img src={image} alt="Agro Market"  className="w-full h-full w-max-[400] relative hidden lg:block" />
                <img src={image} alt="Agro Market" role="img" className="w-full h-full lg:hidden" />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}
