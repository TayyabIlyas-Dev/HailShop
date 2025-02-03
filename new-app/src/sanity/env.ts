export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-22'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  // process.env.SANITY_ACCESS_TOKEN,
  'skKDjb06o5GrMb5Cd15fPSzMfT8EVprwVgDjyb9m0mEYn4iI7M7YPHRpTpuJpufx7szV8O4f8L92lcFRKE0mFTyuxyL0Yis7vZ0J1CCiwOSGZ8FQfvleOZLMkoCoRlNW5Q22QsBwswdYtHSzWMGcF2dzlHgoomrUGLPuyz1aLTj6nBPQWP5z',

  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
