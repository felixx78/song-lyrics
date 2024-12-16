/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable-next-line @typescript-eslint/no-unused-expressions */

import axios from "axios";

let yr = null;
const cache = {};

async function sM(a) {
  const wr = (char) => () => char;
  const xr = (a, b) => {
    for (let i = 0; i < b.length - 2; i += 3) {
      const d = b.charAt(i + 2);
      const val = "a" <= d ? d.charCodeAt(0) - 87 : Number(d);
      const shift = "+" === b.charAt(i + 1) ? a >>> val : a << val;
      a = "+" === b.charAt(i) ? (a + shift) & 4294967295 : a ^ shift;
    }
    return a;
  };

  var b;
  if (null !== yr) b = yr;
  else {
    b = wr(String.fromCharCode(84));
    var c = wr(String.fromCharCode(75));
    b = [b(), b()];
    b[1] = c();
    b = (yr = cache[b.join(c())] || "") || "";
  }
  var d = wr(String.fromCharCode(116)),
    c = wr(String.fromCharCode(107)),
    d = [d(), d()];
  d[1] = c();
  c = "&" + d.join("") + "=";
  d = b.split(".");
  b = Number(d[0]) || 0;
  for (var e = [], f = 0, g = 0; g < a.length; g++) {
    var l = a.charCodeAt(g);
    128 > l
      ? (e[f++] = l)
      : (2048 > l
          ? (e[f++] = (l >> 6) | 192)
          : (55296 == (l & 64512) &&
            g + 1 < a.length &&
            56320 == (a.charCodeAt(g + 1) & 64512)
              ? ((l = 65536 + ((l & 1023) << 10) + (a.charCodeAt(++g) & 1023)),
                (e[f++] = (l >> 18) | 240),
                (e[f++] = ((l >> 12) & 63) | 128))
              : (e[f++] = (l >> 12) | 224),
            (e[f++] = ((l >> 6) & 63) | 128)),
        (e[f++] = (l & 63) | 128));
  }
  a = b;
  for (f = 0; f < e.length; f++) (a += e[f]), (a = xr(a, "+-a^+6"));
  a = xr(a, "+-3^+b+-f");
  a ^= Number(d[1]) || 0;
  0 > a && (a = (a & 2147483647) + 2147483648);
  a %= 1e6;
  return c + (a.toString() + "." + (a ^ b));
}

async function updateTTK(TTK) {
  const now = Math.floor(Date.now() / 3600000);
  if (TTK === now) return TTK;

  try {
    const response = await axios.get(`https://translate.google.com`);
    const matches = response.data.match(/tkk:\s?'(.+?)'/);
    return matches && matches[1] ? matches[1] : TTK;
  } catch (error) {
    console.error("Error fetching TTK:", error);
    return TTK;
  }
}

async function getToken(text, ttk) {
  ttk = await updateTTK(ttk);
  return await sM(text, ttk);
}

async function translate(text, fromLang, toLang) {
  const tk = getToken(encodeURIComponent(text), "0");
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&tk=${tk}&hl=${toLang}&dt=t&q=${encodeURIComponent(
    text
  )}`;
  try {
    const response = await axios.get(url);
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
