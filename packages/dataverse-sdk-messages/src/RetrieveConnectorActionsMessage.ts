import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the RetrieveConnectorActions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveConnectorActionsRequestParameters {
  ConnectionReference: EntityReference | AnyEntityPayload;
}

/**
 * RetrieveConnectorActions request message
 *
 * Web API Action: RetrieveConnectorActions
 */
export class RetrieveConnectorActionsRequest
  extends OrganizationRequest
  implements Executable<RetrieveConnectorActionsResponse>
{
  declare readonly Parameters: Readonly<RetrieveConnectorActionsRequestParameters>;

  constructor(parameters: RetrieveConnectorActionsRequestParameters) {
    super("RetrieveConnectorActions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveConnectorActions`;

    const body = requestBody({
      ConnectionReference: this.Parameters.ConnectionReference,
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

  async parseResponse(response: Response): Promise<RetrieveConnectorActionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return RetrieveConnectorActionsResponse.fromResponse({});
    return RetrieveConnectorActionsResponse.fromResponse(await response.json());
  }
}

/**
 * RetrieveConnectorActions response message
 */
export class RetrieveConnectorActionsResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("RetrieveConnectorActions");
  }

  static fromResponse(data: unknown): RetrieveConnectorActionsResponse {
    return new RetrieveConnectorActionsResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
