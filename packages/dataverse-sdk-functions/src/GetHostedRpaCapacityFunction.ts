import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetHostedRpaCapacity function
 */
export interface GetHostedRpaCapacityResponse {
  failedToGetCapacity: boolean;
  isPayGo: boolean;
  hostedMachineGroupsBotCount: number;
  hostedMachineCount: number;
  hostedGroupCount: number;
  totalEnvironmentAddOns: number;
  availableCapacity: number;
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
    const data = await response.json();
    return data as GetHostedRpaCapacityResponse;
  }
}
