import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_recurringsegmentactionResponse as msdyn_recurringsegmentactionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_recurringsegmentaction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_recurringsegmentactionRequestParameters {
  payload: string;
  operationType: string;
  segmentId: string;
}

/**
 * msdyn_recurringsegmentaction request message
 *
 * Web API Action: msdyn_recurringsegmentaction
 */
export class msdyn_recurringsegmentactionRequest
  extends OrganizationRequest
  implements Executable<msdyn_recurringsegmentactionResponse>
{
  declare readonly Parameters: Readonly<msdyn_recurringsegmentactionRequestParameters>;

  constructor(parameters: msdyn_recurringsegmentactionRequestParameters) {
    super("msdyn_recurringsegmentaction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_recurringsegmentaction`;

    const body = requestBody({
      payload: this.Parameters.payload,
      operationType: this.Parameters.operationType,
      segmentId: this.Parameters.segmentId,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_recurringsegmentactionResponse.fromResponse({});
    return msdyn_recurringsegmentactionResponse.fromResponse(await response.json());
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
