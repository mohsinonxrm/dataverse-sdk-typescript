import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetOrCreateLinkedActivityResponse as msdyn_GetOrCreateLinkedActivityResponseData } from "./types/index.js";

/**
 * msdyn_GetOrCreateLinkedActivity request message
 *
 * Web API Action: msdyn_GetOrCreateLinkedActivity
 */
export class msdyn_GetOrCreateLinkedActivityRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOrCreateLinkedActivityResponse>
{
  constructor(
    public sequenceStepId: string,
    public createLinkedActivity: boolean
  ) {
    super("msdyn_GetOrCreateLinkedActivity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOrCreateLinkedActivity`;

    const body: Record<string, unknown> = {
      SequenceStepId: this.sequenceStepId,
      CreateLinkedActivity: this.createLinkedActivity,
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

  async parseResponse(response: Response): Promise<msdyn_GetOrCreateLinkedActivityResponse> {
    const data = await response.json();
    return msdyn_GetOrCreateLinkedActivityResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetOrCreateLinkedActivity response message
 */
export class msdyn_GetOrCreateLinkedActivityResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOrCreateLinkedActivityResponseData) {
    super("msdyn_GetOrCreateLinkedActivity");
  }

  static fromResponse(data: unknown): msdyn_GetOrCreateLinkedActivityResponse {
    return new msdyn_GetOrCreateLinkedActivityResponse(
      responseObject<msdyn_GetOrCreateLinkedActivityResponseData>(data)
    );
  }
}
