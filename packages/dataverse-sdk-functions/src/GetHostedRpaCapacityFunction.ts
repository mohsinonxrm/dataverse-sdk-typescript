import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the GetHostedRpaCapacity function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetHostedRpaCapacityResponse {
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
 * GetHostedRpaCapacity function
 *
 * Unbound function
 */
export class GetHostedRpaCapacityFunction implements Executable<GetHostedRpaCapacityResponse> {
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
    return (await response.json()) as GetHostedRpaCapacityResponse;
  }
}
