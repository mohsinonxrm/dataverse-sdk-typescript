import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_EditSequenceResponse as msdyn_EditSequenceResponseData } from "./types/index.js";

/**
 * msdyn_EditSequence request message
 *
 * Web API Action: msdyn_EditSequence
 */
export class msdyn_EditSequenceRequest
  extends OrganizationRequest
  implements Executable<msdyn_EditSequenceResponse>
{
  constructor(
    public sequenceId: string,
    public discardChanges: boolean
  ) {
    super("msdyn_EditSequence");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EditSequence`;

    const body: Record<string, unknown> = {
      SequenceId: this.sequenceId,
      DiscardChanges: this.discardChanges,
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

  async parseResponse(response: Response): Promise<msdyn_EditSequenceResponse> {
    const data = await response.json();
    return msdyn_EditSequenceResponse.fromResponse(data);
  }
}

/**
 * msdyn_EditSequence response message
 */
export class msdyn_EditSequenceResponse extends OrganizationResponse {
  constructor(public result: msdyn_EditSequenceResponseData) {
    super("msdyn_EditSequence");
  }

  static fromResponse(data: unknown): msdyn_EditSequenceResponse {
    return new msdyn_EditSequenceResponse(responseObject<msdyn_EditSequenceResponseData>(data));
  }
}
