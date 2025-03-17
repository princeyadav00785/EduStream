import { BaseLayout } from '@/components/baseLayout/baseLayout'
import AddCourse from '@/components/courses/AddCourses'
import React from 'react'

function addCourses() {
  return (
    <div>
      <BaseLayout>
      <AddCourse/>
      </BaseLayout>
    </div>
  )
}

export default addCourses