import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_gettransformationconnectionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_gettransformationconnections action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_gettransformationconnectionsResult {
  "@odata.context"?: string;
  ConnectionsJson: string;
  CreateConnectionUrl: string;
  IsCurrentConnectionValid: boolean;
  Status: string;
}

/**
 * msdyn_gettransformationconnections response message
 *
 * `result` is the value the msdyn_gettransformationconnections action returns (see {@link msdyn_gettransformationconnectionsResult}).
 */
export class msdyn_gettransformationconnectionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_gettransformationconnectionsResult) {
    super("msdyn_gettransformationconnections");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_gettransformationconnectionsResponse {
    return new msdyn_gettransformationconnectionsResponse(
      data as msdyn_gettransformationconnectionsResult
    );
  }
}
