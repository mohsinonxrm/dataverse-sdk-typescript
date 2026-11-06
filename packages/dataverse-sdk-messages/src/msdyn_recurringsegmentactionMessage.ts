import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_recurringsegmentactionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_recurringsegmentaction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_recurringsegmentactionResult {
  "@odata.context"?: string;
  result: string;
}

/**
 * msdyn_recurringsegmentaction response message
 *
 * `result` is the value the msdyn_recurringsegmentaction action returns (see {@link msdyn_recurringsegmentactionResult}).
 */
export class msdyn_recurringsegmentactionResponse extends OrganizationResponse {
  constructor(public result: msdyn_recurringsegmentactionResult) {
    super("msdyn_recurringsegmentaction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_recurringsegmentactionResponse {
    return new msdyn_recurringsegmentactionResponse(data as msdyn_recurringsegmentactionResult);
  }
}
