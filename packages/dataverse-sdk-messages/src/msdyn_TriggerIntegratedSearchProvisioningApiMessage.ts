import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TriggerIntegratedSearchProvisioningApiResponse as msdyn_TriggerIntegratedSearchProvisioningApiResponseData } from "./types/index.js";

/**
 * msdyn_TriggerIntegratedSearchProvisioningApi request message
 *
 * Web API Action: msdyn_TriggerIntegratedSearchProvisioningApi
 */
export class msdyn_TriggerIntegratedSearchProvisioningApiRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerIntegratedSearchProvisioningApiResponse>
{
  constructor(public msdyn_DegreeOfParallelism: string) {
    super("msdyn_TriggerIntegratedSearchProvisioningApi");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerIntegratedSearchProvisioningApi`;

    const body: Record<string, unknown> = {
      msdyn_DegreeOfParallelism: this.msdyn_DegreeOfParallelism,
    };

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
    const data = await response.json();
    return msdyn_TriggerIntegratedSearchProvisioningApiResponse.fromResponse(data);
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
