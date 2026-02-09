/**
 * Fluent builder for Prefer header options
 */
export class PreferBuilder {
  private options: string[] = [];

  /**
   * Request response representation (instead of 204 No Content)
   */
  returnRepresentation(): this {
    this.options.push("return=representation");
    return this;
  }

  /**
   * Include formatted values for OptionSets, Lookups, etc.
   * @param annotations - Specific annotation or '*' for all
   */
  formattedValues(annotations = "OData.Community.Display.V1.FormattedValue"): this {
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
