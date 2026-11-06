import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_SiteMapRepairResponse as msdyn_SiteMapRepairResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SiteMapRepair message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SiteMapRepairRequestParameters {
  AnalysisResult?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_SiteMapRepair request message
 *
 * Web API Action: msdyn_SiteMapRepair
 */
export class msdyn_SiteMapRepairRequest
  extends OrganizationRequest
  implements Executable<msdyn_SiteMapRepairResponse>
{
  declare readonly Parameters: Readonly<msdyn_SiteMapRepairRequestParameters>;

  constructor(parameters: msdyn_SiteMapRepairRequestParameters = {}) {
    super("msdyn_SiteMapRepair", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SiteMapRepair`;

    const body = requestBody({
      AnalysisResult: this.Parameters.AnalysisResult,
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

  async parseResponse(response: Response): Promise<msdyn_SiteMapRepairResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SiteMapRepairResponse.fromResponse({});
    return msdyn_SiteMapRepairResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SiteMapRepair response message
 */
export class msdyn_SiteMapRepairResponse extends OrganizationResponse {
  constructor(public result: msdyn_SiteMapRepairResponseData) {
    super("msdyn_SiteMapRepair");
  }

  static fromResponse(data: unknown): msdyn_SiteMapRepairResponse {
    return new msdyn_SiteMapRepairResponse(responseObject<msdyn_SiteMapRepairResponseData>(data));
  }
}
