import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * GetHostedRpaCapacity request message
 *
 * Web API Function: GetHostedRpaCapacity
 */
export class GetHostedRpaCapacityRequest
  extends OrganizationRequest
  implements Executable<GetHostedRpaCapacityResponse>
{
  constructor() {
    super("GetHostedRpaCapacity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetHostedRpaCapacity`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetHostedRpaCapacityResponse> {
    // The body is the complex value, with its @odata.context
    return GetHostedRpaCapacityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetHostedRpaCapacity function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetHostedRpaCapacityResult {
  "@odata.context"?: string;
  availableCapacity: number;
  failedToGetCapacity: boolean;
  hostedGroupCount: number;
  hostedMachineCount: number;
  hostedMachineGroupsBotCount: number;
  isPayGo: boolean;
  totalEnvironmentAddOns: number;
}

/**
 * GetHostedRpaCapacity response message
 *
 * `result` is the value the GetHostedRpaCapacity function returns (see {@link GetHostedRpaCapacityResult}).
 */
export class GetHostedRpaCapacityResponse extends OrganizationResponse {
  constructor(public result: GetHostedRpaCapacityResult) {
    super("GetHostedRpaCapacity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetHostedRpaCapacityResponse {
    return new GetHostedRpaCapacityResponse(data as GetHostedRpaCapacityResult);
  }
}
