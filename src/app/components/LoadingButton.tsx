import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React from 'react'

interface LoadingButtonProps { 
        variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}

export default function LoadingButton({variant}: LoadingButtonProps) {
  return (
    <Button disabled variant={variant}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
    </Button>
  )
}
