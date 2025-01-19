import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Login.module.scss";
import Head from "next/head";

const LoginViews = () => {
  const { push } = useRouter();
  const handlerLogin = () => {
    push("/product");
  };
  return (
    <div className={styles.login}>
      <Head>
        <title>Login</title>
      </Head>
      <h1 className="text-3xl">Login Page</h1>
      <button onClick={() => handlerLogin()}>Login</button>
      {/* css dalam js */}
      <p style={{ color: "red", border: "1px solid red", borderRadius: "10px" }}>
        Belum punya akun? Registrasi <Link href="/auth/register">disini</Link>
      </p>
    </div>
  );
};

export default LoginViews;
