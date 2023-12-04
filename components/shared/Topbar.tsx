import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import ButtonActivity from "../ui/button-activity";

function Topbar() {

  
  

  return (
    <nav className='topbar md:hidden' >
      <Link href='/' className='flex items-center gap-4'>
        <img src='/entropia.svg' alt='logo' width={110} height={110} />
      </Link>

      <div className='flex items-center'>
        <ButtonActivity />
        {/* <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton>
              <div className='flex cursor-pointer opacity-80 hover:opacity-100'>
                <img
                  src='/assets/logout.svg'
                  alt='logout'
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div> */}

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 pl-2 ml-3 p-0",
            },
          }}
        />
      </div>
    </nav>
  );
}

export default Topbar;
