import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_KnowledgeHarvestFetchData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_KnowledgeHarvestFetchDataRequestParameters {
  msdyn_additionalInformation?: string;
  msdyn_entityName: string;
  msdyn_entityId: string;
}

/**
 * msdyn_KnowledgeHarvestFetchData request message
 *
 * Web API Action: msdyn_KnowledgeHarvestFetchData
 */
export class msdyn_KnowledgeHarvestFetchDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_KnowledgeHarvestFetchDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_KnowledgeHarvestFetchDataRequestParameters>;

  constructor(parameters: msdyn_KnowledgeHarvestFetchDataRequestParameters) {
    super("msdyn_KnowledgeHarvestFetchData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_KnowledgeHarvestFetchData`;

    const body = requestBody({
      msdyn_additionalInformation: this.Parameters.msdyn_additionalInformation,
      msdyn_entityName: this.Parameters.msdyn_entityName,
      msdyn_entityId: this.Parameters.msdyn_entityId,
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

  async parseResponse(response: Response): Promise<msdyn_KnowledgeHarvestFetchDataResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_KnowledgeHarvestFetchDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_KnowledgeHarvestFetchData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_KnowledgeHarvestFetchDataResult {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * msdyn_KnowledgeHarvestFetchData response message
 *
 * `result` is the value the msdyn_KnowledgeHarvestFetchData action returns (see {@link msdyn_KnowledgeHarvestFetchDataResult}).
 */
export class msdyn_KnowledgeHarvestFetchDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_KnowledgeHarvestFetchDataResult) {
    super("msdyn_KnowledgeHarvestFetchData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_KnowledgeHarvestFetchDataResponse {
    return new msdyn_KnowledgeHarvestFetchDataResponse(
      data as msdyn_KnowledgeHarvestFetchDataResult
    );
  }
}
