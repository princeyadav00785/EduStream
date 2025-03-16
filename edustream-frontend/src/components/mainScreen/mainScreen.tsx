import React from 'react'
import { BaseLayout } from '../baseLayout/baseLayout'
import Dashboard from '../dashboard/Dasboard'

function mainScreen() {
  return (
    <div>
      <BaseLayout>
      <Dashboard/>
      </BaseLayout>
    </div>
  )
}

export default mainScreen