import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the ImportSolutions action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type ImportSolutionsResponse = void;

/**
 * Parameters of the ImportSolutions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportSolutionsActionParameters {
  OverwriteUnmanagedCustomizations: boolean;
  PublishWorkflows: boolean;
  CustomizationFiles: string;
  ImportJobId: string;
  ConvertToManaged?: boolean;
  SkipProductUpdateDependencies?: boolean;
  HoldingSolution?: boolean;
}

/**
 * ImportSolutions action
 *
 * Unbound action
 */
export class ImportSolutionsAction implements Executable<ImportSolutionsResponse> {
  constructor(public readonly parameters: ImportSolutionsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportSolutions`;

    const body = requestBody({
      OverwriteUnmanagedCustomizations: this.parameters.OverwriteUnmanagedCustomizations,
      PublishWorkflows: this.parameters.PublishWorkflows,
      CustomizationFiles: this.parameters.CustomizationFiles,
      ImportJobId: this.parameters.ImportJobId,
      ConvertToManaged: this.parameters.ConvertToManaged,
      SkipProductUpdateDependencies: this.parameters.SkipProductUpdateDependencies,
      HoldingSolution: this.parameters.HoldingSolution,
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
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
