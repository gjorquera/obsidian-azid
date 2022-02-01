export class AzidSettings {
  formatNoteDisplay(basename: string, title: string | null, html: boolean) {
    if (html) {
      return `[${basename}]<br /><small>${title || '---'}</small>`;
    } else {
      if (title) {
        return `[${basename}]\n${title}`;
      } else {
        return `[${basename}]`;
      }
    }
  }
}
