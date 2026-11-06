import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_StartLoadConsentV4CustomAction action
 */
export interface msdynmkt_StartLoadConsentV4CustomActionResponse {
  ErrorCodes: string;
  ErrorMetadata: string;
}

/**
 * msdynmkt_StartLoadConsentV4CustomAction action
 *
 * Unbound action
 */
export class msdynmkt_StartLoadConsentV4CustomActionAction implements Executable<msdynmkt_StartLoadConsentV4CustomActionResponse> {
  constructor(
    public readonly commercialPurposeId?: string,
    public readonly commercialTopicId?: string,
    public readonly transactionalPurposeId?: string,
    public readonly transactionalTopicId?: string,
    public readonly trackingPurposeId?: string,
    public readonly sourceEntity?: string,
    public readonly owningBusinessUnit?: string,
    public readonly filterType?: string,
    public readonly filterId?: string,
    public readonly consentValue?: number,
    public readonly updateExistingRecords?: boolean,
    public readonly complianceProfileId?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_StartLoadConsentV4CustomAction`;

    const body: Record<string, unknown> = {
      CommercialPurposeId: this.commercialPurposeId,
      CommercialTopicId: this.commercialTopicId,
      TransactionalPurposeId: this.transactionalPurposeId,
      TransactionalTopicId: this.transactionalTopicId,
      TrackingPurposeId: this.trackingPurposeId,
      SourceEntity: this.sourceEntity,
      OwningBusinessUnit: this.owningBusinessUnit,
      FilterType: this.filterType,
      FilterId: this.filterId,
      ConsentValue: this.consentValue,
      UpdateExistingRecords: this.updateExistingRecords,
      ComplianceProfileId: this.complianceProfileId,
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

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_StartLoadConsentV4CustomActionResponse> {
    const data = await response.json();
    return data as msdynmkt_StartLoadConsentV4CustomActionResponse;
  }
}
