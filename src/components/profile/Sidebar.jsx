import Link from "next/link";

import profile from "../../components/assets/profile.jpg";
import Image from "next/image";

const menuItems = [
  {
    href: "/profile",
    title: "Profile",
  },
  {
    href: "/profile/address",
    title: "Address",
  },
  {
    href: "/profile/logout",
    title: "Logout",
  },
];

export default function Sidebar({ children }) {
  return (
    <aside className="basis-1/4 w-full h-full border-2 rounded-l-lg shadow-md">
      <div className="m-5 flex flex-nowrap items-center gap-6">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <Image src={profile} alt="profile" />
          </div>
        </div>

        <div className="details">
          <h1 className="text-primary font-semibold text-xl">User Profile</h1>
          <p className="text-primary font-normal text-sm opacity-70">
            user@email.com
          </p>
        </div>
      </div>
      <nav>
        <ul>
          {menuItems.map(({ href, title }) => (
            <li className="my-2 mx-6" key={title}>
              <Link
                href={href}
                className={`flex p-2 text-primary hover:font-semibold hover:underline hover:underline-offset-8 cursor-pointer`}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
