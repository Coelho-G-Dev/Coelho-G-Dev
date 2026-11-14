import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const dir = new URL("../.github/workflows/", import.meta.url);
const yml = () => readFileSync(new URL("profile.yml", dir), "utf8");

describe("workflow do perfil", () => {
  it("dispara só por agenda, execução manual e push na master", () => {
    const text = yml();
    expect(text).toContain('cron: "0 */12 * * *"');
    expect(text).toMatch(/^  workflow_dispatch:/m);
    expect(text).toMatch(/^  push:\n    branches: \[master\]$/m);
    for (const banned of ["pull_request", "issues", "issue_comment", "workflow_run"]) {
      expect(text).not.toContain(banned);
    }
  });

  it("só usa actions/checkout e actions/setup-node, presas por hash", () => {
    const uses = yml().split("\n").filter((line) => /^\s*-?\s*uses:/.test(line));
    expect(uses).toHaveLength(2);
    for (const line of uses) {
      expect(line).toMatch(/^\s*-?\s*uses: actions\/(checkout|setup-node)@[0-9a-f]{40}\b/);
    }
  });

  it("dá escrita só ao job e não usa segredo novo", () => {
    const text = yml();
    expect(text).toMatch(/^permissions:\n  contents: read$/m);
    expect(text).toMatch(/^    permissions:\n      contents: write$/m);
    const secrets = text.match(/secrets\.\w+/g) ?? [];
    expect(secrets.filter((s) => s !== "secrets.GITHUB_TOKEN")).toEqual([]);
  });

  it("testa antes de gerar e gera antes de publicar", () => {
    const text = yml();
    const order = [
      "uses: actions/checkout@",
      "uses: actions/setup-node@",
      "npm ci --ignore-scripts",
      "npm test",
      "npm run activity",
      "git push --force",
    ].map((step) => text.indexOf(step));
    expect(order.every((index) => index >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("só escreve no branch output", () => {
    const pushes = yml().split("\n").filter((line) => line.includes("git push"));
    expect(pushes).toHaveLength(1);
    expect(pushes[0].trim()).toMatch(/ output$/);
  });

  it("o workflow antigo foi removido", () => {
    expect(existsSync(new URL("activity-graph.yml", dir))).toBe(false);
  });
});
