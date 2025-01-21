import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data }: any = useSession();
  return (
    <div>
      <h1>Data Profile</h1>
      <div>
        <h3>{data && data.user.fullname}</h3>
        <h3>{data && data.user.email}</h3>
      </div>
    </div>
  );
};

export default ProfilePage;
