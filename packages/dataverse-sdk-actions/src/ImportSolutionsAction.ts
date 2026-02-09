import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ImportSolutions action
 */
export interface ImportSolutionsResponse {
  // No content returned
}

/**
 * ImportSolutions action
 *
 * Unbound action
 */
export class ImportSolutionsAction implements Executable<ImportSolutionsResponse> {
  constructor(
    public readonly overwriteUnmanagedCustomizations: boolean,
    public readonly publishWorkflows: boolean,
    public readonly customizationFiles: string,
    public readonly importJobId: string,
    public readonly convertToManaged: boolean,
    public readonly skipProductUpdateDependencies: boolean,
    public readonly holdingSolution: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportSolutions`;

    const body: Record<string, unknown> = {
      OverwriteUnmanagedCustomizations: this.overwriteUnmanagedCustomizations,
      PublishWorkflows: this.publishWorkflows,
      CustomizationFiles: this.customizationFiles,
      ImportJobId: this.importJobId,
      ConvertToManaged: this.convertToManaged,
      SkipProductUpdateDependencies: this.skipProductUpdateDependencies,
      HoldingSolution: this.holdingSolution,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ImportSolutionsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
