# 版本发布流程 (Release Process)

本文件概述了发布 `nodejs-quickstart-structure` 新版本的步骤。

## 1. 更新变更日志 (Changelog)

在发布前，先更新 `CHANGELOG.md`：
1. 为新版本创建一个新标题 (例如 `## [1.4.6] - 2026-02-12`)。
2. 记录新增功能、缺陷修复和修改内容。
3. 保存文件。

## 2. 暂存变更日志

暂存 `CHANGELOG.md` 的更改，但如果您想将其包含在版本提升 commit 中，请**先不要 commit**。

```bash
git add CHANGELOG.md
```

## 3. 提升版本号与创建标签

运行相应的 `npm version` 命令。这假定您有一个干净的工作目录 (在暂存 `CHANGELOG.md` 之后)。

```bash
npm version patch   # 适用于缺陷修复 (1.4.5 -> 1.4.6)
npm version minor   # 适用于新功能 (1.4.5 -> 1.5.0)
npm version major   # 适用于重大变更/不兼容更改 (1.4.5 -> 2.0.0)
```

*注意：此命令会自动更新 `package.json`，创建一个包含新版本号的 git commit，并创建一个 git 标签 (例如 `v1.4.6`)。*

## 4. 推送更改与标签

将新 commit 和新标签推送到 GitHub：

```bash
git push origin main
git push origin --follow-tags
```

## 5. 发布到 NPM (可选)

如果您要将此包发布到 npm 注册表：

```bash
npm publish
```