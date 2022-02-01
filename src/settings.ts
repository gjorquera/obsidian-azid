import { PluginSettingTab, Setting, TextComponent } from 'obsidian';
import { sanitizeToHtml, sanitizeToPlain } from './utils/sanitizer';
import AzidPlugin from './plugin';

interface AzidSettingsData {
  newNoteFormat: string;
  htmlUntitled: string;
  plainUntitled: string;
  htmlDisplayFormat: string;
  plainDisplayFormat: string;
}

const DEFAULT_HTML_UNTITLED = '<i>Untitled</i>';
const DEFAULT_HTML_DISPLAY_FORMAT = '{{title}}<br />[{{basename}}]';

const DEFAULTS: Partial<AzidSettingsData> = {
  newNoteFormat: '{{azid}}',
  htmlUntitled: sanitizeToHtml(DEFAULT_HTML_UNTITLED),
  plainUntitled: sanitizeToPlain(DEFAULT_HTML_UNTITLED),
  htmlDisplayFormat: sanitizeToHtml(DEFAULT_HTML_DISPLAY_FORMAT),
  plainDisplayFormat: sanitizeToPlain(DEFAULT_HTML_DISPLAY_FORMAT),
};

export class AzidSettings extends PluginSettingTab {
  private settings: AzidSettingsData;

  constructor(private plugin: AzidPlugin) {
    super(plugin.app, plugin);
  }

  async load() {
    this.settings = Object.assign(
      {}, DEFAULTS, await this.plugin.loadData()) as AzidSettingsData;
  }

  async save() {
    await this.plugin.saveData(this.settings);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName('New note format')
      .setDesc(`The format to use when renaming new notes. Available
               variables: {{azid}}.`)
      .addText(
        (text: TextComponent) => text
          .setPlaceholder(DEFAULTS.newNoteFormat || '')
          .setValue(this.settings.newNoteFormat)
          .onChange(async (value: string) => {
            this.settings.newNoteFormat = value;
            await this.save();
          }));

    new Setting(containerEl)
      .setName('Untitled value')
      .setDesc(`The value to use for the {{title}} variable when the note
               doesn't have a title. Allows most inline HTML tags.`)
      .addText(
        (text: TextComponent) => text
          .setPlaceholder(DEFAULTS.htmlUntitled || '')
          .setValue(this.settings.htmlUntitled)
          .onChange(async (value: string) => {
            this.settings.htmlUntitled = value;
            await this.save();
          }));

    new Setting(containerEl)
      .setName('Note display format')
      .setDesc(`Format settings to display a note in different panels given its
               variables. Available variables: {{basename}} and {{title}}.
               Allows most inline HTML tags, including <br />.`)
      .addText(
        (text: TextComponent) => text
          .setPlaceholder(DEFAULTS.htmlDisplayFormat || '')
          .setValue(this.settings.htmlDisplayFormat)
          .onChange(async (value: string) => {
            this.settings.htmlDisplayFormat = sanitizeToHtml(value);
            this.settings.plainDisplayFormat = sanitizeToPlain(value);
            await this.save();
          }));
  }

  hide(): void {
    this.plugin.refresh();
  }

  formatNoteAzid() {
    const azid = this.randomAzid();
    return this.settings.newNoteFormat
      .replaceAll('{{azid}}', azid);
  }

  private randomAzid(): string {
    return Math.random().toString(36).slice(2, 5);
  }

  formatNoteDisplay(basename: string, title: string | null, html: boolean) {
    const template = this.template(html);
    const untitled = this.untitled(html);
    return template
      .replaceAll('{{basename}}', basename)
      .replaceAll('{{title}}', title || untitled);
  }

  private template(html: boolean): string {
    if (html) {
      return this.settings.htmlDisplayFormat;
    } else {
      return this.settings.plainDisplayFormat;
    }
  }

  private untitled(html: boolean): string {
    if (html) {
      return this.settings.htmlUntitled;
    } else {
      return this.settings.plainUntitled;
    }
  }
}
