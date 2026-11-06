import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FSDemoDataRequestResponse as msdyn_FSDemoDataRequestResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FSDemoDataRequest message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FSDemoDataRequestRequestParameters {
  Operation: string;
}

/**
 * msdyn_FSDemoDataRequest request message
 *
 * Web API Action: msdyn_FSDemoDataRequest
 */
export class msdyn_FSDemoDataRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_FSDemoDataRequestResponse>
{
  declare readonly Parameters: Readonly<msdyn_FSDemoDataRequestRequestParameters>;

  constructor(parameters: msdyn_FSDemoDataRequestRequestParameters) {
    super("msdyn_FSDemoDataRequest", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FSDemoDataRequest`;

    const body = requestBody({
      Operation: this.Parameters.Operation,
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

  async parseResponse(response: Response): Promise<msdyn_FSDemoDataRequestResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_FSDemoDataRequestResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_FSDemoDataRequest response message
 */
export class msdyn_FSDemoDataRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_FSDemoDataRequestResponseData) {
    super("msdyn_FSDemoDataRequest");
  }

  static fromResponse(data: unknown): msdyn_FSDemoDataRequestResponse {
    return new msdyn_FSDemoDataRequestResponse(
      responseObject<msdyn_FSDemoDataRequestResponseData>(data)
    );
  }
}
