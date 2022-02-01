import { Plugin, TFile } from 'obsidian';
import { AzidSettings } from './settings';
import * as p from './providers';

export default class AzidPlugin extends Plugin {
  private settings = new AzidSettings();

  private providers: p.Provider[] = [
    new p.FileExplorerProvider(this, this.settings),
    new p.GraphViewProvider(this, this.settings),
    new p.NewNoteProvider(this, this.settings),
  ];

  onload() {
    // Initialize
    this.app.workspace.onLayoutReady(() => {
      this.providers.forEach((provider: p.Provider) => {
        provider.refresh();
      });
    });

    // Reguster layout change callbacks
    this.registerEvent(this.app.workspace.on('layout-change', () => {
      this.providers.forEach((provider: p.Provider) => {
        provider.refresh();
      });
    }));

    // Register MetadataCache update callbacks
    this.registerEvent(this.app.metadataCache.on('changed', (file: TFile) => {
      this.providers.forEach((provider: p.Provider) => {
        provider.refreshFile(file);
      });
    }));
  }

  onunload() {
    this.providers.forEach((provider: p.Provider) => {
      provider.revert();
    });
  }
}
