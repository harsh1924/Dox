import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      Hello World
      <Link href={'/documents/123'}>Click me</Link>
    </div>
  );
}