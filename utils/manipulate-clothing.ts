import axios from "axios";
// import * as aws from "aws-sdk";
import { supabase } from "./supabase";
import { decode } from "base64-arraybuffer";

const s =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAw1BMVEUTEQ4hGhigd2HdrJGwiHQsHhgdFA8nGxQQDxFyU0TirY3sxbX41MSKZVJGLSAyIRgeGhySblqxiXPcsZ7muaWyinN0UD0rHBQvJSGXcVqNcmbInonKnISPc2eKalckHhtSPzW4fmXvuqXWpo/QoInlr5eyemM1KCA0KyOUaFHRm3/Ek4HHl4bJknegclomHRlbTEFuV0atf2WscWSucGiqeGFfSzwfFRBpWElYQzSWa1PFl4DNnoedcFJFLR4qIBn///+oA364AAAAAWJLR0RA/tlc2AAAAAlwSFlzAAAASAAAAEgARslrPgAAAAd0SU1FB+ALCRcAH0Qpd7kAAAG6SURBVHja7dBpIpABAABRZEllJ2RX9qXIvt7/Vo4w/31vbjBvZCQajcaiL9F4NBFNRlNR/QMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACfAeBrNB19i75HP6KZaDaaiwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAhAMxHC9FitBQtRyvRz2g1AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIYAsBatR7+ijWgz2oq2o50IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGALAbrQX7Ue/oz/RQXQYHUUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAEACOo5PoNDqLzqOL6DL6GwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDAPgXXUXX0f/oJrqN7qL7CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgCwEP0GD1Fz9FL9Bq9Re8RAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMACADx35gdKW7lRhAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTExLTEyVDIwOjEwOjU5LTA4OjAwVH7LWQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNi0xMS0wOVQyMzowMDozMS0wODowMHGaZ/UAAAAASUVORK5CYII=";

export async function manipulateImage({
  previousImageURL = "https://pub-6afe491e81d54a4a804ead8204299f89.r2.dev/abc.jpeg",
  remove,
  replace,
  negative,
}: {
  previousImageURL?: string;
  remove: string;
  replace: string;
  negative: string;
}): Promise<string> {
  console.log("Started to upload image: ", previousImageURL.slice(0, 20));
  const bare = previousImageURL.replace("data:image/jpeg;base64,", "");
  const dataLoc = await uploadToSupabaseBucket(bare);
  console.log("Image uploaded to: ", dataLoc);

  const payload = {
    image: dataLoc.publicUrl,
    remove,
    replace,
    negative,
    email: process.env.EXPO_PUBLIC_EMAIL!,
    password: process.env.EXPO_PUBLIC_PASSWORD!,
  };
  console.log("Payload: ", payload);
  const response = await axios.post(
    "https://thenewblack.ai/api/1.1/wf/edit",
    payload
  );
  console.log("Image url: ", response.data);
  return response.data;
}

const uploadToSupabaseBucket = async (base64Image: string) => {
  console.log("Uploading to supabase bucket");
  const fileName = `public/${Date.now()}.jpg`;
  const { data, error } = await supabase.storage
    .from("image-storage")
    .upload(fileName, decode(base64Image), {
      contentType: "image/jpeg",
      upsert: false,
    });
  console.log("Data: ", data);
  console.log("Error: ", error);
  const { data: publicUrl } = supabase.storage
    .from("image-storage")
    .getPublicUrl(data?.path ?? "");
  console.log("Public URL: ", publicUrl);
  return publicUrl;
};

// const s3 = new aws.S3({
//   endpoint: process.env.EXPO_PUBLIC_R2_ENDPOINT,
//   accessKeyId: process.env.EXPO_PUBLIC_CLOUDFLARE_ACCESS_KEY,
//   secretAccessKey: process.env.EXPO_PUBLIC_CLOUDFLARE_SECRET_KEY,
//   s3ForcePathStyle: true,
//   signatureVersion: "v4",
// });

// async function uploadImageToS3(base64Image: string, fileName: string) {
//   console.log("base64Image: ", base64Image.slice(0, 100));
//   const buffer = Buffer.from(
//     base64Image.replace(/^data:image\/\w+;base64,/, ""),
//     "base64"
//   );

//   const params = {
//     Bucket: "dragonhack-2024-bucket",
//     Key: fileName, // File name you want to save as
//     Body: buffer,
//     ACL: "public-read", // Depending on your privacy needs
//     ContentEncoding: "base64", // Required if the body is base64-encoded
//     ContentType: "image/jpeg", // Assuming the image is JPEG
//   };

//   const res = await s3
//     .upload(params)
//     .promise()
//     .then(
//       (data) => {
//         console.log("Success: ", data);
//       },
//       (err) => {
//         console.log("Error: ", err);
//       }
//     );
//   console.log(res);
// }
