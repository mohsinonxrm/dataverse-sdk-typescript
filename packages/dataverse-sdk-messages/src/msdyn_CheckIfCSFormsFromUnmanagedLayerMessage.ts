import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckIfCSFormsFromUnmanagedLayer request message
 *
 * Web API Action: msdyn_CheckIfCSFormsFromUnmanagedLayer
 */
export class msdyn_CheckIfCSFormsFromUnmanagedLayerRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfCSFormsFromUnmanagedLayerResponse>
{
  constructor() {
    super("msdyn_CheckIfCSFormsFromUnmanagedLayer");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfCSFormsFromUnmanagedLayer`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfCSFormsFromUnmanagedLayerResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfCSFormsFromUnmanagedLayerResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckIfCSFormsFromUnmanagedLayer action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfCSFormsFromUnmanagedLayerResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfCSFormsFromUnmanagedLayer response message
 *
 * `result` is the value the msdyn_CheckIfCSFormsFromUnmanagedLayer action returns (see {@link msdyn_CheckIfCSFormsFromUnmanagedLayerResult}).
 */
export class msdyn_CheckIfCSFormsFromUnmanagedLayerResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfCSFormsFromUnmanagedLayerResult) {
    super("msdyn_CheckIfCSFormsFromUnmanagedLayer");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfCSFormsFromUnmanagedLayerResponse {
    return new msdyn_CheckIfCSFormsFromUnmanagedLayerResponse(
      data as msdyn_CheckIfCSFormsFromUnmanagedLayerResult
    );
  }
}
