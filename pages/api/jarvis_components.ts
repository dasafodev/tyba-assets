import { s3 } from "@/utils/s3";
import { NextApiRequest, NextApiResponse } from "next";

const BucketName = "assets.tyba.com.co";

export const getJarvisComponents = async () => {
  const images = await s3.listObjectsV2({
    Bucket: "assets.tyba.com.co",
    Prefix: "assets/jarvis-components",
  });
  const dataResp = images.Contents?.filter(
    (val) => !val.Key?.endsWith("/")
  ).map((image) => {
    return {
      id: image.Key,
      url: `https://s3.amazonaws.com/${BucketName}/${image.Key}`,
      name: image.Key?.split("/").slice(-1)[0],
    };
  });
  return dataResp;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(await getJarvisComponents());
};

export default handler;
