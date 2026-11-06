import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_UpdateContactProfilerDetailResponse as msdyn_SalesAgents_UpdateContactProfilerDetailResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_UpdateContactProfilerDetail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_UpdateContactProfilerDetailRequestParameters {
  msdyn_Operation: string;
  msdyn_RegardingEntity: string;
  msdyn_RegardingId: string;
  msdyn_ContactProfilerDetailId: string;
}

/**
 * msdyn_SalesAgents_UpdateContactProfilerDetail request message
 *
 * Web API Action: msdyn_SalesAgents_UpdateContactProfilerDetail
 */
export class msdyn_SalesAgents_UpdateContactProfilerDetailRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_UpdateContactProfilerDetailResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_UpdateContactProfilerDetailRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_UpdateContactProfilerDetailRequestParameters) {
    super("msdyn_SalesAgents_UpdateContactProfilerDetail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_UpdateContactProfilerDetail`;

    const body = requestBody({
      msdyn_Operation: this.Parameters.msdyn_Operation,
      msdyn_RegardingEntity: this.Parameters.msdyn_RegardingEntity,
      msdyn_RegardingId: this.Parameters.msdyn_RegardingId,
      msdyn_ContactProfilerDetailId: this.Parameters.msdyn_ContactProfilerDetailId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_UpdateContactProfilerDetailResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_UpdateContactProfilerDetailResponse.fromResponse({});
    return msdyn_SalesAgents_UpdateContactProfilerDetailResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesAgents_UpdateContactProfilerDetail response message
 */
export class msdyn_SalesAgents_UpdateContactProfilerDetailResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_UpdateContactProfilerDetailResponseData) {
    super("msdyn_SalesAgents_UpdateContactProfilerDetail");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_UpdateContactProfilerDetailResponse {
    return new msdyn_SalesAgents_UpdateContactProfilerDetailResponse(
      responseObject<msdyn_SalesAgents_UpdateContactProfilerDetailResponseData>(data)
    );
  }
}
