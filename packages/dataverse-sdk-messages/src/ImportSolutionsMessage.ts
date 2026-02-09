import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ImportSolutions request message
 *
 * Web API Action: ImportSolutions
 */
export class ImportSolutionsRequest
  extends OrganizationRequest
  implements Executable<ImportSolutionsResponse>
{
  constructor(
    public overwriteUnmanagedCustomizations: boolean,
    public publishWorkflows: boolean,
    public customizationFiles: string,
    public importJobId: string,
    public convertToManaged: boolean,
    public skipProductUpdateDependencies: boolean,
    public holdingSolution: boolean
  ) {
    super("ImportSolutions");
  }

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
    return new ImportSolutionsResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      OverwriteUnmanagedCustomizations: this.overwriteUnmanagedCustomizations,
      PublishWorkflows: this.publishWorkflows,
      CustomizationFiles: this.customizationFiles,
      ImportJobId: this.importJobId,
      ConvertToManaged: this.convertToManaged,
      SkipProductUpdateDependencies: this.skipProductUpdateDependencies,
      HoldingSolution: this.holdingSolution,
    };
  }
}

/**
 * ImportSolutions response message
 */
export class ImportSolutionsResponse extends OrganizationResponse {
  constructor() {
    super("ImportSolutions");
  }

  static fromResponse(_data: unknown): ImportSolutionsResponse {
    return new ImportSolutionsResponse();
  }
}
