import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FieldServiceAgreementSystemStatusAction request message
 *
 * Web API Action: msdyn_FieldServiceAgreementSystemStatusAction
 */
export class msdyn_FieldServiceAgreementSystemStatusActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceAgreementSystemStatusActionResponse>
{
  constructor(
    public msdyn_agreementId: string,
    public type: number,
    public inputParameter: string
  ) {
    super("msdyn_FieldServiceAgreementSystemStatusAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_agreements(${this.msdyn_agreementId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceAgreementSystemStatusAction`;

    const body: Record<string, unknown> = {
      Type: this.type,
      InputParameter: this.inputParameter,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_FieldServiceAgreementSystemStatusActionResponse> {
    const data = await response.json();
    return msdyn_FieldServiceAgreementSystemStatusActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_agreementId,
      Type: this.type,
      InputParameter: this.inputParameter,
    };
  }
}

/**
 * msdyn_FieldServiceAgreementSystemStatusAction response message
 */
export class msdyn_FieldServiceAgreementSystemStatusActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceAgreementSystemStatusActionResponse) {
    super("msdyn_FieldServiceAgreementSystemStatusAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceAgreementSystemStatusActionResponse {
    return new msdyn_FieldServiceAgreementSystemStatusActionResponse((data as any).value);
  }
}
