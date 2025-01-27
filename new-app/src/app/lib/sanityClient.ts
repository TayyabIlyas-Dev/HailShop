import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url';
// import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  token:process.env.SANITY_ACCESS_TOKEN,
  projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset : "production",
  apiVersion:"v2024-12-27",
  useCdn: true, 
})


const builder = imageUrlBuilder(client);

export  function urlFor(source: any) {
  return builder.image(source);
}