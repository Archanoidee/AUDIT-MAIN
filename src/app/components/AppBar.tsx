import Link from 'next/link';

const AppBar = () => {
  return (
    <div className="flex justify-between items-center w-full h-16 bg-gray-100/40 px-6 border-b">
      {/* Left side (Title) */}
      <h2 className="text-lg font-bold">Welcome</h2>

      {/* Right side (Sign Up and Sign In links) */}
      <div className="flex items-center gap-4">
        <Link href="/signup" className="text-blue-600 font-medium hover:underline">
          Sign Up
        </Link>
        <Link href="/login" className="text-blue-600 font-medium hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default AppBar;
