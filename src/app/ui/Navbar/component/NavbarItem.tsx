import { NavbarItemProps } from '@/app/ui/Navbar/component/NavbarItem.types';

const NavbarItem = ({ label, ...props }: NavbarItemProps) => {
  return (
    <div
      className="text-white text-xl opacity-90 hover:opacity-100 cursor-pointer"
      {...props}
    >
      {label}
    </div>
  );
};
export default NavbarItem;
