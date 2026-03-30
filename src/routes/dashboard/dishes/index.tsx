import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/dishes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/dishes/"!</div>
}
