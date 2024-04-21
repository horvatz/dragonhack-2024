# FashionBuddy :tshirt:

_Dragonhack 2024 project by Rakete (Tim Vučina, Tjaž Eržen and Žan Horvat)_

Virtual fashion assistant mobile app, designed to provide friendly and personalized style advice with AI.

- User can **upload an image** of their **outfit** and **ocassion**
- Assistant will **rate it** (based on provided ocassion) offering feedback on style
- Assistant will also provide **recommendations** to improve style
  - Recommendations are provided with products from [ASOS webstore](https://www.asos.com/)

![Demo Gif](/docs/FashionBuddy%20-%20Demo.gif)

## Technologies used :books:

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [NativeWind](https://www.nativewind.dev/) (for styling)
- [Supabase](https://supabase.com/) (for image bucket store)
- [react-native-gen-ui](https://github.com/zerodays/react-native-gen-ui)

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

## Project structure :file_folder:

A well-organized project structure is essential for efficient development.
We are using following layout:

```
- app           # App screens or layout
- assets        # Static files lives here (icons, images, etc..)
- components    # UI components
-dump           # Map for ASOS webstore categories
- parser        # Parsing stuff for webstore products
- utils         # Helper functions and API calls
```

## Architecture :triangular_ruler:

### Flow

1. Get image of **user outfit**
2. Send the image data to Supabase bucket for storage, process image with OpenAI API
3. Get rating for user outfit, get outift recommendations using **OpenAI Functions** and external API call
4. Display the results and recommendations in the app's UI (using Generative UI) for the user to view and interact with.

### Diagram

![Architecture diagram](/docs/FashionBuddy%20-%20Diagram.png)
