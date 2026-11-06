import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveEmailNBAResponse as msdyn_RetrieveEmailNBAResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveEmailNBA message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveEmailNBARequestParameters {
  msdyn_RegardingEntityIds: string;
  msdyn_RegardingLogicalName: string;
}

/**
 * msdyn_RetrieveEmailNBA request message
 *
 * Web API Action: msdyn_RetrieveEmailNBA
 */
export class msdyn_RetrieveEmailNBARequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveEmailNBAResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveEmailNBARequestParameters>;

  constructor(parameters: msdyn_RetrieveEmailNBARequestParameters) {
    super("msdyn_RetrieveEmailNBA", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveEmailNBA`;

    const body = requestBody({
      msdyn_RegardingEntityIds: this.Parameters.msdyn_RegardingEntityIds,
      msdyn_RegardingLogicalName: this.Parameters.msdyn_RegardingLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveEmailNBAResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_RetrieveEmailNBAResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_RetrieveEmailNBA response message
 */
export class msdyn_RetrieveEmailNBAResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveEmailNBAResponseData) {
    super("msdyn_RetrieveEmailNBA");
  }

  static fromResponse(data: unknown): msdyn_RetrieveEmailNBAResponse {
    return new msdyn_RetrieveEmailNBAResponse(
      responseObject<msdyn_RetrieveEmailNBAResponseData>(data)
    );
  }
}
