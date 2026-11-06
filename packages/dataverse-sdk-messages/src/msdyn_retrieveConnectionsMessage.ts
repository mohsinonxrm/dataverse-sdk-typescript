import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_retrieveConnectionsResponse as msdyn_retrieveConnectionsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_retrieveConnectionsResponse.fromResponse({});
    return msdyn_retrieveConnectionsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_retrieveConnections response message
 */
export class msdyn_retrieveConnectionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_retrieveConnectionsResponseData) {
    super("msdyn_retrieveConnections");
  }

  static fromResponse(data: unknown): msdyn_retrieveConnectionsResponse {
    return new msdyn_retrieveConnectionsResponse(
      responseObject<msdyn_retrieveConnectionsResponseData>(data)
    );
  }
}
