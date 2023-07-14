import { Button, Loading, Navbar } from "@nextui-org/react";
import Image from "next/image";

const NavbarApp = ({
  revalidateLoading,
  revalidate,
}: {
  revalidateLoading: boolean;
  revalidate: any;
}) => {
  return (
    <Navbar isBordered variant="floating">
      <Navbar.Brand>
        <Image
          src="https://s3.amazonaws.com/assets.tyba.com.co/assets/ui_shared/images/logos/tyba.svg"
          width={100}
          height={100}
          alt="logo"
        />
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        <Navbar.Link href="ui_shared">UI Shared</Navbar.Link>
        <Navbar.Link href="jarvis-components">Componentes</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button auto flat onClick={revalidate}>
            {revalidateLoading ? (
              <div style={{ width: "70px" }}>
                <Loading size="xs" />
              </div>
            ) : (
              "Actualizar"
            )}
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

export default NavbarApp;
