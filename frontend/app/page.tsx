
import Link from 'next/link';

const Home: React.FC = () => {
  
  return (
    <div>
      <h1>Welcome</h1>
      <nav>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/login">Login</Link>
      </nav>
    </div>
  );
};

export default Home;