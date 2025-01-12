'use client'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/nextjs'
import { JobCard } from '../JobCard'
import { JobType } from '@/utils/types'

const getAllJobsAction = async (token: string) => {
  try {
    const response = await axios.get(
      'https://applitrackr-api.vercel.app/api/jobs',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    return response.data
  } catch (error) {
    console.error('Error fetching jobs:', error)
    throw error
  }
}

const JobsList = () => {
  const { getToken } = useAuth()

  const fetchJobs = async () => {
    const token = await getToken()

    if (!token) {
      throw new Error('User is not authenticated')
    }

    return getAllJobsAction(token)
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  const jobs = data || []

  if (isLoading) return <h2 className="text-xl">Please Wait...</h2>
  if (error) return <h2 className="text-xl">Error fetching jobs...</h2>
  if (jobs.length < 1) return <h2 className="text-xl">No Jobs Found...</h2>

  return (
    <>
      <div className="mb-8">
        <h2 className="text-xl font-semibold capitalize ">
          {jobs.length} jobs found
        </h2>
      </div>
      <div className="grid md:grid-cols-2  gap-8">
        {jobs.map((job: JobType) => {
          return <JobCard key={job.id} job={job} />
        })}
      </div>
    </>
  )
}

export { JobsList }
