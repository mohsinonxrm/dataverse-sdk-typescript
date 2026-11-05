import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { msdyn_retrieveConnectionsResponse as msdyn_retrieveConnectionsResponseData } from "./types/index.js";

/**
 * msdyn_retrieveConnections request message
 *
 * Web API Action: msdyn_retrieveConnections
 */
export class msdyn_retrieveConnectionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_retrieveConnectionsResponse>
{
  constructor(
    public smtpAdress: string,
    public crmRecord: EntityReference,
    public callerFeature: string
  ) {
    super("msdyn_retrieveConnections");
  }

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
    return msdyn_retrieveConnectionsResponse.fromResponse(data);
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
