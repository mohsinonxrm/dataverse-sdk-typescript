import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetOrCreateLinkedActivityResponse> {
    const data = await response.json();
    return msdyn_GetOrCreateLinkedActivityResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SequenceStepId: this.sequenceStepId,
      CreateLinkedActivity: this.createLinkedActivity,
    };
  }
}

/**
 * msdyn_GetOrCreateLinkedActivity response message
 */
export class msdyn_GetOrCreateLinkedActivityResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOrCreateLinkedActivityResponse) {
    super("msdyn_GetOrCreateLinkedActivity");
  }

  static fromResponse(data: unknown): msdyn_GetOrCreateLinkedActivityResponse {
    return new msdyn_GetOrCreateLinkedActivityResponse((data as any).value);
  }
}
