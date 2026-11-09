import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetOrCreateLinkedActivity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOrCreateLinkedActivityResponse {
  "@odata.context"?: string;
  IsLinkedActivityCreated: boolean;
  LinkedActivityId: string;
}

/**
 * Parameters of the msdyn_GetOrCreateLinkedActivity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOrCreateLinkedActivityActionParameters {
  SequenceStepId: string;
  CreateLinkedActivity: boolean;
}

/**
 * msdyn_GetOrCreateLinkedActivity action
 *
 * Unbound action
 */
export class msdyn_GetOrCreateLinkedActivityAction implements Executable<msdyn_GetOrCreateLinkedActivityResponse> {
  constructor(public readonly parameters: msdyn_GetOrCreateLinkedActivityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOrCreateLinkedActivity`;

    const body = requestBody({
      SequenceStepId: this.parameters.SequenceStepId,
      CreateLinkedActivity: this.parameters.CreateLinkedActivity,
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

  async parseResponse(response: Response): Promise<msdyn_GetOrCreateLinkedActivityResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetOrCreateLinkedActivityResponse;
  }
}
