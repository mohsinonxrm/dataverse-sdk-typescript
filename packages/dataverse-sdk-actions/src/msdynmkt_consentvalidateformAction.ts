import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_consentvalidateform action
 */
export interface msdynmkt_consentvalidateformResponse {
  msdynmkt_validationresponse: string;
}

/**
 * msdynmkt_consentvalidateform action
 *
 * Unbound action
 */
export class msdynmkt_consentvalidateformAction implements Executable<msdynmkt_consentvalidateformResponse> {
  constructor(
    public readonly msdynmkt_editorname: string,
    public readonly validationType: number | undefined,
    public readonly formBusinessUnitId: string | undefined,
    public readonly complianceProfileId: string | undefined,
    public readonly isDoubleOptInForciblyDisabled: boolean | undefined,
    public readonly msdynmkt_formhtml: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_consentvalidateform`;

    const body: Record<string, unknown> = {
      msdynmkt_editorname: this.msdynmkt_editorname,
      validationType: this.validationType,
      formBusinessUnitId: this.formBusinessUnitId,
      complianceProfileId: this.complianceProfileId,
      isDoubleOptInForciblyDisabled: this.isDoubleOptInForciblyDisabled,
      msdynmkt_formhtml: this.msdynmkt_formhtml,
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

  async parseResponse(response: Response): Promise<msdynmkt_consentvalidateformResponse> {
    const data = await response.json();
    return data as msdynmkt_consentvalidateformResponse;
  }
}
