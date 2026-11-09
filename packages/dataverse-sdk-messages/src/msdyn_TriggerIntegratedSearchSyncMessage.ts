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
    // The body is the complex value, with its @odata.context
    return msdyn_TriggerIntegratedSearchSyncResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TriggerIntegratedSearchSync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TriggerIntegratedSearchSyncResult {
  "@odata.context"?: string;
  msdyn_IntegratedSearchSyncResponse: string;
}

/**
 * msdyn_TriggerIntegratedSearchSync response message
 *
 * `result` is the value the msdyn_TriggerIntegratedSearchSync action returns (see {@link msdyn_TriggerIntegratedSearchSyncResult}).
 */
export class msdyn_TriggerIntegratedSearchSyncResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerIntegratedSearchSyncResult) {
    super("msdyn_TriggerIntegratedSearchSync");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TriggerIntegratedSearchSyncResponse {
    return new msdyn_TriggerIntegratedSearchSyncResponse(
      data as msdyn_TriggerIntegratedSearchSyncResult
    );
  }
}
