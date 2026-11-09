import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_retrieveConnections message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_retrieveConnectionsRequestParameters {
  smtpAdress: string;
  CrmRecord?: EntityReference | AnyEntityPayload;
  callerFeature?: string;
}

/**
 * msdyn_retrieveConnections request message
 *
 * Web API Action: msdyn_retrieveConnections
 */
export class msdyn_retrieveConnectionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_retrieveConnectionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_retrieveConnectionsRequestParameters>;

  constructor(parameters: msdyn_retrieveConnectionsRequestParameters) {
    super("msdyn_retrieveConnections", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_retrieveConnections`;

    const body = requestBody({
      smtpAdress: this.Parameters.smtpAdress,
      CrmRecord: this.Parameters.CrmRecord,
      callerFeature: this.Parameters.callerFeature,
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
    // The body is the complex value, with its @odata.context
    return msdyn_retrieveConnectionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_retrieveConnections action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_retrieveConnectionsResult {
  "@odata.context"?: string;
  Connections: string;
}

/**
 * msdyn_retrieveConnections response message
 *
 * `result` is the value the msdyn_retrieveConnections action returns (see {@link msdyn_retrieveConnectionsResult}).
 */
export class msdyn_retrieveConnectionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_retrieveConnectionsResult) {
    super("msdyn_retrieveConnections");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_retrieveConnectionsResponse {
    return new msdyn_retrieveConnectionsResponse(data as msdyn_retrieveConnectionsResult);
  }
}
