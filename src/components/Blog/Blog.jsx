import React, { useState } from 'react'
import { useBlog } from '../../shared/hooks/useBlog'
import { BlogTdContent } from './BlogTdContent'
import { DeleteAlert } from '../DeleteAlert'
import { Comments } from './Comments'


export const Blog = () => {

  const {allPost,deletePost} = useBlog()
    const [deletes, setDeletes] = useState(false)
    const [openComments, setOpenComments] = useState(false)
    const [comments, setComments] = useState([])
    const [id, setid] = useState(null)
  
    const handleOpenDelete = ()=>{
      setDeletes(!deletes)
    }
    
    
    const handleDelete =()=>{
      deletePost(id)
      setDeletes(!deletes)
    }

    const handleComments = ()=>{
      setOpenComments(!openComments)
      console.log(comments)
    }
  return (
    <>
    <div className="  relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400 table-auto">
        <thead className="  text-gray-800  uppercase bg-gray-400/85 dark:bg-gray-700/95 dark:text-gray-400">
            <tr>
                <th  className="px-16 py-3">
                    <span className=" text-gray-500 dark:text-gray-900">Image</span>
                </th>
                <th  className="px-6 py-3 ">
                    User
                </th>
                <th  className="px-6 py-3">
                    Title
                </th>
                <th  className="px-6 py-3">
                    Description
                </th>
                <th  className="px-6 py-3">
                    Adress 
                </th>
                <th className="px-6 py-4">
                  Date
                </th>
                <th className="px-6 py-4">
                  CUI
                </th>
                <th className="px-6 py-4">
                  NIT
                </th>
                <th className="px-6 py-4">
                  Comments
                </th>
                <th className="px-6 py-4">
                  <span className="sr-only">Delete</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {
              allPost.map((post)=>(
                <BlogTdContent
                  key={post._id}
                  id={post._id}
                  user={post.user.username}
                  title={post.title}
                  description={post.description}
                  adress={post.address}
                  date={post.date}
                  cui={post.personalData.cui}
                  nit={post.personalData.nit}
                  deleteHandleBlog={()=>{handleOpenDelete();setid(post._id)}}
                  comments={()=>{setComments(post.comments);handleComments()}}
                />
              ))
            }
        </tbody>
    </table>
    {
      deletes &&
      <DeleteAlert
        open={deletes}
        handleOpen={handleOpenDelete}
        func={handleDelete}
      />
    }
    {openComments && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black opacity-70" onClick={handleComments}></div>

    <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-3xl shadow-xl z-10 overflow-y-auto max-h-[80vh]">
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-300"
        onClick={handleComments}
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Comentarios del Post
      </h2>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 shadow-md"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Usuario:</strong> {comment.user.name}
            </p>
            <p className="text-gray-800 dark:text-gray-100 mt-1">
              {comment.comment}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Fecha:</strong>{' '}
              {new Date(comment.date).toLocaleString()}
            </p>
            <p
              className={`text-sm font-semibold mt-1 ${
                comment.isActive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {comment.isActive ? 'Activo' : 'Inactivo'}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

</div>
    </>
  )
}
