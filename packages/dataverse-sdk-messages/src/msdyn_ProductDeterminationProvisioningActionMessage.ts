import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ProductDeterminationProvisioningAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProductDeterminationProvisioningActionRequestParameters {
  RequestPayload: string;
}

/**
 * msdyn_ProductDeterminationProvisioningAction request message
 *
 * Web API Action: msdyn_ProductDeterminationProvisioningAction
 */
export class msdyn_ProductDeterminationProvisioningActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProductDeterminationProvisioningActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_ProductDeterminationProvisioningActionRequestParameters>;

  constructor(parameters: msdyn_ProductDeterminationProvisioningActionRequestParameters) {
    super("msdyn_ProductDeterminationProvisioningAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProductDeterminationProvisioningAction`;

    const body = requestBody({
      RequestPayload: this.Parameters.RequestPayload,
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
    return msdyn_ProductDeterminationProvisioningActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ProductDeterminationProvisioningAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ProductDeterminationProvisioningActionResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_ProductDeterminationProvisioningAction response message
 *
 * `result` is the value the msdyn_ProductDeterminationProvisioningAction action returns (see {@link msdyn_ProductDeterminationProvisioningActionResult}).
 */
export class msdyn_ProductDeterminationProvisioningActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProductDeterminationProvisioningActionResult) {
    super("msdyn_ProductDeterminationProvisioningAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ProductDeterminationProvisioningActionResponse {
    return new msdyn_ProductDeterminationProvisioningActionResponse(
      data as msdyn_ProductDeterminationProvisioningActionResult
    );
  }
}
