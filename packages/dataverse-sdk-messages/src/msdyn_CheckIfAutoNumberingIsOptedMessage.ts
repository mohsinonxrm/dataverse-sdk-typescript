import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckIfAutoNumberingIsOptedResponse as msdyn_CheckIfAutoNumberingIsOptedResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckIfAutoNumberingIsOpted message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfAutoNumberingIsOptedRequestParameters {
  SolutionId: string;
}

/**
 * msdyn_CheckIfAutoNumberingIsOpted request message
 *
 * Web API Action: msdyn_CheckIfAutoNumberingIsOpted
 */
export class msdyn_CheckIfAutoNumberingIsOptedRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfAutoNumberingIsOptedResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfAutoNumberingIsOptedRequestParameters>;

  constructor(parameters: msdyn_CheckIfAutoNumberingIsOptedRequestParameters) {
    super("msdyn_CheckIfAutoNumberingIsOpted", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfAutoNumberingIsOpted`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckIfAutoNumberingIsOptedResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckIfAutoNumberingIsOptedResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CheckIfAutoNumberingIsOpted response message
 */
export class msdyn_CheckIfAutoNumberingIsOptedResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfAutoNumberingIsOptedResponseData) {
    super("msdyn_CheckIfAutoNumberingIsOpted");
  }

  static fromResponse(data: unknown): msdyn_CheckIfAutoNumberingIsOptedResponse {
    return new msdyn_CheckIfAutoNumberingIsOptedResponse(
      responseObject<msdyn_CheckIfAutoNumberingIsOptedResponseData>(data)
    );
  }
}
