import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * RetrieveConnectorActions request message
 *
 * Web API Action: RetrieveConnectorActions
 */
export class RetrieveConnectorActionsRequest
  extends OrganizationRequest
  implements Executable<RetrieveConnectorActionsResponse>
{
  constructor(public connectionReference: EntityReference) {
    super("RetrieveConnectorActions");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveConnectorActions`;

    const body: Record<string, unknown> = {
      ConnectionReference: this.connectionReference,
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

  async parseResponse(response: Response): Promise<RetrieveConnectorActionsResponse> {
    const data = await response.json();
    return RetrieveConnectorActionsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ConnectionReference: this.connectionReference,
    };
  }
}

/**
 * RetrieveConnectorActions response message
 */
export class RetrieveConnectorActionsResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("RetrieveConnectorActions");
  }

  static fromResponse(data: unknown): RetrieveConnectorActionsResponse {
    return new RetrieveConnectorActionsResponse((data as any).value);
  }
}
