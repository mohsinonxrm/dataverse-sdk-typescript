import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_StartLoadConsentV4CustomAction request message
 *
 * Web API Action: msdynmkt_StartLoadConsentV4CustomAction
 */
export class msdynmkt_StartLoadConsentV4CustomActionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_StartLoadConsentV4CustomActionResponse>
{
  constructor(
    public commercialPurposeId: string,
    public commercialTopicId: string,
    public transactionalPurposeId: string,
    public transactionalTopicId: string,
    public trackingPurposeId: string,
    public sourceEntity: string,
    public owningBusinessUnit: string,
    public filterType: string,
    public filterId: string,
    public consentValue: number,
    public updateExistingRecords: boolean,
    public complianceProfileId: string
  ) {
    super("msdynmkt_StartLoadConsentV4CustomAction");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_StartLoadConsentV4CustomActionResponse> {
    const data = await response.json();
    return msdynmkt_StartLoadConsentV4CustomActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
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
  }
}

/**
 * msdynmkt_StartLoadConsentV4CustomAction response message
 */
export class msdynmkt_StartLoadConsentV4CustomActionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_StartLoadConsentV4CustomActionResponse) {
    super("msdynmkt_StartLoadConsentV4CustomAction");
  }

  static fromResponse(data: unknown): msdynmkt_StartLoadConsentV4CustomActionResponse {
    return new msdynmkt_StartLoadConsentV4CustomActionResponse((data as any).value);
  }
}
