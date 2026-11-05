import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RetrieveFlowUpdatesResponse> {
    const data = await response.json();
    return RetrieveFlowUpdatesResponse.fromResponse(data);
  }
}

/**
 * RetrieveFlowUpdates response message
 */
export class RetrieveFlowUpdatesResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("RetrieveFlowUpdates");
  }

  static fromResponse(data: unknown): RetrieveFlowUpdatesResponse {
    return new RetrieveFlowUpdatesResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
