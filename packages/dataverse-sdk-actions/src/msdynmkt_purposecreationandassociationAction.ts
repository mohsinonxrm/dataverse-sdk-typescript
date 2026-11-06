import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdynmkt_purposecreationandassociation action
 */
export interface msdynmkt_purposecreationandassociationResponse {
  // No content returned
}

/**
 * Parameters of the msdynmkt_purposecreationandassociation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_purposecreationandassociationActionParameters {
  msdynmkt_name: string;
  msdynmkt_customenforcementmodel: number;
  msdynmkt_voiceenforcementmodel: number;
  msdynmkt_type: number;
  msdynmkt_enforcementmodel: number;
  msdynmkt_smsenforcementmodel: number;
  msdynmkt_purpose_id: string;
  msdynmkt_compliancesettings4: EntityReference | AnyEntityPayload;
  msdynmkt_purposeid?: string;
}

/**
 * msdynmkt_purposecreationandassociation action
 *
 * Unbound action
 */
export class msdynmkt_purposecreationandassociationAction implements Executable<msdynmkt_purposecreationandassociationResponse> {
  constructor(public readonly parameters: msdynmkt_purposecreationandassociationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_purposecreationandassociation`;

    const body = requestBody({
      msdynmkt_name: this.parameters.msdynmkt_name,
      msdynmkt_customenforcementmodel: this.parameters.msdynmkt_customenforcementmodel,
      msdynmkt_voiceenforcementmodel: this.parameters.msdynmkt_voiceenforcementmodel,
      msdynmkt_type: this.parameters.msdynmkt_type,
      msdynmkt_enforcementmodel: this.parameters.msdynmkt_enforcementmodel,
      msdynmkt_smsenforcementmodel: this.parameters.msdynmkt_smsenforcementmodel,
      msdynmkt_purpose_id: this.parameters.msdynmkt_purpose_id,
      msdynmkt_compliancesettings4: this.parameters.msdynmkt_compliancesettings4,
      msdynmkt_purposeid: this.parameters.msdynmkt_purposeid,
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

  async parseResponse(response: Response): Promise<msdynmkt_purposecreationandassociationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_purposecreationandassociationResponse;
    return (await response.json()) as msdynmkt_purposecreationandassociationResponse;
  }
}
