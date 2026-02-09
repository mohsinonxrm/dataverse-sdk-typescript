import { describe, it, expect } from "vitest";
import { PreferBuilder } from "../src/client/PreferBuilder.js";

describe("PreferBuilder", () => {
  it("should build return=representation", () => {
    const builder = new PreferBuilder();
    builder.returnRepresentation();
    expect(builder.build()).toBe("return=representation");
  });

  it("should build formatted values with default annotation", () => {
    const builder = new PreferBuilder();
    builder.formattedValues();
    expect(builder.build()).toBe(
      'odata.include-annotations="OData.Community.Display.V1.FormattedValue"'
    );
  });

  it("should build formatted values with custom annotation", () => {
    const builder = new PreferBuilder();
    builder.formattedValues("Custom.Annotation");
    expect(builder.build()).toBe('odata.include-annotations="Custom.Annotation"');
  });

  it("should build all annotations", () => {
    const builder = new PreferBuilder();
    builder.allAnnotations();
    expect(builder.build()).toBe('odata.include-annotations="*"');
  });

  it("should chain multiple options", () => {
    const builder = new PreferBuilder();
    builder.returnRepresentation().formattedValues();
    expect(builder.build()).toBe(
      'return=representation,odata.include-annotations="OData.Community.Display.V1.FormattedValue"'
    );
  });

  it("should support continueOnError", () => {
    const builder = new PreferBuilder();
    builder.continueOnError();
    expect(builder.build()).toBe("odata.continue-on-error");
  });

  it("should support maxPageSize", () => {
    const builder = new PreferBuilder();
    builder.maxPageSize(500);
    expect(builder.build()).toBe("odata.maxpagesize=500");
  });

  it("should support trackChanges", () => {
    const builder = new PreferBuilder();
    builder.trackChanges();
    expect(builder.build()).toBe("odata.track-changes");
  });

  it("should chain all options together", () => {
    const builder = new PreferBuilder();
    builder
      .returnRepresentation()
      .allAnnotations()
      .maxPageSize(100)
      .continueOnError()
      .trackChanges();
    expect(builder.build()).toBe(
      'return=representation,odata.include-annotations="*",odata.maxpagesize=100,odata.continue-on-error,odata.track-changes'
    );
  });

  it("should return empty string when no options added", () => {
    const builder = new PreferBuilder();
    expect(builder.build()).toBe("");
  });
});
