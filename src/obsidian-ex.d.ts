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

  // GraphView

  export class GraphView extends View  {
    renderer: GVRenderer;
    getViewType(): string;
    getDisplayText(): string;
  }

  export interface GVRenderer {
    nodes: GVNode[];
    nodeLookup: { [key: string]: GVNode };
    onIframeLoad(): void;
  }

  export interface GVNode {
    id: string;
    didSetTitle: boolean;
    getDisplayText: () => string;
    initGraphics(): void;
  }
}
