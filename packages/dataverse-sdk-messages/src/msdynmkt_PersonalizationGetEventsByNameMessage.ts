import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_PersonalizationGetEventsByNameResponse as msdynmkt_PersonalizationGetEventsByNameResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdynmkt_PersonalizationGetEventsByNameResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdynmkt_PersonalizationGetEventsByName response message
 */
export class msdynmkt_PersonalizationGetEventsByNameResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_PersonalizationGetEventsByNameResponseData) {
    super("msdynmkt_PersonalizationGetEventsByName");
  }

  static fromResponse(data: unknown): msdynmkt_PersonalizationGetEventsByNameResponse {
    return new msdynmkt_PersonalizationGetEventsByNameResponse(
      responseObject<msdynmkt_PersonalizationGetEventsByNameResponseData>(data)
    );
  }
}
