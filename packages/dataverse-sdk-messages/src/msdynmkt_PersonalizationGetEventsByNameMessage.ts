import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_PersonalizationGetEventsByName message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_PersonalizationGetEventsByNameRequestParameters {
  GetPersonalizationEventRequest?: string;
}

/**
 * msdynmkt_PersonalizationGetEventsByName request message
 *
 * Web API Action: msdynmkt_PersonalizationGetEventsByName
 */
export class msdynmkt_PersonalizationGetEventsByNameRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PersonalizationGetEventsByNameResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_PersonalizationGetEventsByNameRequestParameters>;

  constructor(parameters: msdynmkt_PersonalizationGetEventsByNameRequestParameters = {}) {
    super("msdynmkt_PersonalizationGetEventsByName", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEventsByName`;

    const body = requestBody({
      GetPersonalizationEventRequest: this.Parameters.GetPersonalizationEventRequest,
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

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_PersonalizationGetEventsByNameResponse> {
    // The body is the complex value, with its @odata.context
    return msdynmkt_PersonalizationGetEventsByNameResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_PersonalizationGetEventsByName action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_PersonalizationGetEventsByNameResult {
  "@odata.context"?: string;
  GetPersonalizationEventResult: string;
}

/**
 * msdynmkt_PersonalizationGetEventsByName response message
 *
 * `result` is the value the msdynmkt_PersonalizationGetEventsByName action returns (see {@link msdynmkt_PersonalizationGetEventsByNameResult}).
 */
export class msdynmkt_PersonalizationGetEventsByNameResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_PersonalizationGetEventsByNameResult) {
    super("msdynmkt_PersonalizationGetEventsByName");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_PersonalizationGetEventsByNameResponse {
    return new msdynmkt_PersonalizationGetEventsByNameResponse(
      data as msdynmkt_PersonalizationGetEventsByNameResult
    );
  }
}
