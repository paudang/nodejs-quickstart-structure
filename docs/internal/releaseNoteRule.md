# Release Process

This document outlines the steps to release a new version of `nodejs-quickstart-structure`.

## 1. Update Changelog

Before releasing, update `CHANGELOG.md`:
1.  Create a new header for the new version (e.g., `## [1.4.6] - 2026-02-12`).
2.  Document new features, bug fixes, and changes.
3.  Save the file.

## 2. Commit Changelog

Stage the `CHANGELOG.md` changes but **do not commit yet** if you want to include it in the version bump commit.
```bash
git add CHANGELOG.md
```

## 3. Bump Version & Tag

Run the appropriate `npm version` command. This will assume you have a clean working directory (after staging `CHANGELOG.md`).
```bash
npm version patch   # For bug fixes (1.4.5 -> 1.4.6)
npm version minor   # For new features (1.4.5 -> 1.5.0)
npm version major   # For breaking changes (1.4.5 -> 2.0.0)
```
*Note: This command automatically updates `package.json`, creates a git commit with the new version number, and creates a git tag (e.g., `v1.4.6`).*

## 4. Push Changes & Tags

Push the new commit and the new tag to GitHub:
```bash
git push origin main
git push origin --follow-tags
```

## 5. Publish to NPM (Optional)

If you are publishing this package to the npm registry:
```bash
npm publish
```
