import Image from "next/image";
import me from "@/public/images/me.jpeg";

export default async function Home() {
  return (
    <main className="relative h-screen" >
      <Image
        className="object-cover"
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        src="https:bit.ly/react-cover"
        fill
        alt="Me"
        quality={100}
        priority
      />
    </main>
  );
}
