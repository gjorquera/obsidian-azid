<!-- PROJECT LOGO -->
<h1 align="center">
  <br />
  <img src="images/acid.png" alt="Obsidian Azid" width="128">
  <br />
  Obsidian Azid
  <br />
</h1>
<p align="center"><em>Manage alphanumeric Zettelkasten IDs filenames.</em></p>

## About the Project

Using [alefore@'s excellent alphanumeric Zettelkasten IDs idea][alefore-zk] and
standing on the shoulders of giants like [Obsidian][obsidian] and the
[zettelkasten.de community][zk-de], Obsidian Azid is an Obsidian plugin to make
it easier to interact with files named using alphanumeric Zettelkasten IDs.

### What is "azid"?

Obsidian Azid refers to an "alphanumeric Zettelkasten ID" and "alphanumeric
Zettelkasten IDs" as "azid" and "azids".

### Why azids instead of YYYYMMDDHHMMSS Zettelkasten IDs?

Simply because I find that I can remember three alphanumeric characters a lot
easier than 14 numbers and I can type them faster than using the mouse to
copy/paste the 14 numbers ID.

### Features

- New notes are named with a random azid that's unique within your Vault.
- Display Markdown titles and azid within your notes in the File Explorer and
  Graph View.

## Getting Started

### Manual Installation

1. Download `obsidian-azid-<version>.zip` from [releases][releases].
1. Unzip `obsidian-azid-<version>.zip` in your Vault's `.obsidian/plugins/`
   folder.
1. Restart Obsidian to reload the available plugins.
1. Enable the "Azid" plugin.

## Usage

Obsidian Azid works right out of the box. No new commands and no new panels.

After you activate Obsidian Azid, you'll notice that:

1. Creating new notes automatically get a new azid:

TODO Add gif.

2. Your File Explorer now shows note titles and azids:

TODO Add gif.

3. The Graph View also shows note titles and azids:

TODO Add gif.

4. And, of course, updating the notes' titles is reflected in the File Explorer
   and Graph View:

TODO Add gif.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Acknowledgments

- [Best-README-Template][readme-template] - README style and structure.
- [Collapse All Obsidian Plugin][collapse-all] - Obsidian plugin I used to mimic
  the code structure.
- [Freepik (Flaticon)][icon] - Acid flask icon.
- [Obsidian File Explorer Markdown Titles][markdown-titles] - Obsidian plugin
  that I used as base.
- [Obsidian][obsidian] - Awesome Markdown-aware knowledge base manager.
- [Zettelkasten by alefore@][alefore-zk] - Alphanumeric Zettelkasten IDs.

[alefore-zk]: https://github.com/alefore/weblog/blob/master/zettelkasten.md
[collapse-all]: https://github.com/OfficerHalf/obsidian-collapse-all
[icon]: https://www.flaticon.com/free-icons/acid
[markdown-titles]: https://github.com/Dyldog/file-explorer-markdown-titles
[obsidian]: https://obsidian.md/
[readme-template]: https://github.com/othneildrew/Best-README-Template
[releases]: https://github.com/gjorquera/obsidian-azid/releases
[zk-de]: https://zettelkasten.de/
