import axios from 'axios';
import puppeteer from 'puppeteer';
import { pageOption, browserOption } from '../config/puppeteer';
import ErrorMessage from '../constants/errorMsg';

class HTMLPaser {
  public async getHTML(URL: string, browserControll: boolean = false): Promise<string> {
    try {
      let HTML = '';
      if (browserControll) HTML = await this._getHtmlByBrowser(URL);
      if (!browserControll) HTML = await this._getHtmlByAxios(URL);
      return HTML;
    } catch (error) {
      throw new Error('INVEN ERROR');
    }
  }

  private _getHtmlByAxios = async (URL: string) => {
    try {
      const { data }: { data: string } = await axios.get(URL);
      return data;
    } catch (error) {
      throw new Error(ErrorMessage.UPSTREAM_ERROR);
    }
  };

  private async _getHtmlByBrowser(URL: string) {
    let page: puppeteer.Page, browser: puppeteer.Browser, html: string, response: puppeteer.HTTPResponse;
    try {
      browser = await puppeteer.launch(browserOption);
      page = await browser.newPage();
      response = await page.goto(URL, pageOption);
      html = await response.text();
    } catch (error) {
      throw error;
    } finally {
      await page!.close();
      await browser!.close();
      return html!;
    }
  }
}

export default HTMLPaser;
