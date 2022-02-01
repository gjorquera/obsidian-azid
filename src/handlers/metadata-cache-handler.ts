import { Plugin } from 'obsidian';
import * as path from 'path';

export class MetadataCacheHandler {
  constructor(private plugin: Plugin) {
  }

  getTitle(filename: string, html: boolean): string {
    const basename = this.getBasename(filename);
    const cache = this.plugin.app.metadataCache.getCache(filename);

    if (cache == undefined || cache.headings == undefined || cache.headings.length == 0) {
      return this.formatTitle(basename, null, html);
    } else {
      return this.formatTitle(basename, cache.headings[0].heading, html);
    }
  }

  getBasename(filename: string) {
    return path.basename(filename, '.md');
  }

  private formatTitle(basename: string, title: string | null, html: boolean) {
    if (html) {
      return `[${basename}]<br /><small>${title || '---'}</small>`;
    } else {
      if (title) {
        return `[${basename}]\n${title}`;
      } else {
        return `[${basename}]`;
      }
    }
  }
}
