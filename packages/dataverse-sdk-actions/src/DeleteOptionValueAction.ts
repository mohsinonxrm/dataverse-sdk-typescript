import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from DeleteOptionValue action
 */
export interface DeleteOptionValueResponse {
  // No content returned
}

/**
 * Parameters of the DeleteOptionValue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteOptionValueActionParameters {
  OptionSetName?: string;
  AttributeLogicalName?: string;
  EntityLogicalName?: string;
  Value: number;
  SolutionUniqueName?: string;
}

/**
 * DeleteOptionValue action
 *
 * Unbound action
 */
export class DeleteOptionValueAction implements Executable<DeleteOptionValueResponse> {
  constructor(public readonly parameters: DeleteOptionValueActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteOptionValue`;

    const body = requestBody({
      OptionSetName: this.parameters.OptionSetName,
      AttributeLogicalName: this.parameters.AttributeLogicalName,
      EntityLogicalName: this.parameters.EntityLogicalName,
      Value: this.parameters.Value,
      SolutionUniqueName: this.parameters.SolutionUniqueName,
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

  async parseResponse(response: Response): Promise<DeleteOptionValueResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as DeleteOptionValueResponse;
    return (await response.json()) as DeleteOptionValueResponse;
  }
}
