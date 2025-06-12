
import { checkUser } from "@/lib/checkUser"

export default async function Home() {
  const user = await checkUser()

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center mt-10 bg-cyan-50 rounded-md p-10">
      {user && <h1 className="font-bold text-4xl text-cyan-500">Hello {user?.username} :3</h1>}
      {!user && <h1 className="font-bold text-4xl text-cyan-500 mb-10">Hello World :3</h1>}
      </div>
    </div>
  );
}
