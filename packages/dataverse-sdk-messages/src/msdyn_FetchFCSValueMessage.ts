import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FetchFCSValueResponse as msdyn_FetchFCSValueResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FetchFCSValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchFCSValueRequestParameters {
  Namespace: string;
  Key: string;
}

/**
 * msdyn_FetchFCSValue request message
 *
 * Web API Action: msdyn_FetchFCSValue
 */
export class msdyn_FetchFCSValueRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchFCSValueResponse>
{
  declare readonly Parameters: Readonly<msdyn_FetchFCSValueRequestParameters>;

  constructor(parameters: msdyn_FetchFCSValueRequestParameters) {
    super("msdyn_FetchFCSValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchFCSValue`;

    const body = requestBody({
      Namespace: this.Parameters.Namespace,
      Key: this.Parameters.Key,
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

  async parseResponse(response: Response): Promise<msdyn_FetchFCSValueResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_FetchFCSValueResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_FetchFCSValue response message
 */
export class msdyn_FetchFCSValueResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchFCSValueResponseData) {
    super("msdyn_FetchFCSValue");
  }

  static fromResponse(data: unknown): msdyn_FetchFCSValueResponse {
    return new msdyn_FetchFCSValueResponse(responseObject<msdyn_FetchFCSValueResponseData>(data));
  }
}
