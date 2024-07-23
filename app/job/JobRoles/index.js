import Autocomplete from '@/UW/Autocomplete'
import React from 'react'

export default function JobRoles(p) {

  
  return <Autocomplete {...p} hintFn='jobHint' />
}
