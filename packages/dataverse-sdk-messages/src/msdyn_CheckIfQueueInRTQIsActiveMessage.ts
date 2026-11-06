import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckIfQueueInRTQIsActive request message
 *
 * Web API Action: msdyn_CheckIfQueueInRTQIsActive
 */
export class msdyn_CheckIfQueueInRTQIsActiveRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfQueueInRTQIsActiveResponse>
{
  constructor() {
    super("msdyn_CheckIfQueueInRTQIsActive");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfQueueInRTQIsActive`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfQueueInRTQIsActiveResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfQueueInRTQIsActiveResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckIfQueueInRTQIsActive action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfQueueInRTQIsActiveResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfQueueInRTQIsActive response message
 *
 * `result` is the value the msdyn_CheckIfQueueInRTQIsActive action returns (see {@link msdyn_CheckIfQueueInRTQIsActiveResult}).
 */
export class msdyn_CheckIfQueueInRTQIsActiveResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfQueueInRTQIsActiveResult) {
    super("msdyn_CheckIfQueueInRTQIsActive");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfQueueInRTQIsActiveResponse {
    return new msdyn_CheckIfQueueInRTQIsActiveResponse(
      data as msdyn_CheckIfQueueInRTQIsActiveResult
    );
  }
}
