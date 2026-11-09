import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TriggerIntegratedSearchProvisioningApi message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TriggerIntegratedSearchProvisioningApiRequestParameters {
  msdyn_DegreeOfParallelism: string;
}

/**
 * msdyn_TriggerIntegratedSearchProvisioningApi request message
 *
 * Web API Action: msdyn_TriggerIntegratedSearchProvisioningApi
 */
export class msdyn_TriggerIntegratedSearchProvisioningApiRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerIntegratedSearchProvisioningApiResponse>
{
  declare readonly Parameters: Readonly<msdyn_TriggerIntegratedSearchProvisioningApiRequestParameters>;

  constructor(parameters: msdyn_TriggerIntegratedSearchProvisioningApiRequestParameters) {
    super("msdyn_TriggerIntegratedSearchProvisioningApi", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerIntegratedSearchProvisioningApi`;

    const body = requestBody({
      msdyn_DegreeOfParallelism: this.Parameters.msdyn_DegreeOfParallelism,
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
  ): Promise<msdyn_TriggerIntegratedSearchProvisioningApiResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TriggerIntegratedSearchProvisioningApiResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TriggerIntegratedSearchProvisioningApi action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TriggerIntegratedSearchProvisioningApiResult {
  "@odata.context"?: string;
  msdyn_TriggerProvisioningResponse: string;
}

/**
 * msdyn_TriggerIntegratedSearchProvisioningApi response message
 *
 * `result` is the value the msdyn_TriggerIntegratedSearchProvisioningApi action returns (see {@link msdyn_TriggerIntegratedSearchProvisioningApiResult}).
 */
export class msdyn_TriggerIntegratedSearchProvisioningApiResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerIntegratedSearchProvisioningApiResult) {
    super("msdyn_TriggerIntegratedSearchProvisioningApi");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TriggerIntegratedSearchProvisioningApiResponse {
    return new msdyn_TriggerIntegratedSearchProvisioningApiResponse(
      data as msdyn_TriggerIntegratedSearchProvisioningApiResult
    );
  }
}
