import Link from "next/link";
import PorductCard from "./components/PorductCard";

export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <Link href="/users">Users</Link>
      <PorductCard />
    </main>
  );
}
