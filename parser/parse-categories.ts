import * as categories from "./list-categories.json";
import * as fs from "fs";

async function main() {
  const ignoreInfoRec = [
    "app and mobile top level",
    "brands",
    "your favorite brands",
    "face + body",
    "topman",
    "sale",
    "tailoring",
    "activewear",
    "accessories",
    "outlet",
    "plus size",
    "topshop",
    "shoes",
  ];

  const ignoreKeywords = ["clothing", "shop by product", "categories"];

  const categoryNameToCategoryId = new Map<string, number>();
  function parseCategoriesRec(
    categoryName: string,
    navigationChild: NavigationChild
  ) {
    const currentTitle = navigationChild.content.title.toLowerCase();
    let currentCategoryName;
    if (categoryName === "") {
      currentCategoryName = currentTitle;
    } else {
      currentCategoryName = `${categoryName} - ${currentTitle}`;
    }

    for (let ignore of ignoreInfoRec) {
      if (currentCategoryName.toLowerCase().includes(ignore)) {
        return;
      }
    }

    const categoryId = navigationChild.link?.categoryId;
    currentCategoryName = currentCategoryName.toLowerCase();
    if (categoryId) {
      if (currentCategoryName.includes("shop by product")) {
        const keywords = currentCategoryName.split(" - ");
        const newKeywords = keywords.filter(
          (keyword) => !ignoreKeywords.includes(keyword)
        );
        currentCategoryName = newKeywords.join(" - ");
        categoryNameToCategoryId.set(currentCategoryName, categoryId);
      }
    }
    for (const child of navigationChild.children) {
      parseCategoriesRec(currentCategoryName, child);
    }
    // const val = navigationChild.content.title;
  }
  for (const navigationChild of categories.navigation) {
    parseCategoriesRec("", navigationChild);
  }
  // stringify map so it is of form { "key": value }
  const value = JSON.stringify(
    Array.from(categoryNameToCategoryId.entries()).reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, number>
    ),
    null,
    2
  );

  fs.writeFileSync("./dump/categories.json", value);
}

main().then(() => console.log("done"));

type ContentNavigation = {
  title: string;
};

type ContentLink = {
  linkType: string | null;
  categoryId: number | null;
  webUrl: string | null;
};

type NavigationChild = {
  id: string;
  alias: string | null;
  content: ContentNavigation;
  link: ContentLink | null;
  children: NavigationChild[];
};
