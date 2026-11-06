import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_TrackExchangeActivityResponse as msdyn_TrackExchangeActivityResponseData } from "./types/index.js";

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
    public exchangeItemId?: string,
    public regarding?: EntityReference | AnyEntityPayload,
    public entitySetName?: string
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
}

/**
 * msdyn_TrackExchangeActivity response message
 */
export class msdyn_TrackExchangeActivityResponse extends OrganizationResponse {
  constructor(public result: msdyn_TrackExchangeActivityResponseData) {
    super("msdyn_TrackExchangeActivity");
  }

  static fromResponse(data: unknown): msdyn_TrackExchangeActivityResponse {
    return new msdyn_TrackExchangeActivityResponse(
      responseObject<msdyn_TrackExchangeActivityResponseData>(data)
    );
  }
}
