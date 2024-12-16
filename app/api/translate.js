/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable-next-line @typescript-eslint/no-unused-expressions */

import axios from "axios";

let vm = {};

function sM(a, TTK) {
  vm.x = a;

  if (TTK) {
    vm.internalTTK = TTK;
  } else {
    vm.internalTTK = "0";
  }

  const result = eval(`
        function sM(a) {
            var b;
            if (null !== yr)
                b = yr;
            else {
                b = wr(String.fromCharCode(84));
                var c = wr(String.fromCharCode(75));
                b = [b(), b()];
                b[1] = c();
                b = (yr = window[b.join(c())] || "") || ""
            }
            var d = wr(String.fromCharCode(116))
                , c = wr(String.fromCharCode(107))
                , d = [d(), d()];
            d[1] = c();
            c = "&" + d.join("") + "=";
            d = b.split(".");
            b = Number(d[0]) || 0;
            for (var e = [], f = 0, g = 0; g < a.length; g++) {
                var l = a.charCodeAt(g);
                128 > l ? e[f++] = l : (2048 > l ? e[f++] = l >> 6 | 192 : (55296 == (l & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512) ? (l = 65536 + ((l & 1023) << 10) + (a.charCodeAt(++g) & 1023),
                    e[f++] = l >> 18 | 240,
                    e[f++] = l >> 12 & 63 | 128) : e[f++] = l >> 12 | 224,
                    e[f++] = l >> 6 & 63 | 128),
                    e[f++] = l & 63 | 128)
            }
            a = b;
            for (f = 0; f < e.length; f++)
                a += e[f],
                    a = xr(a, "+-a^+6");
            a = xr(a, "+-3^+b+-f");
            a ^= Number(d[1]) || 0;
            0 > a && (a = (a & 2147483647) + 2147483648);
            a %= 1E6;
            return c + (a.toString() + "." + (a ^ b))
        }

        var yr = null;
        var wr = function(a) {
            return function() {
                return a
            }
        }
            , xr = function(a, b) {
            for (var c = 0; c < b.length - 2; c += 3) {
                var d = b.charAt(c + 2)
                    , d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d)
                    , d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
                a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d
            }
            return a
        };
        
        var window = {
            TKK: vm.internalTTK
        };

        sM(a)
    `);

  return result;
}

async function updateTTK(TTK) {
  const t = Math.floor(Date.now() / 3600000);
  const now = Math.floor(t);
  const ttk = parseFloat(TTK);

  if (ttk === now) {
    return TTK;
  }

  try {
    const response = await axios.get(`https://translate.google.com`);
    const body = response.data;

    const matches = body.match(/tkk:\s?'(.+?)'/);
    if (matches && matches.length > 1) {
      return matches[1];
    }
  } catch (error) {
    console.error(error);
  }

  return TTK;
}

async function get(text, ttk) {
  ttk = await updateTTK(ttk);
  const tk = await sM(text, ttk);

  if (!tk) {
    return "";
  }
  const sTk = tk.replace("&tk=", "");
  return sTk;
}

async function translate(text, fromLang, toLang) {
  const tk = await get(encodeURIComponent(text), "0");
  console.log(tk);
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
