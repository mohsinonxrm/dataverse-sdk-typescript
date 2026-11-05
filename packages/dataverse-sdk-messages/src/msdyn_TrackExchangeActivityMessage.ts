import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_TrackExchangeActivity request message
 *
 * Web API Action: msdyn_TrackExchangeActivity
 */
export class msdyn_TrackExchangeActivityRequest
  extends OrganizationRequest
  implements Executable<msdyn_TrackExchangeActivityResponse>
{
  constructor(
    public exchangeItemId: string,
    public regarding: EntityReference,
    public entitySetName: string
  ) {
    super("msdyn_TrackExchangeActivity");
  }

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
    return msdyn_TrackExchangeActivityResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ExchangeItemId: this.exchangeItemId,
      Regarding: this.regarding,
      EntitySetName: this.entitySetName,
    };
  }
}

/**
 * msdyn_TrackExchangeActivity response message
 */
export class msdyn_TrackExchangeActivityResponse extends OrganizationResponse {
  constructor(public result: msdyn_TrackExchangeActivityResponse) {
    super("msdyn_TrackExchangeActivity");
  }

  static fromResponse(data: unknown): msdyn_TrackExchangeActivityResponse {
    return new msdyn_TrackExchangeActivityResponse((data as any).value);
  }
}
