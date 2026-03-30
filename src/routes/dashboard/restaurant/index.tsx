import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/restaurant/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/restaurant/"!</div>
}
