import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ClassifySegments request message
 *
 * Web API Action: msdyn_ClassifySegments
 */
export class msdyn_ClassifySegmentsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ClassifySegmentsResponse>
{
  constructor(
    public regardingEntityId?: string,
    public regardingEntityName?: string
  ) {
    super("msdyn_ClassifySegments");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ClassifySegments`;

    const body: Record<string, unknown> = {
      RegardingEntityId: this.regardingEntityId,
      RegardingEntityName: this.regardingEntityName,
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

  async parseResponse(response: Response): Promise<msdyn_ClassifySegmentsResponse> {
    // No return value (204 No Content)
    return new msdyn_ClassifySegmentsResponse();
  }
}

/**
 * msdyn_ClassifySegments response message
 */
export class msdyn_ClassifySegmentsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ClassifySegments");
  }

  static fromResponse(_data: unknown): msdyn_ClassifySegmentsResponse {
    return new msdyn_ClassifySegmentsResponse();
  }
}
