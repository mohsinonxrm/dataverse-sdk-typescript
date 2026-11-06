import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_EnableSharePoint request message
 *
 * Web API Action: msdyn_EnableSharePoint
 */
export class msdyn_EnableSharePointRequest
  extends OrganizationRequest
  implements Executable<msdyn_EnableSharePointResponse>
{
  constructor() {
    super("msdyn_EnableSharePoint");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EnableSharePoint`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_EnableSharePointResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_EnableSharePointResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_EnableSharePoint action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EnableSharePointResult {
  "@odata.context"?: string;
  OperationResult: boolean;
}

/**
 * msdyn_EnableSharePoint response message
 *
 * `result` is the value the msdyn_EnableSharePoint action returns (see {@link msdyn_EnableSharePointResult}).
 */
export class msdyn_EnableSharePointResponse extends OrganizationResponse {
  constructor(public result: msdyn_EnableSharePointResult) {
    super("msdyn_EnableSharePoint");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_EnableSharePointResponse {
    return new msdyn_EnableSharePointResponse(data as msdyn_EnableSharePointResult);
  }
}
