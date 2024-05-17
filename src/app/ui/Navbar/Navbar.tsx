import { NavbarProps } from '@/app/ui/Navbar/Navbar.types';
import NavbarItem from '@/app/ui/Navbar/component/NavbarItem';
import { useRouter } from 'next/navigation';

const Navbar = ({
  menuItems,
  navbarStyles,
  itemStyles,
  ...props
}: NavbarProps) => {
  const router = useRouter();
  return (
    <div
      className="flex gap-4 align-middle items-center"
      style={navbarStyles}
      {...props}
    >
      {menuItems.map((menuItem) => {
        return (
          <NavbarItem
            onClick={() => router.push(menuItem.route)}
            key={menuItem.key}
            label={menuItem.value}
            style={itemStyles}
          />
        );
      })}
    </div>
  );
};

export default Navbar;
