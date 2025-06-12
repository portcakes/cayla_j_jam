import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="font-bold text-4xl text-cyan-500 mb-10">Hello World :3</h1>
      <Button className="bg-blue-500 text-white p-6 rounded-md">Click me</Button>
    </div>
  );
}
