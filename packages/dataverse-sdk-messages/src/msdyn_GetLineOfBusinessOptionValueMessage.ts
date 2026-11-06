import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetLineOfBusinessOptionValueResponse as msdyn_GetLineOfBusinessOptionValueResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetLineOfBusinessOptionValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetLineOfBusinessOptionValueRequestParameters {
  RequestPayload: string;
}

/**
 * msdyn_GetLineOfBusinessOptionValue request message
 *
 * Web API Action: msdyn_GetLineOfBusinessOptionValue
 */
export class msdyn_GetLineOfBusinessOptionValueRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetLineOfBusinessOptionValueResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetLineOfBusinessOptionValueRequestParameters>;

  constructor(parameters: msdyn_GetLineOfBusinessOptionValueRequestParameters) {
    super("msdyn_GetLineOfBusinessOptionValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLineOfBusinessOptionValue`;

    const body = requestBody({
      RequestPayload: this.Parameters.RequestPayload,
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

  async parseResponse(response: Response): Promise<msdyn_GetLineOfBusinessOptionValueResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetLineOfBusinessOptionValueResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetLineOfBusinessOptionValue response message
 */
export class msdyn_GetLineOfBusinessOptionValueResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetLineOfBusinessOptionValueResponseData) {
    super("msdyn_GetLineOfBusinessOptionValue");
  }

  static fromResponse(data: unknown): msdyn_GetLineOfBusinessOptionValueResponse {
    return new msdyn_GetLineOfBusinessOptionValueResponse(
      responseObject<msdyn_GetLineOfBusinessOptionValueResponseData>(data)
    );
  }
}
