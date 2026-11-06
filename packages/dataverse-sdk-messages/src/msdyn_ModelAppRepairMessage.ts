import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_ModelAppRepairResponse as msdyn_ModelAppRepairResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ModelAppRepair message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ModelAppRepairRequestParameters {
  AnalysisResult?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_ModelAppRepair request message
 *
 * Web API Action: msdyn_ModelAppRepair
 */
export class msdyn_ModelAppRepairRequest
  extends OrganizationRequest
  implements Executable<msdyn_ModelAppRepairResponse>
{
  declare readonly Parameters: Readonly<msdyn_ModelAppRepairRequestParameters>;

  constructor(parameters: msdyn_ModelAppRepairRequestParameters = {}) {
    super("msdyn_ModelAppRepair", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ModelAppRepair`;

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

  async parseResponse(response: Response): Promise<msdyn_ModelAppRepairResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ModelAppRepairResponse.fromResponse({});
    return msdyn_ModelAppRepairResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ModelAppRepair response message
 */
export class msdyn_ModelAppRepairResponse extends OrganizationResponse {
  constructor(public result: msdyn_ModelAppRepairResponseData) {
    super("msdyn_ModelAppRepair");
  }

  static fromResponse(data: unknown): msdyn_ModelAppRepairResponse {
    return new msdyn_ModelAppRepairResponse(responseObject<msdyn_ModelAppRepairResponseData>(data));
  }
}
