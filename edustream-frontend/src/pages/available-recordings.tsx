import { BaseLayout } from '@/components/baseLayout/baseLayout'
import RecordingsList from '@/components/recordings/recording-list'
import React from 'react'

function AvailableRecordings() {
  return (
    <div>
      <BaseLayout>
      <RecordingsList/>
      </BaseLayout>
    </div>
  )
}

export default AvailableRecordings