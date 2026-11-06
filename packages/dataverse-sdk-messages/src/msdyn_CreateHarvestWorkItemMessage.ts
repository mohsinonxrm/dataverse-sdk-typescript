import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateHarvestWorkItemResponse as msdyn_CreateHarvestWorkItemResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateHarvestWorkItem message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateHarvestWorkItemRequestParameters {
  CSCopilotRequest5: string;
}

/**
 * msdyn_CreateHarvestWorkItem request message
 *
 * Web API Action: msdyn_CreateHarvestWorkItem
 */
export class msdyn_CreateHarvestWorkItemRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateHarvestWorkItemResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateHarvestWorkItemRequestParameters>;

  constructor(parameters: msdyn_CreateHarvestWorkItemRequestParameters) {
    super("msdyn_CreateHarvestWorkItem", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateHarvestWorkItem`;

    const body = requestBody({
      CSCopilotRequest5: this.Parameters.CSCopilotRequest5,
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

  async parseResponse(response: Response): Promise<msdyn_CreateHarvestWorkItemResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CreateHarvestWorkItemResponse.fromResponse({});
    return msdyn_CreateHarvestWorkItemResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CreateHarvestWorkItem response message
 */
export class msdyn_CreateHarvestWorkItemResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateHarvestWorkItemResponseData) {
    super("msdyn_CreateHarvestWorkItem");
  }

  static fromResponse(data: unknown): msdyn_CreateHarvestWorkItemResponse {
    return new msdyn_CreateHarvestWorkItemResponse(
      responseObject<msdyn_CreateHarvestWorkItemResponseData>(data)
    );
  }
}
