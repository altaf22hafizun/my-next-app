import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  const { data }: any = useSession();

  return (
    <div className={styles.navbar}>
      <div className="big">
        <Link href={"/"}>Navbar</Link>
      </div>
      <div className="text-white">
        <Link href={"/product"} className={styles.link}>Product</Link>
        {data && data.user.fullname}
        {data ? (
          <button className={styles.button} onClick={() => signOut()}>
            Sign Out
          </button>
        ) : (
          <button className={styles.button} onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
