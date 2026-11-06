import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetBoolFCSValueResponse as msdyn_GetBoolFCSValueResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetBoolFCSValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetBoolFCSValueRequestParameters {
  msdyn_BoolFCSKey: string;
  msdyn_BoolFCSNamespace: string;
}

/**
 * msdyn_GetBoolFCSValue request message
 *
 * Web API Action: msdyn_GetBoolFCSValue
 */
export class msdyn_GetBoolFCSValueRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetBoolFCSValueResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetBoolFCSValueRequestParameters>;

  constructor(parameters: msdyn_GetBoolFCSValueRequestParameters) {
    super("msdyn_GetBoolFCSValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBoolFCSValue`;

    const body = requestBody({
      msdyn_BoolFCSKey: this.Parameters.msdyn_BoolFCSKey,
      msdyn_BoolFCSNamespace: this.Parameters.msdyn_BoolFCSNamespace,
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

  async parseResponse(response: Response): Promise<msdyn_GetBoolFCSValueResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetBoolFCSValueResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetBoolFCSValue response message
 */
export class msdyn_GetBoolFCSValueResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetBoolFCSValueResponseData) {
    super("msdyn_GetBoolFCSValue");
  }

  static fromResponse(data: unknown): msdyn_GetBoolFCSValueResponse {
    return new msdyn_GetBoolFCSValueResponse(
      responseObject<msdyn_GetBoolFCSValueResponseData>(data)
    );
  }
}
