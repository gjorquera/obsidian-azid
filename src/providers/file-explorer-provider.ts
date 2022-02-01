import { AFItem, FileExplorer, FileItem, FolderItem, TFile } from 'obsidian';
import { Provider } from '.';

/**
 * Responsible for doing all transformations on the File Explorer.
 *
 * This provider transforms all items in the File Explorer in two different
 * ways:
 * - When the plugin is loaded or unloaded, it transforms all items, and
 * - When the metadata cache is updated, it transforms the given item.
 */
export class FileExplorerProvider extends Provider {
  refresh() {
    this.translateFileExplorer(this.toHeading.bind(this));
  }

  refreshFile(file: TFile) {
    const fileExplorer = this.app.getView('file-explorer') as FileExplorer;
    if (fileExplorer) {
      this.translateFile(fileExplorer, file);
    }
  }

  revert() {
    this.translateFileExplorer((item: FileItem) => {
      item.titleInnerEl.innerText = this.metadataCache.getBasename(item.file.path);
    });
  }

  private translateFileExplorer(translator: (item: FileItem) => void) {
    const fileExplorer = this.app.getView('file-explorer') as FileExplorer;
    if (fileExplorer) {
      this.translateFileItems(fileExplorer, translator);
    }
  }

  private translateFileItems(fileExplorer: FileExplorer, translator: (item: FileItem) => void) {
    const items = fileExplorer.fileItems;
    for (const key in items) {
      if (!Object.prototype.hasOwnProperty.call(items, key)) continue;
      const item = items[key];
      if (! this.isMarkdownFile(item)) continue;

      translator(item as FileItem);
    }
  }

  private toHeading(item: FileItem) {
    const path = item.file.path;
    item.titleInnerEl.innerHTML = this.settings.formatNoteDisplay(
      this.metadataCache.getBasename(path),
      this.metadataCache.getTitle(path),
      true);
  }

  private isMarkdownFile(item: AFItem): boolean {
    const file = (item as FolderItem).file;
    return (file instanceof TFile) && (file.extension == 'md');
  }

  private translateFile(fileExplorer: FileExplorer, file: TFile) {
    const item = fileExplorer.fileItems[file.path] as FileItem;
    if (item) {
      this.toHeading(item);
    }
  }
}
