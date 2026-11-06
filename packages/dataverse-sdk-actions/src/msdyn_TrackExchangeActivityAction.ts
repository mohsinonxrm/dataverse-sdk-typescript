import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_TrackExchangeActivity action
 */
export interface msdyn_TrackExchangeActivityResponse {
  ExchangeResponse: string;
}

/**
 * Parameters of the msdyn_TrackExchangeActivity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TrackExchangeActivityActionParameters {
  ExchangeItemId?: string;
  Regarding?: EntityReference | AnyEntityPayload;
  EntitySetName?: string;
}

/**
 * msdyn_TrackExchangeActivity action
 *
 * Unbound action
 */
export class msdyn_TrackExchangeActivityAction implements Executable<msdyn_TrackExchangeActivityResponse> {
  constructor(public readonly parameters: msdyn_TrackExchangeActivityActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TrackExchangeActivity`;

    const body = requestBody({
      ExchangeItemId: this.parameters.ExchangeItemId,
      Regarding: this.parameters.Regarding,
      EntitySetName: this.parameters.EntitySetName,
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

  async parseResponse(response: Response): Promise<msdyn_TrackExchangeActivityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TrackExchangeActivityResponse;
    return (await response.json()) as msdyn_TrackExchangeActivityResponse;
  }
}
