import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetFCSValueResponse as msdyn_GetFCSValueResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetFCSValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFCSValueRequestParameters {
  Key: string;
  Namespace: string;
}

/**
 * msdyn_GetFCSValue request message
 *
 * Web API Action: msdyn_GetFCSValue
 */
export class msdyn_GetFCSValueRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFCSValueResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetFCSValueRequestParameters>;

  constructor(parameters: msdyn_GetFCSValueRequestParameters) {
    super("msdyn_GetFCSValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFCSValue`;

    const body = requestBody({
      Key: this.Parameters.Key,
      Namespace: this.Parameters.Namespace,
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

  async parseResponse(response: Response): Promise<msdyn_GetFCSValueResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetFCSValueResponse.fromResponse({});
    return msdyn_GetFCSValueResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetFCSValue response message
 */
export class msdyn_GetFCSValueResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFCSValueResponseData) {
    super("msdyn_GetFCSValue");
  }

  static fromResponse(data: unknown): msdyn_GetFCSValueResponse {
    return new msdyn_GetFCSValueResponse(responseObject<msdyn_GetFCSValueResponseData>(data));
  }
}
