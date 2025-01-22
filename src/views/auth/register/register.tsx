import Link from "next/link";
import styles from "@/views/auth/register/Register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const RegisterView = () => {
  // karna ada loading jadi kita buat state
  const [isLoading, setIsLoading] = useState(false);
  // jika ada error maka kita akan menampilkan error
  const [error, setError] = useState("");
  // kita akan menggunakan router untuk pindah halaman
  const { push } = useRouter();
  // karna nanti suka eror jadi kita beri type any trus async
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    const data = {
      fullname: event.target.fullname.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status === 200) {
      event.target.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError(result.status === 400 ? "Email sudah terdaftar" : "");
    }
  };
  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label htmlFor="fullname" className={styles.register__form__item__label}>
              Fullname
            </label>
            <input type="text" name="fullname" placeholder="Fullname" id="fullname" className={styles.register__form__item__input} />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="email" className={styles.register__form__item__label}>
              Email
            </label>
            <input type="email" name="email" placeholder="Email" id="email" className={styles.register__form__item__input} />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="password" className={styles.register__form__item__label}>
              Password
            </label>
            <input type="password" name="password" placeholder="Password" id="password" className={styles.register__form__item__input} />
          </div>
          <button className={styles.register__form__button} type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p className={styles.register__link}>
        Sudah punya akun? Login <Link href="/auth/login">disini</Link>
      </p>
    </div>
  );
};

export default RegisterView;
