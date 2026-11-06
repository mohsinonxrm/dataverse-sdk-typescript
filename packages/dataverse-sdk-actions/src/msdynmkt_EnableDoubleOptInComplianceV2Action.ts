import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_EnableDoubleOptInComplianceV2 action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdynmkt_EnableDoubleOptInComplianceV2Response = void;

/**
 * Parameters of the msdynmkt_EnableDoubleOptInComplianceV2 action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_EnableDoubleOptInComplianceV2ActionParameters {
  msdynmkt_complianceid: string;
}

/**
 * msdynmkt_EnableDoubleOptInComplianceV2 action
 *
 * Unbound action
 */
export class msdynmkt_EnableDoubleOptInComplianceV2Action implements Executable<msdynmkt_EnableDoubleOptInComplianceV2Response> {
  constructor(public readonly parameters: msdynmkt_EnableDoubleOptInComplianceV2ActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_EnableDoubleOptInComplianceV2`;

    const body = requestBody({
      msdynmkt_complianceid: this.parameters.msdynmkt_complianceid,
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

  parseResponse(_response: Response): Promise<msdynmkt_EnableDoubleOptInComplianceV2Response> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
