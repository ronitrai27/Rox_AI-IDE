
import React from 'react'

const ProjectIdPage = async ({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) => {
    const {projectId} = await params
  return (
    <div>
        <p>project id is {projectId}</p>
    </div>
  )
}

export default ProjectIdPage