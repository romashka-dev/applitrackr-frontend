'use client'

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

const CreateJobForm = () => {
  // 1. Define your form.
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

  const onSubmit = (value: CreateAndEditJobType) => {
    console.log(value)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8">
        <h2 className="capitalize font-semibold text-4xl mb-6">add job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* position */}
          <CustomFormField<CreateAndEditJobType>
            name="position"
            control={form.control}
          />
          {/* company */}
          <CustomFormField<CreateAndEditJobType>
            name="company"
            control={form.control}
          />
          {/* location */}
          <CustomFormField<CreateAndEditJobType>
            name="location"
            control={form.control}
          />

          {/* job status */}
          <CustomFormSelect<CreateAndEditJobType>
            name="status"
            control={form.control}
            labelText="Job status"
            items={Object.values(JobStatus)}
          />
          {/* job mode */}
          <CustomFormSelect<CreateAndEditJobType>
            name="mode"
            control={form.control}
            labelText="job mode"
            items={Object.values(JobMode)}
          />
          <Button type="submit" className="self-end capitalize">
            create job
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { CreateJobForm }
