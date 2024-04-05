import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1 className="mb-4">This Page is Under Construction!</h1>
      <Link href="/igbaras-ultra-routes">
        <span className="bg-orange-500 px-4 py-2 text-white">
          Go to IMU ROUTES MAP
        </span>
      </Link>
    </main>
  );
}
