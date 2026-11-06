import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_PersonalizationGetEventsByName action
 */
export interface msdynmkt_PersonalizationGetEventsByNameResponse {
  GetPersonalizationEventResult: string;
}

/**
 * Parameters of the msdynmkt_PersonalizationGetEventsByName action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_PersonalizationGetEventsByNameActionParameters {
  GetPersonalizationEventRequest?: string;
}

/**
 * msdynmkt_PersonalizationGetEventsByName action
 *
 * Unbound action
 */
export class msdynmkt_PersonalizationGetEventsByNameAction implements Executable<msdynmkt_PersonalizationGetEventsByNameResponse> {
  constructor(
    public readonly parameters: msdynmkt_PersonalizationGetEventsByNameActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEventsByName`;

    const body = requestBody({
      GetPersonalizationEventRequest: this.parameters.GetPersonalizationEventRequest,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_PersonalizationGetEventsByNameResponse;
    return (await response.json()) as msdynmkt_PersonalizationGetEventsByNameResponse;
  }
}
