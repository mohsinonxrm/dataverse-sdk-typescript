import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdynmkt_leadcapturev4submission action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdynmkt_leadcapturev4submissionResponse = void;

/**
 * Parameters of the msdynmkt_leadcapturev4submission action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_leadcapturev4submissionActionParameters {
  msdynmkt_marketingformid: EntityReference | AnyEntityPayload;
  msdynmkt_consentversion?: string;
  msdynmkt_formsubmissionid: EntityReference | AnyEntityPayload;
}

/**
 * msdynmkt_leadcapturev4submission action
 *
 * Unbound action
 */
export class msdynmkt_leadcapturev4submissionAction implements Executable<msdynmkt_leadcapturev4submissionResponse> {
  constructor(public readonly parameters: msdynmkt_leadcapturev4submissionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_leadcapturev4submission`;

    const body = requestBody({
      msdynmkt_marketingformid: this.parameters.msdynmkt_marketingformid,
      msdynmkt_consentversion: this.parameters.msdynmkt_consentversion,
      msdynmkt_formsubmissionid: this.parameters.msdynmkt_formsubmissionid,
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

  parseResponse(_response: Response): Promise<msdynmkt_leadcapturev4submissionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
