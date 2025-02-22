'use client'

import axios from 'axios'
import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from '@/utils/types'
import { Button } from '../Button'
import { Form } from '../Form'
import { CustomFormField, CustomFormSelect } from '../FormComponents'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

const CreateJobForm = () => {
  const { getToken } = useAuth()

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  })

  const queryClient = useQueryClient()
  const { toast } = useToast()
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: CreateAndEditJobType) => {
      console.log('Values sent:', values)

      const token = await getToken()

      if (!token) {
        throw new Error('User is not authenticated')
      }

      const response = await axios.post(
        'https://applitrackr-api.vercel.app/api/jobs',
        values,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )

      return response.data
    },
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: 'There was an error creating the job',
        })
        return
      }
      toast({ description: 'Job created successfully' })
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      queryClient.invalidateQueries({ queryKey: ['charts'] })

      router.push('/jobs')
      form.reset()
    },
    onError: (error) => {
      console.log(error)

      toast({
        description:
          (error as AxiosError).response?.statusText || 'An error occurred',
      })
    },
  })

  const onSubmit = (values: CreateAndEditJobType) => {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8">
        <h2 className="capitalize font-semibold text-4xl mb-6">add job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          <CustomFormField<CreateAndEditJobType>
            name="position"
            control={form.control}
          />
          <CustomFormField<CreateAndEditJobType>
            name="company"
            control={form.control}
          />
          <CustomFormField<CreateAndEditJobType>
            name="location"
            control={form.control}
          />
          <CustomFormSelect<CreateAndEditJobType>
            name="status"
            control={form.control}
            labelText="Job status"
            items={Object.values(JobStatus)}
          />
          <CustomFormSelect<CreateAndEditJobType>
            name="mode"
            control={form.control}
            labelText="job mode"
            items={Object.values(JobMode)}
          />
          <Button
            type="submit"
            className="self-end capitalize"
            disabled={isPending}
          >
            {isPending ? 'loading' : 'create job'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { CreateJobForm }
