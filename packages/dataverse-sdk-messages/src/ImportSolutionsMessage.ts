import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the ImportSolutions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportSolutionsRequestParameters {
  OverwriteUnmanagedCustomizations: boolean;
  PublishWorkflows: boolean;
  CustomizationFiles: string;
  ImportJobId: string;
  ConvertToManaged?: boolean;
  SkipProductUpdateDependencies?: boolean;
  HoldingSolution?: boolean;
}

/**
 * ImportSolutions request message
 *
 * Web API Action: ImportSolutions
 */
export class ImportSolutionsRequest
  extends OrganizationRequest
  implements Executable<ImportSolutionsResponse>
{
  declare readonly Parameters: Readonly<ImportSolutionsRequestParameters>;

  constructor(parameters: ImportSolutionsRequestParameters) {
    super("ImportSolutions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportSolutions`;

    const body = requestBody({
      OverwriteUnmanagedCustomizations: this.Parameters.OverwriteUnmanagedCustomizations,
      PublishWorkflows: this.Parameters.PublishWorkflows,
      CustomizationFiles: this.Parameters.CustomizationFiles,
      ImportJobId: this.Parameters.ImportJobId,
      ConvertToManaged: this.Parameters.ConvertToManaged,
      SkipProductUpdateDependencies: this.Parameters.SkipProductUpdateDependencies,
      HoldingSolution: this.Parameters.HoldingSolution,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  parseResponse(_response: Response): Promise<ImportSolutionsResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new ImportSolutionsResponse());
  }
}

/**
 * ImportSolutions response message
 */
export class ImportSolutionsResponse extends OrganizationResponse {
  constructor() {
    super("ImportSolutions");
  }

  static fromResponse(_data?: unknown): ImportSolutionsResponse {
    return new ImportSolutionsResponse();
  }
}
