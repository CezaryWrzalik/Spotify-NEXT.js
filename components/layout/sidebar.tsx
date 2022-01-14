import { signOut } from "next-auth/react";

const SideBar = () => {
  return (
    <div>
      <div>
        <button onClick={() => signOut()}>Logout</button>
        <button>Home</button>
        <button>Szukaj</button>
        <button>Biblioteka</button>
      </div>
    </div>
  );
};

export default SideBar;
