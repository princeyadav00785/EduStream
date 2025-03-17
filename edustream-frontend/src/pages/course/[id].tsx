import { BaseLayout } from '@/components/baseLayout/baseLayout'
import CourseDetail from '@/components/course/courseId'
import React from 'react'
import { useRouter } from "next/router";

function CourseDetails() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <BaseLayout>
      <CourseDetail id={id} />
      </BaseLayout>
    </div>
  )
}

export default CourseDetails