import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the RetrieveFlowUpdates message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveFlowUpdatesRequestParameters {
  ObjectId: string;
}

/**
 * RetrieveFlowUpdates request message
 *
 * Web API Action: RetrieveFlowUpdates
 */
export class RetrieveFlowUpdatesRequest
  extends OrganizationRequest
  implements Executable<RetrieveFlowUpdatesResponse>
{
  declare readonly Parameters: Readonly<RetrieveFlowUpdatesRequestParameters>;

  constructor(parameters: RetrieveFlowUpdatesRequestParameters) {
    super("RetrieveFlowUpdates", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFlowUpdates`;

    const body = requestBody({
      ObjectId: this.Parameters.ObjectId,
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

  async parseResponse(response: Response): Promise<RetrieveFlowUpdatesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return RetrieveFlowUpdatesResponse.fromResponse(text ? JSON.parse(text) : {});
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
