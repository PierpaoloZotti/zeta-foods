import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-5 pt-6">
      <Image src="/logo.png" alt="Zetafoods" width={100} height={30} />
      <Button
        className="border-none bg-transparent"
        variant="outline"
        size="icon"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
