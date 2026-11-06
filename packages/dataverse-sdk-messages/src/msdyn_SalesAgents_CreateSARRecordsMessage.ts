import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_CreateSARRecords message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_CreateSARRecordsRequestParameters {
  msdyn_InputPayload: string;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_CreateSARRecords request message
 *
 * Web API Action: msdyn_SalesAgents_CreateSARRecords
 */
export class msdyn_SalesAgents_CreateSARRecordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_CreateSARRecordsResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_CreateSARRecordsRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_CreateSARRecordsRequestParameters) {
    super("msdyn_SalesAgents_CreateSARRecords", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARRecords`;

    const body = requestBody({
      msdyn_InputPayload: this.Parameters.msdyn_InputPayload,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_CreateSARRecordsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesAgents_CreateSARRecordsResponse.fromResponse(text ? JSON.parse(text) : {});
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
