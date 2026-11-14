/**
 * Lists the live tests that failed once and passed when retried. There's no global `retry` (a
 * test that creates records would create them again); only a read-only or idempotent test opts
 * in, with `it(name, { retry: 1 }, fn)`. A test that passes on its retry counts as passed, but
 * it isn't hidden: each one is printed at the end and, on GitHub Actions, raised as a warning
 * annotation on the run.
 */
import { relative } from "node:path";
import type { Reporter, TestCase } from "vitest/node";

export default class FlakyReporter implements Reporter {
  private readonly flaky: string[] = [];

  onTestCaseResult(testCase: TestCase): void {
    if (testCase.diagnostic()?.flaky) {
      const file = relative(process.cwd(), testCase.module.moduleId).replaceAll("\\", "/");
      this.flaky.push(`${file} > ${testCase.fullName}`);
    }
  }

  onTestRunEnd(): void {
    if (this.flaky.length === 0) return;
    console.log(`\n${String(this.flaky.length)} live test(s) passed only when retried:`);
    for (const name of this.flaky) {
      console.log(`  ↻ ${name}`);
      if (process.env.GITHUB_ACTIONS === "true") {
        // Workflow commands: %, CR and LF are escaped in the message
        const message = name.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
        console.log(`::warning title=Flaky live test (passed on retry)::${message}`);
      }
    }
  }
}
