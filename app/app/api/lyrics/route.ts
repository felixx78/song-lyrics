import response from "@/app/helpers/response";
import { NextRequest } from "next/server";
import axios from "axios";
import translate from "@iamtraction/google-translate";

export async function GET(request: NextRequest) {
  const queryParams = request.nextUrl.searchParams;
  const lang = queryParams.get("lang") || "en";
  const url = queryParams.get("url");

  if (!url) return response("no url", 400);

  const { data: songPage } = (await axios.get(url)) as { data: string };

  const preloadedState = songPage
    .slice(songPage.indexOf("window.__PRELOADED_STATE__"))
    .replaceAll('\\"', '"');

  const match = /"html":"(.+?)"/.exec(preloadedState.replaceAll('\\"', '"'));

  // removing "html":
  const html = match ? match[0].slice(8, -1) : "";

  const lyrics = html
    .replace(/<\/?[^>]+(>|$)/g, "") // remove HTML tags
    .replace(/\\\\n/g, "\n") // replace `\n` with actual new lines
    .replace(/\\'/g, "'") // replace escaped single quotes
    .replace(/&amp;/g, "&"); // decode `&`

  const {
    text: translated,
    from: { language },
  } = await translate(lyrics, {
    from: "auto",
    to: lang,
  });

  return response({ lyrics, translated, from: language.iso });
}
