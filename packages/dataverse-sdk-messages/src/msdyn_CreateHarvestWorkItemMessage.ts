import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CreateHarvestWorkItemResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateHarvestWorkItem action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateHarvestWorkItemResult {
  "@odata.context"?: string;
  Response6: string;
  usage: string;
}

/**
 * msdyn_CreateHarvestWorkItem response message
 *
 * `result` is the value the msdyn_CreateHarvestWorkItem action returns (see {@link msdyn_CreateHarvestWorkItemResult}).
 */
export class msdyn_CreateHarvestWorkItemResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateHarvestWorkItemResult) {
    super("msdyn_CreateHarvestWorkItem");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateHarvestWorkItemResponse {
    return new msdyn_CreateHarvestWorkItemResponse(data as msdyn_CreateHarvestWorkItemResult);
  }
}
