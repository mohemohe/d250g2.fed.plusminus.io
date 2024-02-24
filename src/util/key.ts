import NodeRSA from "node-rsa";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

export const getKey = async (screenName: string) => {
  const client = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
    },
  });
  try {
    const key = await client.send(
      new GetObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
        Key: `keys/${screenName}/public`,
      })
    );
    return key.Body!.transformToString();
  } catch (e: any) {
    if (e.$metadata?.httpStatusCode === 404) {
      // NOTE: くっそ遅いからムリムリカタツムリ
      // const key = new NodeRSA({ b: 4096 });
      const key = new NodeRSA({ b: 2048 });
      const publicKey = key.exportKey("pkcs8-public-pem");
      const privateKey = key.exportKey("pkcs8-private-pem");
      await Promise.all([
        await client.send(
          new PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
            Key: `keys/${screenName}/public`,
            Body: publicKey,
          })
        ),
        await client.send(
          new PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
            Key: `keys/${screenName}/private`,
            Body: privateKey,
          })
        ),
      ]);
      return publicKey;
    }
    throw e;
  }
};
