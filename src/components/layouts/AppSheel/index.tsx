import { useRouter } from "next/router";
import Navbar from "../Navbar";

type AppSheelProps = {
  children: React.ReactNode;
};

// Untuk disbale atau yang ga ingin ditampilkan navbar
const disbaleNavbar = ["/auth/login", "/auth/register", "/404"];

const AppSheel = (props: AppSheelProps) => {
  const { children } = props;
  const { pathname } = useRouter();
  return (
    <div>
      {!disbaleNavbar.includes(pathname) && <Navbar />}
      {children}
    </div>
  );
};

export default AppSheel;
