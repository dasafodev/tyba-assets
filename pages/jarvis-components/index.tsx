import NavbarApp from "@/components/navbar";
import { TybaImage } from "@/models/tyba_image";
import { Collapse, Container, Spacer } from "@nextui-org/react";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { getJarvisComponents } from "../api/jarvis_components";

export const getStaticProps: GetStaticProps = async () => {
  const data = await getJarvisComponents();
  return {
    props: {
      data: data,
    },
    revalidate: 60,
  };
};

const JarvisComponentsPage = ({ data }: { data: Array<TybaImage> }) => {
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
      <Spacer y={1} />

      <Container>
        <div id="contenedor-imagenes-jarvis">
          {data.map((image: TybaImage) => (
            <div key={image.id}>
              <Image alt="image.Key" width={500} height={500} src={image.url} />
              <p>{image.name}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default JarvisComponentsPage;
