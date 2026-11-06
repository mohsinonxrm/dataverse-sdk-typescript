import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_DisconnectSequence action
 */
export interface msdyn_DisconnectSequenceResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_DisconnectSequence action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DisconnectSequenceActionParameters {
  RegardingEntityId?: string;
  RegardingEntityName?: string;
  SequenceTargetId?: string;
}

/**
 * msdyn_DisconnectSequence action
 *
 * Unbound action
 */
export class msdyn_DisconnectSequenceAction implements Executable<msdyn_DisconnectSequenceResponse> {
  constructor(public readonly parameters: msdyn_DisconnectSequenceActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DisconnectSequence`;

    const body = requestBody({
      RegardingEntityId: this.parameters.RegardingEntityId,
      RegardingEntityName: this.parameters.RegardingEntityName,
      SequenceTargetId: this.parameters.SequenceTargetId,
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

  async parseResponse(response: Response): Promise<msdyn_DisconnectSequenceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_DisconnectSequenceResponse;
    return (await response.json()) as msdyn_DisconnectSequenceResponse;
  }
}
