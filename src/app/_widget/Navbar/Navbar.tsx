import { NavbarProps } from '@/app/_widget/Navbar/Navbar.types';
import NavbarItem from '@/app/_widget/Navbar/component/NavbarItem';

const Navbar = ({
  menuItems,
  navbarStyles,
  itemStyles,
  ...props
}: NavbarProps) => {
  return (
    <div
      className="flex gap-4 align-middle items-center"
      style={navbarStyles}
      {...props}
    >
      {menuItems.map((menuItem) => {
        return (
          <NavbarItem
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
