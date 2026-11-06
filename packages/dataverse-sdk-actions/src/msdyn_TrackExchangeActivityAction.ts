import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_TrackExchangeActivity action
 */
export interface msdyn_TrackExchangeActivityResponse {
  ExchangeResponse: string;
}

/**
 * msdyn_TrackExchangeActivity action
 *
 * Unbound action
 */
export class msdyn_TrackExchangeActivityAction implements Executable<msdyn_TrackExchangeActivityResponse> {
  constructor(
    public readonly exchangeItemId?: string,
    public readonly regarding?: EntityReference | AnyEntityPayload,
    public readonly entitySetName?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TrackExchangeActivity`;

    const body: Record<string, unknown> = {
      ExchangeItemId: this.exchangeItemId,
      Regarding: this.regarding,
      EntitySetName: this.entitySetName,
    };

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
    const data = await response.json();
    return data as msdyn_TrackExchangeActivityResponse;
  }
}
