import { useUser } from "@auth0/nextjs-auth0/client"

export default function Home() {
  const { user } = useUser()
  return (
    <div>
      <h1>Hello World</h1>
      <a href="/api/auth/login">Login</a>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}
