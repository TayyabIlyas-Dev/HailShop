import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId,token } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // False rakhain taake latest data mile
  token,
})
