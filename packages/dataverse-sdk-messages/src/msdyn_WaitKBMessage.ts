import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_WaitKBResponse as msdyn_WaitKBResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_WaitKB message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_WaitKBRequestParameters {
  Context?: string;
  JitterPercentage?: number;
  Delay: number;
}

/**
 * msdyn_WaitKB request message
 *
 * Web API Action: msdyn_WaitKB
 */
export class msdyn_WaitKBRequest
  extends OrganizationRequest
  implements Executable<msdyn_WaitKBResponse>
{
  declare readonly Parameters: Readonly<msdyn_WaitKBRequestParameters>;

  constructor(parameters: msdyn_WaitKBRequestParameters) {
    super("msdyn_WaitKB", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WaitKB`;

    const body = requestBody({
      Context: this.Parameters.Context,
      JitterPercentage: this.Parameters.JitterPercentage,
      Delay: this.Parameters.Delay,
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

  async parseResponse(response: Response): Promise<msdyn_WaitKBResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_WaitKBResponse.fromResponse({});
    return msdyn_WaitKBResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_WaitKB response message
 */
export class msdyn_WaitKBResponse extends OrganizationResponse {
  constructor(public result: msdyn_WaitKBResponseData) {
    super("msdyn_WaitKB");
  }

  static fromResponse(data: unknown): msdyn_WaitKBResponse {
    return new msdyn_WaitKBResponse(responseObject<msdyn_WaitKBResponseData>(data));
  }
}
