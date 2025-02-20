import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Mutex } from 'async-mutex';
import { connect, PageWithCursor } from 'puppeteer-real-browser';

@Injectable()
export class SongsService implements OnModuleInit, OnModuleDestroy {
  private closeBrowser: () => Promise<void>;
  private page: PageWithCursor;
  private mutex = new Mutex();

  async onModuleInit() {
    const puppeteer = await connect({ headless: false });
    this.page = puppeteer.page;
    this.closeBrowser = puppeteer.browser.close;
  }

  async getLyrics(url: string) {
    return this.mutex.runExclusive(async () => {
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });

      const pageContent = await this.page.content();
      const preloadedState = pageContent.slice(pageContent.indexOf('window.__PRELOADED_STATE__')).replaceAll('\\"', '"');

      const match = /"html":"(.+?)",/.exec(preloadedState);

      // removing "html" and ", in end:
      const html = match ? match[0].slice(8, -2) : '';

      const lyrics = html
        .replace(/<\/?[^>]+(>|$)/g, '') // remove HTML tags
        .replace(/\\\\n/g, '\n') // replace `\n` with actual new lines
        .replace(/\\'/g, "'") // replace escaped single quotes
        .replace(/\\"/g, '"') // replace escaped double quotes
        .replace(/\\\"/g, '"')
        .replace(/&amp;/g, '&'); // decode `&`

      return lyrics;
    });
  }

  async onModuleDestroy() {
    await this.closeBrowser();
  }
}
