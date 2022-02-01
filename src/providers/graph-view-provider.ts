import { GraphView, GVNode, TFile } from 'obsidian';
import { Provider } from './provider';

/**
 * Responsible for doing all the transformations on the Graph View.
 *
 * This provider transforms all the nodes in the Graph View when it's loaded and
 * when the metadata cache is updated.
 */
export class GraphViewProvider extends Provider {
  refresh() {
    this.translateGraphView((node) => {
      return this.metadataCache.getTitle(node.id, false);
    });
  }

  refreshFile(file: TFile) {
    const graphView = this.getGraphView();
    if (graphView) {
      this.translateFile(graphView, file, (node) => {
        return this.metadataCache.getTitle(node.id, false);
      });
    }
  }

  revert() {
    this.translateGraphView((node) => {
      return this.metadataCache.getBasename(node.id);
    });
  }

  private translateGraphView(translator: (node: GVNode) => string) {
    const graphView = this.getGraphView();
    if (graphView) {
      this.translateNodes(graphView, translator);
    }
  }

  private getGraphView(): GraphView | null {
    if (!this.app.isPluginEnabled('graph')) {
      return null;
    }
    const graphView = this.app.getView('graph', 'localgraph') as GraphView;
    if (!graphView || !graphView.renderer) {
      return null;
    }
    return graphView;
  }

  private translateNodes(graphView: GraphView, translator: (node: GVNode) => string) {
    for (const node of graphView.renderer.nodes) {
      this.translateNode(node, translator);
    }
    graphView.renderer.onIframeLoad();
  }

  private translateNode(node: GVNode, translator: (node: GVNode) => string) {
      node.getDisplayText = () => translator(node);
      node.didSetTitle = true;
      node.initGraphics();
  }

  private translateFile(graphView: GraphView, file: TFile, translator: (node: GVNode) => string) {
    const node = graphView.renderer.nodeLookup[file.path];
    if (node) {
      this.translateNode(node, translator);
      graphView.renderer.onIframeLoad();
    }
  }
}
