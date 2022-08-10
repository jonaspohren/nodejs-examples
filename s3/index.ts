import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { writeFile, readFile } from "fs/promises";
import axios from "axios";
import FormData from "form-data";

const s3Client = new S3Client({});
const bucketName = process.env.BUCKET_NAME;

const CreatePresignedPost = (key: string) => {
  return createPresignedPost(s3Client, {
    Bucket: String(bucketName),
    Key: key,
    /* Fields: {
      "Content-Type": "image/png",
    }, */
    Conditions: [
      ["content-length-range", 0, 5242880], // 0 ~ 5MB
      // ["starts-with", "$Content-Type", "image/"],
    ],
    Expires: 60, // 60s
  });
};

const GetSignedUrl = (key: string) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return getSignedUrl(s3Client, command, { expiresIn: 60 }); // 60s
};

const GetObject = async (key: string): Promise<Buffer> => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  const response = await s3Client.send(command);

  return new Promise((resolve, reject) => {
    let buf = Buffer.alloc(0);
    const body = response.Body as NodeJS.ReadableStream;

    body.once("error", (err: Error) => reject(err));

    body.on("data", (chunk: Buffer) => (buf = Buffer.concat([buf, chunk])));

    body.once("end", () => resolve(buf));
  });
};

/* CreatePresignedPost("<KEY>")
  .then(async ({ url, fields }) => {
    const formData = new FormData();

    for (const field in fields) {
      formData.append(field, fields[field]);
    }

    formData.append("file", await readFile("<FILE>"));

    const response = await axios.post(url, formData, {
      headers: { "Content-Length": formData.getLengthSync() },
    });

    console.log(response.status);
  })
  .catch((err) => console.log(err)); */

/* GetSignedUrl("<KEY>")
  .then((url) => console.log(url))
  .catch((err) => console.log(err)); */

/* GetObject("<KEY>")
  .then(async (buff) => {
    await writeFile("<FILE>", buff);
  })
  .catch((err) => {
    console.log(err);
  }); */
