import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_TrackExchangeActivityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TrackExchangeActivity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TrackExchangeActivityResult {
  "@odata.context"?: string;
  ExchangeResponse: string;
}

/**
 * msdyn_TrackExchangeActivity response message
 *
 * `result` is the value the msdyn_TrackExchangeActivity action returns (see {@link msdyn_TrackExchangeActivityResult}).
 */
export class msdyn_TrackExchangeActivityResponse extends OrganizationResponse {
  constructor(public result: msdyn_TrackExchangeActivityResult) {
    super("msdyn_TrackExchangeActivity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TrackExchangeActivityResponse {
    return new msdyn_TrackExchangeActivityResponse(data as msdyn_TrackExchangeActivityResult);
  }
}
