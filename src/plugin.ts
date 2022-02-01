import { Plugin, TFile } from 'obsidian';
import { AzidSettings } from './settings';
import * as p from './providers';

export default class AzidPlugin extends Plugin {
  private settings = new AzidSettings(this);

  private providers: p.Provider[] = [
    new p.FileExplorerProvider(this, this.settings),
    new p.GraphViewProvider(this, this.settings),
    new p.NewNoteProvider(this, this.settings),
  ];

  async onload() {
    // Load settings
    await this.settings.load();
    this.addSettingTab(this.settings);

    // Initialize providers
    this.app.workspace.onLayoutReady(() => {
      this.refresh();
    });

    // Reguster layout change callbacks
    this.registerEvent(this.app.workspace.on('layout-change', () => {
      this.refresh();
    }));

    // Register MetadataCache update callbacks
    this.registerEvent(this.app.metadataCache.on('changed', (file: TFile) => {
      this.providers.forEach((provider: p.Provider) => {
        provider.refreshFile(file);
      });
    }));
  }

  refresh() {
    this.providers.forEach((provider: p.Provider) => {
      provider.refresh();
    });
  }

  onunload() {
    this.providers.forEach((provider: p.Provider) => {
      provider.revert();
    });
  }
}
