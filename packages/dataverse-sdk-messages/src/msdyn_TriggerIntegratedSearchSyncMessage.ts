import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TriggerIntegratedSearchSync request message
 *
 * Web API Action: msdyn_TriggerIntegratedSearchSync
 */
export class msdyn_TriggerIntegratedSearchSyncRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerIntegratedSearchSyncResponse>
{
  constructor() {
    super("msdyn_TriggerIntegratedSearchSync");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerIntegratedSearchSync`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerIntegratedSearchSyncResponse> {
    const data = await response.json();
    return msdyn_TriggerIntegratedSearchSyncResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_TriggerIntegratedSearchSync response message
 */
export class msdyn_TriggerIntegratedSearchSyncResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerIntegratedSearchSyncResponse) {
    super("msdyn_TriggerIntegratedSearchSync");
  }

  static fromResponse(data: unknown): msdyn_TriggerIntegratedSearchSyncResponse {
    return new msdyn_TriggerIntegratedSearchSyncResponse((data as any).value);
  }
}
