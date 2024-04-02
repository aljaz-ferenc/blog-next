import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function PostCardSkeleton() {
  return (
    <div className="w-[100%] rounded-lg overflow-hidden bg-whites flex items-center gap-2">
        <div>
          <Skeleton className='w-[50px] h-[50px] rounded-full self-center'/>
        </div>
        <div className='flex flex-col gap-2 w-full'>
          <Skeleton className="w-full h-[40px]" />
          <Skeleton className="w-full h-[110px]"/>
        </div>
      </div>
  )
}
