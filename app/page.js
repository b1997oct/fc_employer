'use client'
import Layout from '@/PagesComponents/Layout'
import { redirect } from 'next/navigation'
import React from 'react'

export default function Page() {

  redirect('/navigation')

  return (
    <Layout>

    </Layout>
  )
}
