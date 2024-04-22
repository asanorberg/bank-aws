import Link from "next/link";
import Image from "next/image";
import tree from "./assets/tree.jpg";

export default function Home() {
  return (
    <main className="min-h-[600px] max-w-[1200px] flex flex-col items-center justify-center px-36">
      {/* <Image src={tree} style={{ height: "600px", width: "auto" }} /> */}
      <Image src={tree} className="md:w-[600px] w-[400px] h-auto mb-6" />

      <Link
        className="no-underline whitespace-nowrap text-white text-xl px-10 py-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:opacity-80"
        href="/create_user"
      >
        Create user
      </Link>
    </main>
  );
}
