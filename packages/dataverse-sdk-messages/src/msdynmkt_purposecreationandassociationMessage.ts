import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdynmkt_purposecreationandassociation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_purposecreationandassociationRequestParameters {
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
 * msdynmkt_purposecreationandassociation request message
 *
 * Web API Action: msdynmkt_purposecreationandassociation
 */
export class msdynmkt_purposecreationandassociationRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_purposecreationandassociationResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_purposecreationandassociationRequestParameters>;

  constructor(parameters: msdynmkt_purposecreationandassociationRequestParameters) {
    super("msdynmkt_purposecreationandassociation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_purposecreationandassociation`;

    const body = requestBody({
      msdynmkt_name: this.Parameters.msdynmkt_name,
      msdynmkt_customenforcementmodel: this.Parameters.msdynmkt_customenforcementmodel,
      msdynmkt_voiceenforcementmodel: this.Parameters.msdynmkt_voiceenforcementmodel,
      msdynmkt_type: this.Parameters.msdynmkt_type,
      msdynmkt_enforcementmodel: this.Parameters.msdynmkt_enforcementmodel,
      msdynmkt_smsenforcementmodel: this.Parameters.msdynmkt_smsenforcementmodel,
      msdynmkt_purpose_id: this.Parameters.msdynmkt_purpose_id,
      msdynmkt_compliancesettings4: this.Parameters.msdynmkt_compliancesettings4,
      msdynmkt_purposeid: this.Parameters.msdynmkt_purposeid,
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

  parseResponse(_response: Response): Promise<msdynmkt_purposecreationandassociationResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdynmkt_purposecreationandassociationResponse());
  }
}

/**
 * msdynmkt_purposecreationandassociation response message
 */
export class msdynmkt_purposecreationandassociationResponse extends OrganizationResponse {
  constructor() {
    super("msdynmkt_purposecreationandassociation");
  }

  static fromResponse(_data?: unknown): msdynmkt_purposecreationandassociationResponse {
    return new msdynmkt_purposecreationandassociationResponse();
  }
}
