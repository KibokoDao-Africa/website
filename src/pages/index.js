import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Kiboko Onramp/Offramp</h1>
      <nav>
        <ul>
          <li><Link href="/onramp">Onramp</Link></li>
          <li><Link href="/offramp">Offramp</Link></li>
        </ul>
      </nav>
    </div>
  );
}
