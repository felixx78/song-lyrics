/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable-next-line @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-require-imports */

import axios from "axios";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function translate(text, from, to) {
  const tk = await get(text);
  const url = new URL("https://translate.google.com/translate_a/single");

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

  let data;

  for (let i = 0; i < 3; i++) {
    try {
      const response = await axios.get(url.toString());
      data = response.data;
      break;
    } catch (_) {
      if (i < 2) await sleep(2000);
    }
  }

  if (data && Array.isArray(data[0]) && data[0].length > 0) {
    const translated = data[0].map((i) => i[0]).join("");
    return translated;
  }

  throw new Error("Translation failed");
}

/**
 * Last update: 2016/06/26
 * https://translate.google.com/translate/releases/twsfe_w_20160620_RC00/r/js/desktop_module_main.js
 *
 * Everything between 'BEGIN' and 'END' was copied from the url above.
 */

const config = { TKK: "0" };

/* eslint-disable */
// BEGIN

function sM(a) {
  var b;
  if (null !== yr) b = yr;
  else {
    b = wr(String.fromCharCode(84));
    var c = wr(String.fromCharCode(75));
    b = [b(), b()];
    b[1] = c();
    b = (yr = config[b.join(c())] || "") || "";
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

var yr = null;
var wr = function (a) {
    return function () {
      return a;
    };
  },
  xr = function (a, b) {
    for (var c = 0; c < b.length - 2; c += 3) {
      var d = b.charAt(c + 2),
        d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d),
        d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
      a = "+" == b.charAt(c) ? (a + d) & 4294967295 : a ^ d;
    }
    return a;
  };

// END
/* eslint-enable */

function updateTKK() {
  return new Promise(function (resolve, reject) {
    var now = Math.floor(Date.now() / 3600000);

    if (Number(config.TKK.split(".")[0]) === now) {
      resolve();
    } else {
      axios
        .get("https://translate.google.com")
        .then(function (res) {
          var code = res.data.match(/TKK=(.*?)\(\)\)'\);/g);

          if (code) {
            eval(code[0]);
            /* eslint-disable no-undef */
            if (typeof config.TKK !== "undefined") {
              config.TKK = TKK;
            }
            /* eslint-enable no-undef */
          }

          /**
           * Note: If the regex or the eval fail, there is no need to worry. The server will accept
           * relatively old seeds.
           */

          resolve();
        })
        .catch(function (err) {
          var e = new Error();
          e.code = "BAD_NETWORK";
          e.message = err.message;
          reject(e);
        });
    }
  });
}

function get(text) {
  return updateTKK()
    .then(function () {
      var tk = sM(text);
      tk = tk.replace("&tk=", "");
      return tk;
    })
    .catch(function (err) {
      throw err;
    });
}

export default translate;
