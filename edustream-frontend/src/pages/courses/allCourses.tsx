import { BaseLayout } from '@/components/baseLayout/baseLayout'
import AllCourses from '@/components/courses/allCourses'
import React from 'react'

function allCourses() {
  return (
    <div>
      <BaseLayout>
      <AllCourses/>
      </BaseLayout>
    </div>
  )
}

export default allCourses