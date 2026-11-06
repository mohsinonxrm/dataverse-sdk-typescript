import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TriggerIntegratedSearchProvisioningApiResponse as msdyn_TriggerIntegratedSearchProvisioningApiResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_TriggerIntegratedSearchProvisioningApiResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_TriggerIntegratedSearchProvisioningApi response message
 */
export class msdyn_TriggerIntegratedSearchProvisioningApiResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerIntegratedSearchProvisioningApiResponseData) {
    super("msdyn_TriggerIntegratedSearchProvisioningApi");
  }

  static fromResponse(data: unknown): msdyn_TriggerIntegratedSearchProvisioningApiResponse {
    return new msdyn_TriggerIntegratedSearchProvisioningApiResponse(
      responseObject<msdyn_TriggerIntegratedSearchProvisioningApiResponseData>(data)
    );
  }
}
