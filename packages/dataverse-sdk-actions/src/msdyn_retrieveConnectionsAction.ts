import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_retrieveConnections action
 */
export interface msdyn_retrieveConnectionsResponse {
  Connections: string;
}

/**
 * msdyn_retrieveConnections action
 *
 * Unbound action
 */
export class msdyn_retrieveConnectionsAction implements Executable<msdyn_retrieveConnectionsResponse> {
  constructor(
    public readonly smtpAdress: string,
    public readonly crmRecord: EntityReference,
    public readonly callerFeature: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_retrieveConnections`;

    const body: Record<string, unknown> = {
      smtpAdress: this.smtpAdress,
      CrmRecord: this.crmRecord,
      callerFeature: this.callerFeature,
    };

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
    const data = await response.json();
    return data as msdyn_retrieveConnectionsResponse;
  }
}
