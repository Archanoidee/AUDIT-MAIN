import React from 'react'
import { Button } from '@/ui/ui/button'
import { useRouter } from "next/navigation";

const cancel = () => {
     const router = useRouter();
  return (
    <div>
      <Button
                  variant="outline"
                  onClick={() => router.push("/staff")} // Specify the clean route
                >
                  Cancel
                </Button>
    </div>
  )
}

export default cancel
