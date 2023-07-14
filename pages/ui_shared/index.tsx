import { Category } from "@/models/category";
import { TybaImage } from "@/models/tyba_image";
import {
  Button,
  Collapse,
  Container,
  Loading,
  Navbar,
} from "@nextui-org/react";
import { GetStaticProps } from "next";
import Image from "next/image";
import { getUIShared } from "../api/ui_shared";
import { useRouter } from "next/router";
import { useState } from "react";
import NavbarApp from "@/components/navbar";

export const getStaticProps: GetStaticProps = async () => {
  const data = await getUIShared();
  return {
    props: {
      data: data,
    },
    revalidate: 60,
  };
};

const Index = ({ data }: { data: Array<Category> }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const revalidate = async () => {
    setLoading(true);
    await fetch("/api/revalidate?route=ui_shared");
    router.reload();
    setLoading(false);
  };

  return (
    <>
      <NavbarApp revalidateLoading={loading} revalidate={revalidate} />

      <Container>
        <Collapse.Group>
          {data.map((category: Category) => (
            <Collapse key={category.name} title={category.name}>
              <div id="contenedor-imagenes">
                {category.content.map((image: TybaImage) => (
                  <div key={image.id}>
                    <Image
                      alt="image.Key"
                      width={500}
                      height={500}
                      src={image.url}
                    />
                    <p>{image.name}</p>
                  </div>
                ))}
              </div>
            </Collapse>
          ))}
        </Collapse.Group>
      </Container>
    </>
  );
};

export default Index;
