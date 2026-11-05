import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_PersonalizationGetEventsByName action
 */
export interface msdynmkt_PersonalizationGetEventsByNameResponse {
  GetPersonalizationEventResult: string;
}

/**
 * msdynmkt_PersonalizationGetEventsByName action
 *
 * Unbound action
 */
export class msdynmkt_PersonalizationGetEventsByNameAction implements Executable<msdynmkt_PersonalizationGetEventsByNameResponse> {
  constructor(public readonly getPersonalizationEventRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEventsByName`;

    const body: Record<string, unknown> = {
      GetPersonalizationEventRequest: this.getPersonalizationEventRequest,
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

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_PersonalizationGetEventsByNameResponse> {
    const data = await response.json();
    return data as msdynmkt_PersonalizationGetEventsByNameResponse;
  }
}
