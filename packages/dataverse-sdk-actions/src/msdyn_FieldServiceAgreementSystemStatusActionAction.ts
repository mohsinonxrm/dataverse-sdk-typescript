import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FieldServiceAgreementSystemStatusAction action
 */
export interface msdyn_FieldServiceAgreementSystemStatusActionResponse {
  OutputParameter: string;
}

/**
 * msdyn_FieldServiceAgreementSystemStatusAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_agreement)
 */
export class msdyn_FieldServiceAgreementSystemStatusActionAction implements Executable<msdyn_FieldServiceAgreementSystemStatusActionResponse> {
  constructor(
    public readonly msdyn_agreementId: string,
    public readonly type: number,
    public readonly inputParameter: string
  ) {}

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
    return data as msdyn_FieldServiceAgreementSystemStatusActionResponse;
  }
}
