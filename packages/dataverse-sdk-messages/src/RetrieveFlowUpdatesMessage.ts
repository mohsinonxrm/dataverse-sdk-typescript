import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * RetrieveFlowUpdates request message
 *
 * Web API Action: RetrieveFlowUpdates
 */
export class RetrieveFlowUpdatesRequest
  extends OrganizationRequest
  implements Executable<RetrieveFlowUpdatesResponse>
{
  constructor(public objectId: string) {
    super("RetrieveFlowUpdates");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFlowUpdates`;

    const body: Record<string, unknown> = {
      ObjectId: this.objectId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RetrieveFlowUpdatesResponse> {
    const data = await response.json();
    return RetrieveFlowUpdatesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ObjectId: this.objectId,
    };
  }
}

/**
 * RetrieveFlowUpdates response message
 */
export class RetrieveFlowUpdatesResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("RetrieveFlowUpdates");
  }

  static fromResponse(data: unknown): RetrieveFlowUpdatesResponse {
    return new RetrieveFlowUpdatesResponse((data as any).value);
  }
}
