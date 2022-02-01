import 'obsidian';

declare module 'obsidian' {

  // App

  export interface App {
    internalPlugins: InternalPlugins;
  }

  export interface InternalPlugins {
    getPluginById(id: string): InstalledPlugin;
  }

  export interface InstalledPlugin {
    enabled: boolean;
  }

  // FileExplorer

  export class FileExplorer extends View {
    fileItems: { [key: string]: AFItem };
    getViewType(): string;
    getDisplayText(): string;
  }

  export type AFItem = FolderItem | FileItem;

  export interface FileItem {
    file: TFile;
    titleInnerEl: HTMLDivElement;
  }

  export interface FolderItem {
    file: TFolder;
  }
}
