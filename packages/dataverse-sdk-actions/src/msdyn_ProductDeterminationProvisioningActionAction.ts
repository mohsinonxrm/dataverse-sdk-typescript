import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ProductDeterminationProvisioningAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ProductDeterminationProvisioningActionResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_ProductDeterminationProvisioningAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProductDeterminationProvisioningActionActionParameters {
  RequestPayload: string;
}

/**
 * msdyn_ProductDeterminationProvisioningAction action
 *
 * Unbound action
 */
export class msdyn_ProductDeterminationProvisioningActionAction implements Executable<msdyn_ProductDeterminationProvisioningActionResponse> {
  constructor(
    public readonly parameters: msdyn_ProductDeterminationProvisioningActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProductDeterminationProvisioningAction`;

    const body = requestBody({
      RequestPayload: this.parameters.RequestPayload,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_ProductDeterminationProvisioningActionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ProductDeterminationProvisioningActionResponse;
  }
}
