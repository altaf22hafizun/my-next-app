import RegisterView from "@/views/auth/register/register";
import Head from "next/head";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <RegisterView />
    </>
  );
};

export default RegisterPage;
