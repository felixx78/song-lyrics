/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable-next-line @typescript-eslint/no-unused-expressions */

import axios from "axios";
const token = require("google-translate-token");

async function translate(text, from, to) {
  const { value: tk } = await token.get(text);
  const url = new URL("https://translate.googleapis.com/translate_a/single");

  url.searchParams.append("client", "gtx");
  url.searchParams.append("sl", from);
  url.searchParams.append("tl", to);
  url.searchParams.append("hl", to);
  url.searchParams.append("ie", "UTF-8");
  url.searchParams.append("oe", "UTF-8");
  url.searchParams.append("otf", "1");
  url.searchParams.append("ssel", "0");
  url.searchParams.append("tsel", "0");
  url.searchParams.append("kc", "7");
  url.searchParams.append("q", text);
  url.searchParams.append("tk", tk);
  ["at", "bd", "ex", "ld", "md", "qca", "rw", "rm", "ss", "t"].forEach(
    (param) => url.searchParams.append("dt", param)
  );

  try {
    const response = await axios.get(url.toString());
    if (
      response.data &&
      Array.isArray(response.data[0]) &&
      response.data[0].length > 0
    ) {
      const translatedText = response.data[0].map((item) => item[0]).join("");
      return translatedText;
    } else {
      console.error("Unexpected response format or empty data:", response.data);
      throw new Error("Translation failed or returned empty data");
    }
  } catch (error) {
    console.error("Error during translation request:", error);
    throw new Error("Translation failed");
  }
}

export default translate;
