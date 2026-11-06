import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdynmkt_purposecreationandassociation action
 */
export interface msdynmkt_purposecreationandassociationResponse {
  // No content returned
}

/**
 * msdynmkt_purposecreationandassociation action
 *
 * Unbound action
 */
export class msdynmkt_purposecreationandassociationAction implements Executable<msdynmkt_purposecreationandassociationResponse> {
  constructor(
    public readonly msdynmkt_customenforcementmodel: number,
    public readonly msdynmkt_purposeid: string | undefined,
    public readonly msdynmkt_enforcementmodel: number,
    public readonly msdynmkt_name: string,
    public readonly msdynmkt_compliancesettings4: EntityReference | AnyEntityPayload,
    public readonly msdynmkt_purpose_id: string,
    public readonly msdynmkt_smsenforcementmodel: number,
    public readonly msdynmkt_voiceenforcementmodel: number,
    public readonly msdynmkt_type: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_purposecreationandassociation`;

    const body: Record<string, unknown> = {
      msdynmkt_customenforcementmodel: this.msdynmkt_customenforcementmodel,
      msdynmkt_purposeid: this.msdynmkt_purposeid,
      msdynmkt_enforcementmodel: this.msdynmkt_enforcementmodel,
      msdynmkt_name: this.msdynmkt_name,
      msdynmkt_compliancesettings4: this.msdynmkt_compliancesettings4,
      msdynmkt_purpose_id: this.msdynmkt_purpose_id,
      msdynmkt_smsenforcementmodel: this.msdynmkt_smsenforcementmodel,
      msdynmkt_voiceenforcementmodel: this.msdynmkt_voiceenforcementmodel,
      msdynmkt_type: this.msdynmkt_type,
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

  async parseResponse(response: Response): Promise<msdynmkt_purposecreationandassociationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
