import response from "@/app/helpers/response";
import { NextRequest } from "next/server";
import axios from "axios";
import translate from "../translate";

const proxies =
  process.env?.PROXIES &&
  JSON.parse(process.env.PROXIES).map((i: any) => ({
    ...i,
    protocol: "http",
  }));

let currentProxyIndex = 0;

export async function GET(request: NextRequest) {
  const queryParams = request.nextUrl.searchParams;
  const lang = queryParams.get("lang") || "en";
  const url = queryParams.get("url");

  if (!url) return response("no url", 400);

  let startIndex = currentProxyIndex;
  let songPage = "";
  do {
    try {
      const { data } = await axios.get(url, {
        proxy: proxies ? proxies[1] : undefined,
      });
      songPage = data;
    } catch (e) {
      if (currentProxyIndex + 1 === proxies?.length) currentProxyIndex = 0;
      else currentProxyIndex++;
    }
  } while (currentProxyIndex !== startIndex);

  if (!songPage) throw Error("Failed fetch song page");

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
