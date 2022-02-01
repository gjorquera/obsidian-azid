import { AppHandler, MetadataCacheHandler } from '../handlers';
import { Plugin, TFile } from 'obsidian';

/**
 * Defines the callbacks that a provider must implement.
 */
export abstract class Provider {
  protected app: AppHandler;
  protected metadataCache: MetadataCacheHandler;

  constructor(protected plugin: Plugin) {
    this.app = new AppHandler(this.plugin);
    this.metadataCache = new MetadataCacheHandler(this.plugin);
  }

  /**
   * Forces a complete refresh.
   *
   * This callback is to let the provider know that it must refresh everything
   * it manages. This happens, for example, when the plugin is enabled or when
   * the layout changes.
   */
  abstract refresh(): void;

  /**
   * Forces the refresh of a given file.
   *
   * This callback is to let the provider know that it must refresh a given
   * file. This happens, for example, when the MetadataCache changes.
   *
   * Callbacks due to MetadataCache may have a couple hundred milliseconds of
   * delay from Editor, Vault, or file system changes.
   */
  abstract refreshFile(file: TFile): void;

  /**
   * Forces reverting all transformations.
   *
   * This callback is to let the provider know that it must revert all display
   * transformations. This happens, for example, when the plugin is disabled.
   */
  abstract revert(): void;
}
