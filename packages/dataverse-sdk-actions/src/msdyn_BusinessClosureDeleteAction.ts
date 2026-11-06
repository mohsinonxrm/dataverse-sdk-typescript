import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_BusinessClosureDelete action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_BusinessClosureDeleteResponse {
  "@odata.context"?: string;
  RemainingIds: string;
}

/**
 * Parameters of the msdyn_BusinessClosureDelete action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BusinessClosureDeleteActionParameters {
  Ids: string;
}

/**
 * msdyn_BusinessClosureDelete action
 *
 * Unbound action
 */
export class msdyn_BusinessClosureDeleteAction implements Executable<msdyn_BusinessClosureDeleteResponse> {
  constructor(public readonly parameters: msdyn_BusinessClosureDeleteActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BusinessClosureDelete`;

    const body = requestBody({
      Ids: this.parameters.Ids,
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

  async parseResponse(response: Response): Promise<msdyn_BusinessClosureDeleteResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_BusinessClosureDeleteResponse;
  }
}
