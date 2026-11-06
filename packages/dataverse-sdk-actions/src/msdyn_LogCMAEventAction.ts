import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_LogCMAEvent action
 */
export interface msdyn_LogCMAEventResponse {
  Code: string;
  Message: string;
}

/**
 * Parameters of the msdyn_LogCMAEvent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LogCMAEventActionParameters {
  EventType: string;
  Source: string;
  Component: string;
  EventData?: string;
  Entity?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_LogCMAEvent action
 *
 * Unbound action
 */
export class msdyn_LogCMAEventAction implements Executable<msdyn_LogCMAEventResponse> {
  constructor(public readonly parameters: msdyn_LogCMAEventActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LogCMAEvent`;

    const body = requestBody({
      EventType: this.parameters.EventType,
      Source: this.parameters.Source,
      Component: this.parameters.Component,
      EventData: this.parameters.EventData,
      Entity: this.parameters.Entity,
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

  async parseResponse(response: Response): Promise<msdyn_LogCMAEventResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_LogCMAEventResponse;
  }
}
