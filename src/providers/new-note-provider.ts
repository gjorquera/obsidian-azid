import { Notice, TFile } from 'obsidian';
import { Provider } from '.';

/**
 * Responsible for renaming new notes with a random azid.
 */
export class NewNoteProvider extends Provider {
  refresh() {
    // Do nothing.
  }

  async refreshFile(file: TFile) {
    if (!file.basename.startsWith('Untitled') || file.extension != 'md') {
      return;
    }

    const maxAttempts = 3;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      if (await this.safeRenameToRandomAzid(file)) {
        return;
      }
    }

    new Notice(`Failed to find a random azid (attempts=${maxAttempts})`);
  }

  revert() {
    // Do nothing.
  }

  private async safeRenameToRandomAzid(file: TFile): Promise<boolean> {
    try {
      await this.app.renameBasename(file, this.settings.formatNoteAzid());
      return true;
    } catch (err) {
      return false;
    }
  }
}
