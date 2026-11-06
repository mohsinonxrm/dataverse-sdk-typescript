import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_recurringsegmentaction action
 */
export interface msdyn_recurringsegmentactionResponse {
  result: string;
}

/**
 * Parameters of the msdyn_recurringsegmentaction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_recurringsegmentactionActionParameters {
  payload: string;
  operationType: string;
  segmentId: string;
}

/**
 * msdyn_recurringsegmentaction action
 *
 * Unbound action
 */
export class msdyn_recurringsegmentactionAction implements Executable<msdyn_recurringsegmentactionResponse> {
  constructor(public readonly parameters: msdyn_recurringsegmentactionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_recurringsegmentaction`;

    const body = requestBody({
      payload: this.parameters.payload,
      operationType: this.parameters.operationType,
      segmentId: this.parameters.segmentId,
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

  async parseResponse(response: Response): Promise<msdyn_recurringsegmentactionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_recurringsegmentactionResponse;
    return (await response.json()) as msdyn_recurringsegmentactionResponse;
  }
}
