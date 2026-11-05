import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      SequenceId: this.sequenceId,
      DiscardChanges: this.discardChanges,
    };
  }
}

/**
 * msdyn_EditSequence response message
 */
export class msdyn_EditSequenceResponse extends OrganizationResponse {
  constructor(public result: msdyn_EditSequenceResponse) {
    super("msdyn_EditSequence");
  }

  static fromResponse(data: unknown): msdyn_EditSequenceResponse {
    return new msdyn_EditSequenceResponse((data as any).value);
  }
}
