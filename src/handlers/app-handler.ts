import { Plugin, View } from 'obsidian';

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
}
