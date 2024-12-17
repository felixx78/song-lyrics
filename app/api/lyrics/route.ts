import response from "@/app/helpers/response";
import { NextRequest } from "next/server";
import translate from "../translate";
import axios from "axios";
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  headless: true,
});

const getContentPage = async (url: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  const content = await page.content();
  await page.close();
  return content;
};

export async function GET(request: NextRequest) {
  const queryParams = request.nextUrl.searchParams;
  const lang = queryParams.get("lang") || "en";
  const url = queryParams.get("url");

  if (!url) return response("no url", 400);

  let songPage = "";
  try {
    const response = await getContentPage(url);
    console.log(response);
    songPage = response;
  } catch (e: any) {
    console.log(e.response);
    console.log(e.toJSON());
  }

  const preloadedState = songPage
    .slice(songPage.indexOf("window.__PRELOADED_STATE__"))
    .replaceAll('\\"', '"');

  const match = /"html":"(.+?)",/.exec(preloadedState);

  // removing "html" and ", in end:
  const html = match ? match[0].slice(8, -2) : "";

  const lyrics = html
    .replace(/<\/?[^>]+(>|$)/g, "") // remove HTML tags
    .replace(/\\\\n/g, "\n") // replace `\n` with actual new lines
    .replace(/\\'/g, "'") // replace escaped single quotes
    .replace(/\\"/g, '"') // replace escaped double quotes
    .replace(/\\\"/g, '"')
    .replace(/&amp;/g, "&"); // decode `&`

  const translated = await translate(lyrics, "auto", lang);

  return response({ lyrics, translated });
}
