import { BaseLayout } from '@/components/baseLayout/baseLayout'
import SessionDetails from '@/components/session/sessionInfo'
import { useRouter } from 'next/router';
import React from 'react'

function SessionInfo() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <BaseLayout>
      <SessionDetails id={id}/>
      </BaseLayout>
    </div>
  )
}

export default SessionInfo