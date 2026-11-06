import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_URFirstPartyIntegrationApiResponse as msdyn_URFirstPartyIntegrationApiResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_URFirstPartyIntegrationApi message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_URFirstPartyIntegrationApiRequestParameters {
  MethodName: string;
  InputParameter?: string;
}

/**
 * msdyn_URFirstPartyIntegrationApi request message
 *
 * Web API Action: msdyn_URFirstPartyIntegrationApi
 */
export class msdyn_URFirstPartyIntegrationApiRequest
  extends OrganizationRequest
  implements Executable<msdyn_URFirstPartyIntegrationApiResponse>
{
  declare readonly Parameters: Readonly<msdyn_URFirstPartyIntegrationApiRequestParameters>;

  constructor(parameters: msdyn_URFirstPartyIntegrationApiRequestParameters) {
    super("msdyn_URFirstPartyIntegrationApi", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_URFirstPartyIntegrationApi`;

    const body = requestBody({
      MethodName: this.Parameters.MethodName,
      InputParameter: this.Parameters.InputParameter,
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

  async parseResponse(response: Response): Promise<msdyn_URFirstPartyIntegrationApiResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_URFirstPartyIntegrationApiResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_URFirstPartyIntegrationApi response message
 */
export class msdyn_URFirstPartyIntegrationApiResponse extends OrganizationResponse {
  constructor(public result: msdyn_URFirstPartyIntegrationApiResponseData) {
    super("msdyn_URFirstPartyIntegrationApi");
  }

  static fromResponse(data: unknown): msdyn_URFirstPartyIntegrationApiResponse {
    return new msdyn_URFirstPartyIntegrationApiResponse(
      responseObject<msdyn_URFirstPartyIntegrationApiResponseData>(data)
    );
  }
}
