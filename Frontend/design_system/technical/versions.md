This is **very important**.

Don't let the AI blindly install `latest`.

```
# Fermor — Package Versions
```

The coding AI must respect the versions recorded in package.json / lockfile.

\## Rules

\- Do not automatically upgrade dependencies.

\- Do not use \`latest\` as an installation strategy.

\- Do not replace a library because another library is newer.

\- Keep the lockfile committed.

\- Dependency upgrades require an explicit technical decision.

\## Source of Truth

package.json

↓

lockfile

↓

versions.md

If versions.md conflicts with package.json,

package.json and lockfile are authoritative until versions.md is updated.
