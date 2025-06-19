import React,{useState} from 'react'

export const DeleteAlert = ({open,handleOpen,func}) =>  {


  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center'>
      
       {open && (
        <div className='absolute inset-0 bg-black opacity-80' onClick={handleOpen} />
      )} 

      {open && (
        <div className='relative '>
        <div className=" overflow-y-auto z-50">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div
              className=" transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="p-4 sm:p-10 text-center overflow-y-auto">
                <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </span>

                <h3 className="mb-2 text-2xl font-bold text-red-800">
                  DELETE
                </h3>
                <p className="text-gray-500">
                  Are you sure you would like to delete this object?
                </p>

                <div className="mt-6 flex justify-center gap-x-4">
                  <button
                    onClick={func}
                    className="py-2.5 px-5 inline-flex justify-center items-center gap-2 rounded-md border font-medium border-red-400 bg-red-800 text-white  hover:bg-orange-600  transition-all text-sm"
                  >
                    Sure
                  </button>
                  <button
                    onClick={handleOpen}
                    className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
     </div>

      )}
    </div>
  );
}
