import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Navbar = () => {
  const { data }: any = useSession();

  return (
    <div className="flex justify-between items-center p-4  bg-gray-800 text-white shadow-md">
      <div className="text-2xl font-semibold">
        <Link href="/">Navbar</Link>
      </div>

      <div className="flex items-center gap-6">
        <Link href="/product" className="text-lg font-medium hover:text-teal-400 transition-colors">
          Product
        </Link>

        <div className="flex items-center gap-3">
          {data && (
            <>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="w-8 h-8 rounded-full" />
              </Avatar>
              <span>{data.user.fullname}</span>
            </>
          )}
        </div>

        {data ? (
          <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors" onClick={() => signOut()}>
            Sign Out
          </button>
        ) : (
          <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors" onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
