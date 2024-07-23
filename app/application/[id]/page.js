import Layout from '@/PagesComponents/Layout'
import React from 'react'
import ApplicationReview from '.'

export default function Page({ params, searchParams }) {
  let { id } = params,
    { job } = searchParams
  return (
    <Layout active='Applications'>
      <ApplicationReview id={id} job={job} />
    </Layout>
  )
}
