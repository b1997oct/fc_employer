
import Layout from '@/PagesComponents/Layout'
import React from 'react'
import Jobs from '.'
import JobCard from '../JobCard'

export default function Page() {

  return (
    <Layout active='Jobs'>
      <JobCard />
      <Jobs />
    </Layout>
  )
}
