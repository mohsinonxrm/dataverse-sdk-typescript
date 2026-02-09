import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_PersonalizationGetEventsByName request message
 *
 * Web API Action: msdynmkt_PersonalizationGetEventsByName
 */
export class msdynmkt_PersonalizationGetEventsByNameRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PersonalizationGetEventsByNameResponse>
{
  constructor(public getPersonalizationEventRequest: string) {
    super("msdynmkt_PersonalizationGetEventsByName");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEventsByName`;

    const body: Record<string, unknown> = {
      GetPersonalizationEventRequest: this.getPersonalizationEventRequest,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_PersonalizationGetEventsByNameResponse> {
    const data = await response.json();
    return msdynmkt_PersonalizationGetEventsByNameResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      GetPersonalizationEventRequest: this.getPersonalizationEventRequest,
    };
  }
}

/**
 * msdynmkt_PersonalizationGetEventsByName response message
 */
export class msdynmkt_PersonalizationGetEventsByNameResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_PersonalizationGetEventsByNameResponse) {
    super("msdynmkt_PersonalizationGetEventsByName");
  }

  static fromResponse(data: unknown): msdynmkt_PersonalizationGetEventsByNameResponse {
    return new msdynmkt_PersonalizationGetEventsByNameResponse((data as any).value);
  }
}
