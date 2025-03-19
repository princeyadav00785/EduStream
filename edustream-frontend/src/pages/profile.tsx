import { BaseLayout } from '@/components/baseLayout/baseLayout'
import ProfilePage from '@/components/profile/profile'
import React from 'react'

function profile() {
  return (
    <div>
        <BaseLayout>
        <ProfilePage/>
        </BaseLayout>
    </div>
  )
}

export default profile