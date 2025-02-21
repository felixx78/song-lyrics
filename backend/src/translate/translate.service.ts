// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TranslateService {
  private config = { TKK: '0' };

  constructor(private readonly httpService: HttpService) {}

  // Sleep function
  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Translate function
  async translate(text: string, from: string, to: string): Promise<string> {
    const tk = await this.getToken(text);
    const url = new URL('https://translate.google.com/translate_a/single');

    url.searchParams.append('client', 'gtx');
    url.searchParams.append('sl', from);
    url.searchParams.append('tl', to);
    url.searchParams.append('hl', to);
    url.searchParams.append('ie', 'UTF-8');
    url.searchParams.append('oe', 'UTF-8');
    url.searchParams.append('otf', '1');
    url.searchParams.append('ssel', '0');
    url.searchParams.append('tsel', '0');
    url.searchParams.append('kc', '7');
    url.searchParams.append('q', text);
    url.searchParams.append('tk', tk);
    ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'].forEach((param) => url.searchParams.append('dt', param));

    let data;

    for (let i = 0; i < 3; i++) {
      try {
        const response = await firstValueFrom(this.httpService.get(url.toString()));
        data = response.data;
        break;
      } catch (_) {
        if (i < 2) await this.sleep(2000);
      }
    }

    if (data && Array.isArray(data[0]) && data[0].length > 0) {
      const translated = data[0].map((i) => i[0]).join('');
      return translated;
    }

    throw new Error('Translation failed');
  }

  // Function to update the TKK value
  private async updateTKK() {
    return new Promise<void>((resolve, reject) => {
      const now = Math.floor(Date.now() / 3600000);

      if (Number(this.config.TKK.split('.')[0]) === now) {
        resolve();
      } else {
        this.httpService
          .get('https://translate.google.com')
          .toPromise()
          .then((res) => {
            const code = res.data.match(/TKK=(.*?)\(\)\)'\);/g);

            if (code) {
              eval(code[0]);
              if (typeof config.TKK !== 'undefined') {
                this.config.TKK = TKK;
              }
            }
            resolve();
          })
          .catch((err) => {
            const e = new Error();
            e.message = err.message;
            reject(e);
          });
      }
    });
  }

  // Function to get the token (tk) for translation
  private async getToken(text: string): Promise<string> {
    await this.updateTKK();

    const tk = this.sM(text);
    return tk.replace('&tk=', '');
  }

  // Helper function to generate the token
  private sM(a: string): string {
    let b = this.config.TKK;
    const d = String.fromCharCode(116) + String.fromCharCode(107);

    b = b.split('.');
    const base = Number(b[0]) || 0;

    let e: number[] = [];
    for (let i = 0; i < a.length; i++) {
      let l = a.charCodeAt(i);
      if (l < 128) {
        e.push(l);
      } else {
        if (l < 2048) {
          e.push((l >> 6) | 192);
        } else {
          if (55296 === (l & 64512) && i + 1 < a.length && 56320 === (a.charCodeAt(i + 1) & 64512)) {
            l = 65536 + ((l & 1023) << 10) + (a.charCodeAt(++i) & 1023);
            e.push((l >> 18) | 240);
            e.push(((l >> 12) & 63) | 128);
          } else {
            e.push((l >> 12) | 224);
          }
          e.push(((l >> 6) & 63) | 128);
        }
        e.push((l & 63) | 128);
      }
    }

    a = b.join('');
    for (let f = 0; f < e.length; f++) {
      a += e[f];
      a = this.xr(a, '+-a^+6');
    }
    a = this.xr(a, '+-3^+b+-f');
    a ^= Number(b[1]) || 0;
    if (a < 0) {
      a = (a & 2147483647) + 2147483648;
    }

    a %= 1e6;
    return d + (a.toString() + '.' + (a ^ base));
  }

  // Helper function for sM
  private xr(a: string, b: string): string {
    for (let c = 0; c < b.length - 2; c += 3) {
      const d = b.charAt(c + 2);
      const dVal = 'a' <= d ? d.charCodeAt(0) - 87 : Number(d);
      const shifted = '+' === b.charAt(c + 1) ? a >>> dVal : a << dVal;
      a = '+' === b.charAt(c) ? (a + shifted) & 4294967295 : a ^ shifted;
    }
    return a;
  }
}
