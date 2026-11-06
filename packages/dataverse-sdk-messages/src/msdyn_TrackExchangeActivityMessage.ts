import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_TrackExchangeActivityResponse as msdyn_TrackExchangeActivityResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TrackExchangeActivity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TrackExchangeActivityRequestParameters {
  ExchangeItemId?: string;
  Regarding?: EntityReference | AnyEntityPayload;
  EntitySetName?: string;
}

/**
 * msdyn_TrackExchangeActivity request message
 *
 * Web API Action: msdyn_TrackExchangeActivity
 */
export class msdyn_TrackExchangeActivityRequest
  extends OrganizationRequest
  implements Executable<msdyn_TrackExchangeActivityResponse>
{
  declare readonly Parameters: Readonly<msdyn_TrackExchangeActivityRequestParameters>;

  constructor(parameters: msdyn_TrackExchangeActivityRequestParameters = {}) {
    super("msdyn_TrackExchangeActivity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TrackExchangeActivity`;

    const body = requestBody({
      ExchangeItemId: this.Parameters.ExchangeItemId,
      Regarding: this.Parameters.Regarding,
      EntitySetName: this.Parameters.EntitySetName,
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
    if (response.status === 204) return msdyn_TrackExchangeActivityResponse.fromResponse({});
    return msdyn_TrackExchangeActivityResponse.fromResponse(await response.json());
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
