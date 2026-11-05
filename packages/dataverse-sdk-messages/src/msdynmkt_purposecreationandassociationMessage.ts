import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdynmkt_purposecreationandassociation request message
 *
 * Web API Action: msdynmkt_purposecreationandassociation
 */
export class msdynmkt_purposecreationandassociationRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_purposecreationandassociationResponse>
{
  constructor(
    public msdynmkt_customenforcementmodel: number,
    public msdynmkt_purposeid: string,
    public msdynmkt_enforcementmodel: number,
    public msdynmkt_name: string,
    public msdynmkt_compliancesettings4: EntityReference,
    public msdynmkt_purpose_id: string,
    public msdynmkt_smsenforcementmodel: number,
    public msdynmkt_voiceenforcementmodel: number,
    public msdynmkt_type: number
  ) {
    super("msdynmkt_purposecreationandassociation");
  }

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
    return new msdynmkt_purposecreationandassociationResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
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
  }
}

/**
 * msdynmkt_purposecreationandassociation response message
 */
export class msdynmkt_purposecreationandassociationResponse extends OrganizationResponse {
  constructor() {
    super("msdynmkt_purposecreationandassociation");
  }

  static fromResponse(_data: unknown): msdynmkt_purposecreationandassociationResponse {
    return new msdynmkt_purposecreationandassociationResponse();
  }
}
