import Link from "next/link";
import styles from "@/views/auth/login/Login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileWarning, LucideMessageSquareWarning, MailWarning, ShieldClose, Terminal } from "lucide-react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

const LoginView = () => {
  // karna ada loading jadi kita buat state
  const [isLoading, setIsLoading] = useState(false);
  // jika ada error maka kita akan menampilkan error
  const [error, setError] = useState("");
  // kita akan menggunakan router untuk pindah halaman
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";
  // karna nanti suka eror jadi kita beri type any trus async
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email: event.target.email.value,
        password: event.target.password.value,
        redirect: false,
        callbackUrl: "/",
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email atau password salah");
      }
    } catch (error: any) {
      setIsLoading(false);
      setError("Email atau password salah");
    }
  };
  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      {error && (
        <Alert className="bg-red-500 text-white w-4/12">
          <ShieldClose />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* {error && <p className={styles.login__error}>{error}</p>} */}
      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.login__form__item}>
            <label htmlFor="email" className={styles.login__form__item__label}>
              Email
            </label>
            <input type="email" name="email" placeholder="Email" id="email" className={styles.login__form__item__input} />
          </div>
          <div className={styles.login__form__item}>
            <label htmlFor="password" className={styles.login__form__item__label}>
              Password
            </label>
            <input type="password" name="password" placeholder="Password" id="password" className={styles.login__form__item__input} />
          </div>
          <button className={styles.login__form__button} type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
      <p className={styles.login__link}>
        Belum punya akun? Register <Link href="/auth/register">disini</Link>
      </p>
    </div>
  );
};

export default LoginView;
