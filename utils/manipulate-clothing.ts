import axios from "axios";

async function getUpdatedImageURL({
  previousImageURL,
  remove,
  replace,
  negative,
  email,
  password,
}: {
  previousImageURL: string;
  remove: string;
  replace: string;
  negative: string;
  email: string;
  password: string;
}): Promise<any> {
  const response = await axios.post("https://thenewblack.ai/api/1.1/wf/edit", {
    image: previousImageURL,
    remove,
    replace,
    negative,
    email,
    password,
  });
  console.log("Image url: ", response.data);
  return response.data;
}

getUpdatedImageURL({
  // This image should be deployed
  previousImageURL:
    "https://www.alterationsboutique.co.uk/images/images/images/WINNER-WEEK-3.jpg",
  // Things that should be removed should be split with ', '
  remove: "yellow dress.",
  replace:
    "Nike running sportwear, black sneakers, adidas white socks. Dress her like she's going to the gym. Add a bracelet.",
  negative:
    "she shouldn't be wearing a yellow dress. Don't remove any accessories.",
  email: process.env.EXPO_PUBLIC_EMAIL!,
  password: process.env.EXPO_PUBLIC_PASSWORD!,
}).then(() => console.log("done"));
