import { Plugin, TFile, View } from 'obsidian';
import * as path from 'path';

export class AppHandler {
  constructor(private plugin: Plugin) {
  }

  isPluginEnabled(nameId: string): boolean {
    return (!!this.plugin.app.internalPlugins.getPluginById(nameId));
  }

  getView(...types: string[]): View | null {
    for (const type of types) {
      const leaves = this.plugin.app.workspace.getLeavesOfType(type);
      for (const leaf of leaves) {
        if (leaf.view.getViewType() == type) {
          return leaf.view;
        }
      }
    }
    return null;
  }

  async renameBasename(file: TFile, newBasename: string) {
    const dirname = path.dirname(file.path);
    const newPath = path.join(dirname, `${newBasename}.${file.extension}`);
    await this.plugin.app.vault.rename(file, newPath);
  }
}
