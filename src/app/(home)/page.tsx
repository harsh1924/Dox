import Link from "next/link";
import { HomeNavbar } from "./navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed p-4 top-0 left-0 right-0 z-10 h-16 bg-white">
        <HomeNavbar />
      </div>
      <div className="mt-16">
        <Link href={'/documents/123'}>Click me</Link>
      </div>
    </div>
  );
}