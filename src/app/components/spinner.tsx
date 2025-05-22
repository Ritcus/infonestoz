'use client'

interface SpinnerProps {
    loadingName?:string
}
export default function Spinner({loadingName}:SpinnerProps) {
  return (
    <div className="flex flex-col justify-center items-center h-24">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <h1>{loadingName ? `Loading ${loadingName}...`: `Loading...`}</h1>
    </div>
  )
}