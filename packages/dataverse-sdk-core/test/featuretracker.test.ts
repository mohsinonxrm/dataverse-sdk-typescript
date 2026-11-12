import { describe, it, expect, beforeEach } from "vitest";
import {
  FeatureUsageFlag,
  FeatureUsageTracker,
  getGlobalFeatureTracker,
  resetGlobalFeatureTracker,
} from "../src/telemetry/FeatureUsageTracker.js";

describe("FeatureUsageTracker", () => {
  let tracker: FeatureUsageTracker;

  beforeEach(() => {
    tracker = new FeatureUsageTracker();
    resetGlobalFeatureTracker();
  });

  describe("FeatureUsageFlag enum", () => {
    it("has correct power-of-2 values", () => {
      expect(FeatureUsageFlag.NONE).toBe(0);
      expect(FeatureUsageFlag.RETRY_ENABLED).toBe(1);
      expect(FeatureUsageFlag.CONCURRENCY_ENABLED).toBe(2);
      expect(FeatureUsageFlag.BATCH_ENABLED).toBe(4);
      expect(FeatureUsageFlag.CUSTOM_AUTH).toBe(8);
      expect(FeatureUsageFlag.TELEMETRY_ENABLED).toBe(16);
    });
  });

  describe("addFeature", () => {
    it("adds single feature flag", () => {
      tracker.addFeature(FeatureUsageFlag.RETRY_ENABLED);
      expect(tracker.hasFeature(FeatureUsageFlag.RETRY_ENABLED)).toBe(true);
      expect(tracker.getFlags()).toBe(1);
    });

    it("adds multiple feature flags with bitwise OR", () => {
      tracker.addFeature(FeatureUsageFlag.RETRY_ENABLED);
      tracker.addFeature(FeatureUsageFlag.CONCURRENCY_ENABLED);
      expect(tracker.hasFeature(FeatureUsageFlag.RETRY_ENABLED)).toBe(true);
      expect(tracker.hasFeature(FeatureUsageFlag.CONCURRENCY_ENABLED)).toBe(true);
      expect(tracker.getFlags()).toBe(3); // 1 | 2 = 3
    });

    it("is idempotent", () => {
      tracker.addFeature(FeatureUsageFlag.RETRY_ENABLED);
      tracker.addFeature(FeatureUsageFlag.RETRY_ENABLED);
      expect(tracker.getFlags()).toBe(1);
    });
  });

  describe("removeFeature", () => {
    it("removes feature flag", () => {
      tracker.addFeature(FeatureUsageFlag.RETRY_ENABLED);
      tracker.addFeature(FeatureUsageFlag.CONCURRENCY_ENABLED);
      tracker.removeFeature(FeatureUsageFlag.RETRY_ENABLED);

      expect(tracker.hasFeature(FeatureUsageFlag.RETRY_ENABLED)).toBe(false);
      expect(tracker.hasFeature(FeatureUsageFlag.CONCURRENCY_ENABLED)).toBe(true);
      expect(tracker.getFlags()).toBe(2);
    });
  });

  describe("hasFeature", () => {
    it("returns false for feature not added", () => {
      expect(tracker.hasFeature(FeatureUsageFlag.RETRY_ENABLED)).toBe(false);
    });

    it("returns true for feature added", () => {
      tracker.addFeature(FeatureUsageFlag.RETRY_ENABLED);
      expect(tracker.hasFeature(FeatureUsageFlag.RETRY_ENABLED)).toBe(true);
    });

    it("correctly identifies individual flags in combined value", () => {
      tracker.addFeature(FeatureUsageFlag.RETRY_ENABLED);
      tracker.addFeature(FeatureUsageFlag.CONCURRENCY_ENABLED);
      tracker.addFeature(FeatureUsageFlag.BATCH_ENABLED);

      expect(tracker.hasFeature(FeatureUsageFlag.RETRY_ENABLED)).toBe(true);
      expect(tracker.hasFeature(FeatureUsageFlag.CONCURRENCY_ENABLED)).toBe(true);
      expect(tracker.hasFeature(FeatureUsageFlag.BATCH_ENABLED)).toBe(true);
      expect(tracker.hasFeature(FeatureUsageFlag.CUSTOM_AUTH)).toBe(false);
    });
  });

  describe("getFlags", () => {
    it("returns 0 for no features", () => {
      expect(tracker.getFlags()).toBe(0);
    });

    it("returns correct combined value", () => {
      tracker.addFeature(FeatureUsageFlag.RETRY_ENABLED); // 1
      tracker.addFeature(FeatureUsageFlag.BATCH_ENABLED); // 4
      expect(tracker.getFlags()).toBe(5); // 1 | 4 = 5
    });
  });

  describe("getFlagsHex", () => {
    it("returns hex string with 0x prefix", () => {
      tracker.addFeature(FeatureUsageFlag.RETRY_ENABLED);
      tracker.addFeature(FeatureUsageFlag.CONCURRENCY_ENABLED);
      expect(tracker.getFlagsHex()).toBe("0x0003");
    });

    it("pads to 4 digits", () => {
      expect(tracker.getFlagsHex()).toBe("0x0000");
      tracker.addFeature(FeatureUsageFlag.RETRY_ENABLED);
      expect(tracker.getFlagsHex()).toBe("0x0001");
    });

    it("handles larger values", () => {
      tracker.addFeature(FeatureUsageFlag.APPINSIGHTS_TELEMETRY); // 32768 = 0x8000
      expect(tracker.getFlagsHex()).toBe("0x8000");
    });
  });

  describe("getEnabledFeatures", () => {
    it("returns empty array for no features", () => {
      expect(tracker.getEnabledFeatures()).toEqual([]);
    });

    it("returns feature names", () => {
      tracker.addFeature(FeatureUsageFlag.RETRY_ENABLED);
      tracker.addFeature(FeatureUsageFlag.CONCURRENCY_ENABLED);

      const features = tracker.getEnabledFeatures();
      expect(features).toContain("RETRY_ENABLED");
      expect(features).toContain("CONCURRENCY_ENABLED");
      expect(features).toHaveLength(2);
    });

    it("excludes NONE from results", () => {
      const features = tracker.getEnabledFeatures();
      expect(features).not.toContain("NONE");
    });
  });

  describe("reset", () => {
    it("clears all features", () => {
      tracker.addFeature(FeatureUsageFlag.RETRY_ENABLED);
      tracker.addFeature(FeatureUsageFlag.CONCURRENCY_ENABLED);
      tracker.reset();

      expect(tracker.getFlags()).toBe(0);
      expect(tracker.hasFeature(FeatureUsageFlag.RETRY_ENABLED)).toBe(false);
    });
  });

  describe("setFlags", () => {
    it("sets flags from number", () => {
      tracker.setFlags(3); // RETRY_ENABLED | CONCURRENCY_ENABLED
      expect(tracker.hasFeature(FeatureUsageFlag.RETRY_ENABLED)).toBe(true);
      expect(tracker.hasFeature(FeatureUsageFlag.CONCURRENCY_ENABLED)).toBe(true);
    });
  });

  describe("fromHex", () => {
    it("creates tracker from hex string", () => {
      const tracker = FeatureUsageTracker.fromHex("0x0003");
      expect(tracker.hasFeature(FeatureUsageFlag.RETRY_ENABLED)).toBe(true);
      expect(tracker.hasFeature(FeatureUsageFlag.CONCURRENCY_ENABLED)).toBe(true);
    });

    it("handles hex string without 0x prefix", () => {
      const tracker = FeatureUsageTracker.fromHex("3");
      expect(tracker.getFlags()).toBe(3);
    });
  });

  describe("merge", () => {
    it("merges flags from another tracker", () => {
      const tracker1 = new FeatureUsageTracker();
      tracker1.addFeature(FeatureUsageFlag.RETRY_ENABLED);

      const tracker2 = new FeatureUsageTracker();
      tracker2.addFeature(FeatureUsageFlag.CONCURRENCY_ENABLED);

      tracker1.merge(tracker2);

      expect(tracker1.hasFeature(FeatureUsageFlag.RETRY_ENABLED)).toBe(true);
      expect(tracker1.hasFeature(FeatureUsageFlag.CONCURRENCY_ENABLED)).toBe(true);
    });
  });

  describe("Global tracker", () => {
    it("returns singleton instance", () => {
      const tracker1 = getGlobalFeatureTracker();
      const tracker2 = getGlobalFeatureTracker();
      expect(tracker1).toBe(tracker2);
    });

    it("maintains state across calls", () => {
      const tracker1 = getGlobalFeatureTracker();
      tracker1.addFeature(FeatureUsageFlag.RETRY_ENABLED);

      const tracker2 = getGlobalFeatureTracker();
      expect(tracker2.hasFeature(FeatureUsageFlag.RETRY_ENABLED)).toBe(true);
    });

    it("can be reset", () => {
      const tracker = getGlobalFeatureTracker();
      tracker.addFeature(FeatureUsageFlag.RETRY_ENABLED);

      resetGlobalFeatureTracker();

      const newTracker = getGlobalFeatureTracker();
      expect(newTracker.hasFeature(FeatureUsageFlag.RETRY_ENABLED)).toBe(false);
    });
  });

  describe("Bitwise operations", () => {
    it("correctly combines multiple flags", () => {
      // Test all combinations work correctly
      tracker.addFeature(FeatureUsageFlag.RETRY_ENABLED); // 1
      tracker.addFeature(FeatureUsageFlag.CONCURRENCY_ENABLED); // 2
      tracker.addFeature(FeatureUsageFlag.BATCH_ENABLED); // 4
      tracker.addFeature(FeatureUsageFlag.CUSTOM_AUTH); // 8

      expect(tracker.getFlags()).toBe(15); // 1 + 2 + 4 + 8 = 15
    });

    it("handles all flags", () => {
      // Add all features
      for (const flag of Object.values(FeatureUsageFlag)) tracker.addFeature(flag);

      // Verify all are present
      expect(tracker.hasFeature(FeatureUsageFlag.RETRY_ENABLED)).toBe(true);
      expect(tracker.hasFeature(FeatureUsageFlag.OTEL_TELEMETRY)).toBe(true);
      expect(tracker.getEnabledFeatures()).toHaveLength(Object.keys(FeatureUsageFlag).length - 1);
    });
  });

  // #479: a const object, not an enum, so there is no reverse mapping to skip
  describe("FeatureUsageFlag as a const object", () => {
    it("has only the named flags as keys", () => {
      expect(Object.keys(FeatureUsageFlag)).toContain("RETRY_ENABLED");
      expect(Object.keys(FeatureUsageFlag).every((k) => Number.isNaN(Number(k)))).toBe(true);
    });

    it("names every enabled flag, in declaration order, from a combined value", () => {
      tracker.setFlags(FeatureUsageFlag.OTEL_TELEMETRY | FeatureUsageFlag.RETRY_ENABLED | 0x40000);
      expect(tracker.getEnabledFeatures()).toEqual(["RETRY_ENABLED", "OTEL_TELEMETRY"]);
    });

    it("takes a combination of flags where a flag is expected", () => {
      tracker.addFeature(FeatureUsageFlag.BATCH_ENABLED | FeatureUsageFlag.XRM_FACADE);
      expect(tracker.getEnabledFeatures()).toEqual(["BATCH_ENABLED", "XRM_FACADE"]);
    });
  });
});
