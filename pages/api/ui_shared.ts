import { s3 } from "@/utils/s3";
import { NextApiRequest, NextApiResponse } from "next";

const BucketName = "assets.tyba.com.co";

export const getUIShared = async () => {
  const categories = new Map();
  const folders = await s3.listObjectsV2({
    Bucket: "assets.tyba.com.co",
    Prefix: "assets/ui_shared/images/",
    Delimiter: "/",
  });
  folders.CommonPrefixes?.forEach((prefix) => {
    const pathSplit = prefix.Prefix!.split("/");
    categories.set(pathSplit[pathSplit?.length - 2], []);
  });

  const images = await s3.listObjectsV2({
    Bucket: "assets.tyba.com.co",
    Prefix: "assets/ui_shared/images",
  });
  let keys = Array.from(categories.keys());
  for (let item of images.Contents!) {
    for (let key of keys) {
      let pathWithoutName = item.Key?.split("/").slice(0, -1).join("/");
      if (pathWithoutName!.includes(key)) {
        if (!item.Key?.endsWith("/")) {
          categories.get(key).push({
            id: item.Key,
            url: `https://s3.amazonaws.com/${BucketName}/${item.Key}`,
            name: item.Key?.split("/").slice(-1),
          });
        }
      }
    }
  }
  const dataResp = Array.from(categories.keys()).map((category) => {
    return {
      name: category,
      content: categories.get(category),
    };
  });
  return dataResp;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(await getUIShared());
};

export default handler;
