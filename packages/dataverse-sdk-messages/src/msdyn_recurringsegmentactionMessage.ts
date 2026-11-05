import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_recurringsegmentactionResponse as msdyn_recurringsegmentactionResponseData } from "./types/index.js";

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
}

/**
 * msdyn_recurringsegmentaction response message
 */
export class msdyn_recurringsegmentactionResponse extends OrganizationResponse {
  constructor(public result: msdyn_recurringsegmentactionResponseData) {
    super("msdyn_recurringsegmentaction");
  }

  static fromResponse(data: unknown): msdyn_recurringsegmentactionResponse {
    return new msdyn_recurringsegmentactionResponse(
      responseObject<msdyn_recurringsegmentactionResponseData>(data)
    );
  }
}
