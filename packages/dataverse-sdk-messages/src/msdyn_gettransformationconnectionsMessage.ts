import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_gettransformationconnectionsResponse as msdyn_gettransformationconnectionsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_gettransformationconnections message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_gettransformationconnectionsRequestParameters {
  ConnectorId: string;
  EnvironmentId?: string;
  CurrentConnectionId?: string;
  ConnectionReferenceLogicalName?: string;
}

/**
 * msdyn_gettransformationconnections request message
 *
 * Web API Action: msdyn_gettransformationconnections
 */
export class msdyn_gettransformationconnectionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_gettransformationconnectionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_gettransformationconnectionsRequestParameters>;

  constructor(parameters: msdyn_gettransformationconnectionsRequestParameters) {
    super("msdyn_gettransformationconnections", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_gettransformationconnections`;

    const body = requestBody({
      ConnectorId: this.Parameters.ConnectorId,
      EnvironmentId: this.Parameters.EnvironmentId,
      CurrentConnectionId: this.Parameters.CurrentConnectionId,
      ConnectionReferenceLogicalName: this.Parameters.ConnectionReferenceLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_gettransformationconnectionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_gettransformationconnectionsResponse.fromResponse({});
    return msdyn_gettransformationconnectionsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_gettransformationconnections response message
 */
export class msdyn_gettransformationconnectionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_gettransformationconnectionsResponseData) {
    super("msdyn_gettransformationconnections");
  }

  static fromResponse(data: unknown): msdyn_gettransformationconnectionsResponse {
    return new msdyn_gettransformationconnectionsResponse(
      responseObject<msdyn_gettransformationconnectionsResponseData>(data)
    );
  }
}
