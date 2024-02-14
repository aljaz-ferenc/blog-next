import { getPost } from '@/app/actions'
import EditPostForm from '@/app/components/EditPostForm'
import React from 'react'

interface EditPostFormParams{
  params: {
      id: number
  }
}

export default async function EditPost({params}: EditPostFormParams) {
  const id = params.id

  const post = await getPost({id})
  
  if(!post) return

  return (
    <div>
      <EditPostForm post={post}/>
    </div>
  )
}
