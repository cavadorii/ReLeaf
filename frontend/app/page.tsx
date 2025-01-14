import Link from 'next/link';
import { CSSProperties } from 'react';
import './styles/globals.css';

const Home: React.FC = () => {
  return (

    <div style={styles.container}>
      <h1 style={styles.header}>Welcome</h1>
      <p style={styles.description}>Start your journey by logging in or registering</p>
      <nav style={styles.nav}>
        <Link href="/register">
        </Link>
        <Link href="/login">
        </Link>
        <Link href="/plantMe">
        </Link>
        <Link href="/profile"></Link>
        <Link href="/event"></Link>
        <Link href="/eventCreate"></Link>
        <Link href="/uploadTreePhoto"></Link>
        <Link href="/events"></Link>
      </nav>
      <Link href="/login">
      <button style={styles.startButton}>Start</button>
      </Link>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
    textAlign: 'center',
    padding: '20px',
    backgroundImage: 'url(/start-screen.jpg)',
  },
  header: {
    fontSize: '3rem',
    marginBottom: '10px',
    color: '#2c3e50',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '20px',
    color: '#7f8c8d',
  },
  nav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  link: {
    display: 'inline-block',
    margin: '10px 20px',
    fontSize: '1.1rem',
    color: '#2980b9',
    textDecoration: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#ecf0f1',
    transition: 'background-color 0.3s',
  },
  startButton: {
    padding: '15px 30px',
    backgroundColor: '#62825D',
    color: 'white',
    fontSize: '1.5rem',
    borderRadius: '30px',
    textDecoration: 'none',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s, transform 0.3s',
  },
};

export default Home;
