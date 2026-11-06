import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ProductDeterminationProvisioningActionResponse as msdyn_ProductDeterminationProvisioningActionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_ProductDeterminationProvisioningActionResponse.fromResponse({});
    return msdyn_ProductDeterminationProvisioningActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ProductDeterminationProvisioningAction response message
 */
export class msdyn_ProductDeterminationProvisioningActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProductDeterminationProvisioningActionResponseData) {
    super("msdyn_ProductDeterminationProvisioningAction");
  }

  static fromResponse(data: unknown): msdyn_ProductDeterminationProvisioningActionResponse {
    return new msdyn_ProductDeterminationProvisioningActionResponse(
      responseObject<msdyn_ProductDeterminationProvisioningActionResponseData>(data)
    );
  }
}
