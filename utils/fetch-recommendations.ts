import axios from "axios";

const baseUrl = "asos.com";

type AsosProduct = {
  name: string;
  colour: string;
  brandName: string;
  productType: string;
  url: string;
  imageUrl: string;
};

export type ProductInternal = {
  name: string;
  colour: string;
  brandName: string;
  productType: string;
  url: string;
  imageUrl: string;
};

function listProductPayload(productDescription: string) {
  return {
    method: "GET",
    url: "https://asos2.p.rapidapi.com/products/v2/list",
    params: {
      store: "US",
      offset: "0",
      q: productDescription,
      limit: "6",
      country: "US",
      sort: "freshness",
      currency: "USD",
      sizeSchema: "US",
      lang: "en-US",
    },
    headers: {
      "X-RapidAPI-Key": process.env.EXPO_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.EXPO_PUBLIC_RAPID_API_HOST,
    },
  };
}

export async function fetchRecommendations(
  productDescription: string
): Promise<ProductInternal[]> {
  const options = listProductPayload(productDescription);

  try {
    const response = await axios.request(options);
    const products = response.data.products as AsosProduct[];

    const output = products.map((product) => {
      return {
        name: product.name,
        colour: product.colour,
        brandName: product.brandName,
        productType: product.productType,
        url: `${baseUrl}/${product.url}`,
        imageUrl: product.imageUrl,
      };
    });
    console.log(output);
    return output;
  } catch (error) {
    console.error(error);
    return [];
  }
}
