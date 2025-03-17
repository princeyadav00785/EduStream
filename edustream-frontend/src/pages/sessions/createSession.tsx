import { BaseLayout } from '@/components/baseLayout/baseLayout'
import CreateSession from '@/components/sessions/createSession'
import React from 'react'

function createSession() {
  return (
    <div>
    <BaseLayout>
    <CreateSession/>
    </BaseLayout>
    </div>
  )
}

export default createSession