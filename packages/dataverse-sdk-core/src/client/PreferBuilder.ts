import type { AnnotationTerm } from "./annotations.js";

/**
 * Fluent builder for Prefer header options. From `request.prefer()`, `done()` returns the request
 * builder, so the chain can go on: `.prefer().allAnnotations().done().get()`.
 */
export class PreferBuilder<TParent = undefined> {
  private options: string[] = [];

  /** @param parent - What `done()` returns; set by the request builder's `prefer()`. */
  constructor(private readonly parent?: TParent) {}

  /**
   * Back to the request builder that created this one.
   * @throws {Error} on a `PreferBuilder` created with `new PreferBuilder()`, which has none.
   */
  done(): TParent {
    if (this.parent === undefined) {
      throw new Error("done(): this PreferBuilder wasn't created by a request builder's prefer().");
    }
    return this.parent;
  }

  /**
   * Request response representation (instead of 204 No Content)
   */
  returnRepresentation(): this {
    this.options.push("return=representation");
    return this;
  }

  /**
   * Include formatted values for OptionSets, Lookups, etc.
   * @param annotations - The annotation term (`Annotations.FormattedValue` by default), `"*"`
   *   (`Annotations.All`) for all, a wildcard, or several joined with commas.
   */
  formattedValues(
    annotations: AnnotationTerm | (string & {}) = "OData.Community.Display.V1.FormattedValue"
  ): this {
    this.options.push(`odata.include-annotations="${annotations}"`);
    return this;
  }

  /**
   * Include all annotations
   */
  allAnnotations(): this {
    return this.formattedValues("*");
  }

  /**
   * Continue batch execution on error
   */
  continueOnError(): this {
    this.options.push("odata.continue-on-error");
    return this;
  }

  /**
   * Set maximum page size
   */
  maxPageSize(size: number): this {
    this.options.push(`odata.maxpagesize=${String(size)}`);
    return this;
  }

  /**
   * Track changes (for delta queries)
   */
  trackChanges(): this {
    this.options.push("odata.track-changes");
    return this;
  }

  /**
   * Build the final Prefer header value
   * @internal
   */
  build(): string {
    return this.options.join(",");
  }
}
