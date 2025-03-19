export interface ApiError extends Error {
  status?: number
  code?: string
}

export interface ValidationError {
  field: string
  message: string
} 