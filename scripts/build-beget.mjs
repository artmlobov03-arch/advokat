import { existsSync, renameSync } from "node:fs";
import { spawnSync } from "node:child_process";

const apiDirectory = "app/api";
const hiddenApiDirectory = "app/_api-beget-build";

if (existsSync(hiddenApiDirectory)) {
  throw new Error(`Temporary directory already exists: ${hiddenApiDirectory}`);
}

let apiHidden = false;

try {
  if (existsSync(apiDirectory)) {
    renameSync(apiDirectory, hiddenApiDirectory);
    apiHidden = true;
  }

  const result = spawnSync("npx", ["next", "build"], {
    stdio: "inherit",
    env: {
      ...process.env,
      BEGET_STATIC_EXPORT: "1",
      NEXT_PUBLIC_CONTACT_ENDPOINT: "/api/contact.php",
    },
  });

  if (result.status !== 0) process.exitCode = result.status ?? 1;
} finally {
  if (apiHidden && existsSync(hiddenApiDirectory)) {
    renameSync(hiddenApiDirectory, apiDirectory);
  }
}
