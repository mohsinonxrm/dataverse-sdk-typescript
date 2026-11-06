import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_retrieveConnections action
 */
export interface msdyn_retrieveConnectionsResponse {
  Connections: string;
}

/**
 * Parameters of the msdyn_retrieveConnections action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_retrieveConnectionsActionParameters {
  smtpAdress: string;
  CrmRecord?: EntityReference | AnyEntityPayload;
  callerFeature?: string;
}

/**
 * msdyn_retrieveConnections action
 *
 * Unbound action
 */
export class msdyn_retrieveConnectionsAction implements Executable<msdyn_retrieveConnectionsResponse> {
  constructor(public readonly parameters: msdyn_retrieveConnectionsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_retrieveConnections`;

    const body = requestBody({
      smtpAdress: this.parameters.smtpAdress,
      CrmRecord: this.parameters.CrmRecord,
      callerFeature: this.parameters.callerFeature,
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

  async parseResponse(response: Response): Promise<msdyn_retrieveConnectionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_retrieveConnectionsResponse;
    return (await response.json()) as msdyn_retrieveConnectionsResponse;
  }
}
