# Fashion clothing assistant :tshirt:

_Dragonhack 2024 project by Rakete (Tim Vučina, Tjaž Eržen and Žan Horvat)_

Virtual fashion assistant mobile app, designed to provide friendly and personalized style advice.

- User can **upload an image** of their **outfit** and **ocassion**
- Assistant will **rate it** (based on provided ocassion) offering feedback on style
- Assistant will also provide **recommendations** to improve style
  - Recommendations are provided with products from [ASOS webstore](https://website-name.com)

## Technologies used :books:

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [NativeWind](https://www.nativewind.dev/) (for styling)
- [Supabase](https://supabase.com/) (for image bucket store)

## APIs used :earth_americas:

- [OpenAI API](https://openai.com/): for ChatGPT assistant
- [Rapid API](https://rapidapi.com/): for [ASOS webstore](https://www.asos.com/) product recommendations
- [The New Black AI API](https://thenewblack.ai/): for creating user Fashion designs

## Getting started :hammer:

Before you begin, add following environment variables to `.env`:

```bash
EXPO_PUBLIC_OPENAI_API_KEY=<your_openai_api_key>
EXPO_PUBLIC_RAPID_API_KEY=<rapid_api_key>
EXPO_PUBLIC_RAPID_API_HOST=<rapid_api_host>
EXPO_PUBLIC_EMAIL=<your_auth_for_rapi_api>
EXPO_PUBLIC_PASSWORD=<your_auth_for_rapi_api>
EXPO_PUBLIC_SUPABASE_URL=<your_supabase_url>
EXPO_PUBLIC_SUPABASE_KEY=<your_supabase_key>
```

Install dependencies:

```bash
yarn install
```

To run app use:

```bash
yarn ios        # To run app on iOS
yarn android    # To run app on Android
yarn start      # To test app with Expo
```

## Architecture :triangular_ruler:

TODO
