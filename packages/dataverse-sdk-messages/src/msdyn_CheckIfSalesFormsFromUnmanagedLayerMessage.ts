import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckIfSalesFormsFromUnmanagedLayer request message
 *
 * Web API Action: msdyn_CheckIfSalesFormsFromUnmanagedLayer
 */
export class msdyn_CheckIfSalesFormsFromUnmanagedLayerRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse>
{
  constructor() {
    super("msdyn_CheckIfSalesFormsFromUnmanagedLayer");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfSalesFormsFromUnmanagedLayer`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckIfSalesFormsFromUnmanagedLayer action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfSalesFormsFromUnmanagedLayerResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfSalesFormsFromUnmanagedLayer response message
 *
 * `result` is the value the msdyn_CheckIfSalesFormsFromUnmanagedLayer action returns (see {@link msdyn_CheckIfSalesFormsFromUnmanagedLayerResult}).
 */
export class msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfSalesFormsFromUnmanagedLayerResult) {
    super("msdyn_CheckIfSalesFormsFromUnmanagedLayer");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse {
    return new msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse(
      data as msdyn_CheckIfSalesFormsFromUnmanagedLayerResult
    );
  }
}
