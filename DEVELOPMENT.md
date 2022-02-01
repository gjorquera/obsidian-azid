# Developer Guide

## Versioning Strategy

The version numbers follow [Semantic Versioning][semver]. Releases are
versioned, not commits themselves. Therefore, use tags to figure out the actual
releases, not the `version` field in the `manifest.json` file of a given commit.

## Releasing a New Version

1. Run `npm run release` to create the commit for the next release.
1. Make sure `versions.json` is updated for the new version.
1. Amend the release commit with the `version.json` changes.
1. Run `npm run tag` to create the release tag.
1. Run `git push --follow-tags origin main` to push the release.

[semver]: https://semver.org/
