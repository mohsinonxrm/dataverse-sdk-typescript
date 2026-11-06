import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_gettransformationconnections action
 */
export interface msdyn_gettransformationconnectionsResponse {
  ConnectionsJson: string;
  CreateConnectionUrl: string;
  IsCurrentConnectionValid: boolean;
  Status: string;
}

/**
 * Parameters of the msdyn_gettransformationconnections action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_gettransformationconnectionsActionParameters {
  ConnectorId: string;
  EnvironmentId?: string;
  CurrentConnectionId?: string;
  ConnectionReferenceLogicalName?: string;
}

/**
 * msdyn_gettransformationconnections action
 *
 * Unbound action
 */
export class msdyn_gettransformationconnectionsAction implements Executable<msdyn_gettransformationconnectionsResponse> {
  constructor(public readonly parameters: msdyn_gettransformationconnectionsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_gettransformationconnections`;

    const body = requestBody({
      ConnectorId: this.parameters.ConnectorId,
      EnvironmentId: this.parameters.EnvironmentId,
      CurrentConnectionId: this.parameters.CurrentConnectionId,
      ConnectionReferenceLogicalName: this.parameters.ConnectionReferenceLogicalName,
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
    if (response.status === 204) return {} as msdyn_gettransformationconnectionsResponse;
    return (await response.json()) as msdyn_gettransformationconnectionsResponse;
  }
}
