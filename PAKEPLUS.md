# PakePlus

**Enhanced fork of [Pake](https://github.com/tw93/Pake) with additional features.**

[![Upstream Version](https://img.shields.io/badge/upstream-v3.7.4-blue.svg)](https://github.com/tw93/Pake)
[![PakePlus Version](https://img.shields.io/badge/pakeplus-v3.7.4--plus.1-green.svg)](https://github.com/chindris-mihai-alexandru/PakePlus/releases)
[![codecov](https://codecov.io/gh/chindris-mihai-alexandru/PakePlus/graph/badge.svg)](https://codecov.io/gh/chindris-mihai-alexandru/PakePlus)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## What is PakePlus?

PakePlus is a maintained fork of [tw93/Pake](https://github.com/tw93/Pake) that tracks upstream releases while adding enhancements and fixes.

## Versioning

PakePlus uses the format: `{upstream_version}-plus.{patch}`

| Version        | Meaning                                                |
| -------------- | ------------------------------------------------------ |
| `3.7.4-plus.1` | Based on Pake 3.7.4, first PakePlus release            |
| `3.7.4-plus.2` | Based on Pake 3.7.4, second PakePlus release           |
| `3.8.0-plus.1` | Based on Pake 3.8.0, first PakePlus release after sync |

## Key Features

### New Window Support (`--new-window`)

Enable popup windows for third-party login flows, OAuth callbacks, and links that open in new tabs (`target="_blank"`).

**Usage:**

```bash
# CLI flag
pake https://example.com --name MyApp --new-window

# Or in pake.json config
{
  "windows": [{
    "url": "https://example.com",
    "new_window": true
  }]
}
```

**When to use:**

- Apps requiring OAuth/SSO login (Google, GitHub, etc.)
- Sites that open content in new tabs
- Any webapp with popup-based workflows

**How it works:**
When enabled, Tauri's `on_new_window` handler allows new window requests instead of blocking them (the default behavior).

---

## Planned Enhancements

- [ ] Improved macOS integration
- [ ] Better icon handling
- [ ] Enhanced CLI options
- [ ] Bug fixes and maintenance

## Syncing with Upstream

```bash
git fetch upstream
git checkout main
git merge upstream/main
# Resolve any conflicts
git push origin main
```

## Related Projects

- **[Orbit](https://github.com/chindris-mihai-alexandru/Orbit)**: AI-augmented browser workspace for macOS (Swift/WebKit)
- **[Pake](https://github.com/tw93/Pake)**: Original project by tw93

## License

MIT License - Same as upstream Pake.
