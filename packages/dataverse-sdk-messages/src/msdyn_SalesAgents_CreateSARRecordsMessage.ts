import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * msdyn_SalesAgents_CreateSARRecords request message
 *
 * Web API Action: msdyn_SalesAgents_CreateSARRecords
 */
export class msdyn_SalesAgents_CreateSARRecordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_CreateSARRecordsResponse>
{
  constructor(
    public msdyn_InputPayload: string,
    public msdyn_TrackingId: string
  ) {
    super("msdyn_SalesAgents_CreateSARRecords");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARRecords`;

    const body: Record<string, unknown> = {
      msdyn_InputPayload: this.msdyn_InputPayload,
      msdyn_TrackingId: this.msdyn_TrackingId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_CreateSARRecordsResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_CreateSARRecordsResponse.fromResponse(data);
  }
}

/**
 * msdyn_SalesAgents_CreateSARRecords response message
 */
export class msdyn_SalesAgents_CreateSARRecordsResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_SalesAgents_CreateSARRecords");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_CreateSARRecordsResponse {
    return new msdyn_SalesAgents_CreateSARRecordsResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
