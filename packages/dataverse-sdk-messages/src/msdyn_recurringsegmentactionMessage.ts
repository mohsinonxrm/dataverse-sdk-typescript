import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_recurringsegmentaction request message
 *
 * Web API Action: msdyn_recurringsegmentaction
 */
export class msdyn_recurringsegmentactionRequest
  extends OrganizationRequest
  implements Executable<msdyn_recurringsegmentactionResponse>
{
  constructor(
    public payload: string,
    public operationType: string,
    public segmentId: string
  ) {
    super("msdyn_recurringsegmentaction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_recurringsegmentaction`;

    const body: Record<string, unknown> = {
      payload: this.payload,
      operationType: this.operationType,
      segmentId: this.segmentId,
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

  async parseResponse(response: Response): Promise<msdyn_recurringsegmentactionResponse> {
    const data = await response.json();
    return msdyn_recurringsegmentactionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      payload: this.payload,
      operationType: this.operationType,
      segmentId: this.segmentId,
    };
  }
}

/**
 * msdyn_recurringsegmentaction response message
 */
export class msdyn_recurringsegmentactionResponse extends OrganizationResponse {
  constructor(public result: msdyn_recurringsegmentactionResponse) {
    super("msdyn_recurringsegmentaction");
  }

  static fromResponse(data: unknown): msdyn_recurringsegmentactionResponse {
    return new msdyn_recurringsegmentactionResponse((data as any).value);
  }
}
