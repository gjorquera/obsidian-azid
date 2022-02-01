import { Plugin } from 'obsidian';
import * as path from 'path';

export class MetadataCacheHandler {
  constructor(private plugin: Plugin) {
  }

  getTitle(filename: string): string | null {
    const cache = this.plugin.app.metadataCache.getCache(filename);

    if (cache != undefined && cache.headings != undefined && cache.headings.length > 0) {
      return cache.headings[0].heading;
    } else {
      return null;
    }
  }

  getBasename(filename: string) {
    return path.basename(filename, '.md');
  }
}
