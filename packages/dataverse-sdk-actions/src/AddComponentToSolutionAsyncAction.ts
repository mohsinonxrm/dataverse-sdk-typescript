import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from AddComponentToSolutionAsync action
 */
export interface AddComponentToSolutionAsyncResponse {
  AsyncOperationId: string;
}

/**
 * Parameters of the AddComponentToSolutionAsync action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddComponentToSolutionAsyncActionParameters {
  LogicalName: string;
  Id: string;
  SolutionUniqueName: string;
  AddRequiredComponents: boolean;
  IncludeChildComponents?: boolean;
  IncludeEntityMetadata?: boolean;
}

/**
 * AddComponentToSolutionAsync action
 *
 * Unbound action
 */
export class AddComponentToSolutionAsyncAction implements Executable<AddComponentToSolutionAsyncResponse> {
  constructor(public readonly parameters: AddComponentToSolutionAsyncActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddComponentToSolutionAsync`;

    const body = requestBody({
      LogicalName: this.parameters.LogicalName,
      Id: this.parameters.Id,
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      AddRequiredComponents: this.parameters.AddRequiredComponents,
      IncludeChildComponents: this.parameters.IncludeChildComponents,
      IncludeEntityMetadata: this.parameters.IncludeEntityMetadata,
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

  async parseResponse(response: Response): Promise<AddComponentToSolutionAsyncResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as AddComponentToSolutionAsyncResponse;
    return (await response.json()) as AddComponentToSolutionAsyncResponse;
  }
}
