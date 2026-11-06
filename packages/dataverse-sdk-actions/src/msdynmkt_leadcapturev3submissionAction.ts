import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdynmkt_leadcapturev3submission action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdynmkt_leadcapturev3submissionResponse = void;

/**
 * Parameters of the msdynmkt_leadcapturev3submission action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_leadcapturev3submissionActionParameters {
  msdynmkt_marketingformid: EntityReference | AnyEntityPayload;
  msdynmkt_formsubmissionid: EntityReference | AnyEntityPayload;
  msdynmkt_consentversion?: string;
}

/**
 * msdynmkt_leadcapturev3submission action
 *
 * Unbound action
 */
export class msdynmkt_leadcapturev3submissionAction implements Executable<msdynmkt_leadcapturev3submissionResponse> {
  constructor(public readonly parameters: msdynmkt_leadcapturev3submissionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_leadcapturev3submission`;

    const body = requestBody({
      msdynmkt_marketingformid: this.parameters.msdynmkt_marketingformid,
      msdynmkt_formsubmissionid: this.parameters.msdynmkt_formsubmissionid,
      msdynmkt_consentversion: this.parameters.msdynmkt_consentversion,
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

  parseResponse(_response: Response): Promise<msdynmkt_leadcapturev3submissionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
