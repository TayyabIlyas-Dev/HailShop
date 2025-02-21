import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product-schema'
import { order } from './order'
import review from './review'
import complaint from './complaint'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,order,review,complaint]
}
