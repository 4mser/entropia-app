import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import ButtonActivity from "../ui/button-activity";
import ButtonSearch from "../ui/button-search";

function Topbar() {

  
  

  return (
    <nav className='topbar md:hidden' >
      <Link href='/' className='flex items-center gap-4'>
        <img src='/entropia.svg' alt='logo' width={110} height={110} />
      </Link>

      <div className='flex items-center'>
        <div className="flex gap-4 items-center">
          <ButtonSearch />
          <ButtonActivity />
        </div>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 w-16 pl-2  ml-3 p-0",
            },
          }}
        />
      </div>
    </nav>
  );
}

export default Topbar;
