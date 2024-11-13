
import Link from 'next/link';

const Home: React.FC = () => {
  
  return (
    <div>
      <h1>Welcome</h1>
      <nav>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </nav>
    </div>
  );
};

export default Home;