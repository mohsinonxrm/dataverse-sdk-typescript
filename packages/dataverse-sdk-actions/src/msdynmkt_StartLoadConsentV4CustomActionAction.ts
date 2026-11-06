import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_StartLoadConsentV4CustomAction action
 */
export interface msdynmkt_StartLoadConsentV4CustomActionResponse {
  ErrorCodes: string;
  ErrorMetadata: string;
}

/**
 * Parameters of the msdynmkt_StartLoadConsentV4CustomAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_StartLoadConsentV4CustomActionActionParameters {
  CommercialPurposeId?: string;
  CommercialTopicId?: string;
  TransactionalPurposeId?: string;
  TransactionalTopicId?: string;
  TrackingPurposeId?: string;
  SourceEntity?: string;
  OwningBusinessUnit?: string;
  FilterType?: string;
  FilterId?: string;
  ConsentValue?: number;
  UpdateExistingRecords?: boolean;
  ComplianceProfileId?: string;
}

/**
 * msdynmkt_StartLoadConsentV4CustomAction action
 *
 * Unbound action
 */
export class msdynmkt_StartLoadConsentV4CustomActionAction implements Executable<msdynmkt_StartLoadConsentV4CustomActionResponse> {
  constructor(
    public readonly parameters: msdynmkt_StartLoadConsentV4CustomActionActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_StartLoadConsentV4CustomAction`;

    const body = requestBody({
      CommercialPurposeId: this.parameters.CommercialPurposeId,
      CommercialTopicId: this.parameters.CommercialTopicId,
      TransactionalPurposeId: this.parameters.TransactionalPurposeId,
      TransactionalTopicId: this.parameters.TransactionalTopicId,
      TrackingPurposeId: this.parameters.TrackingPurposeId,
      SourceEntity: this.parameters.SourceEntity,
      OwningBusinessUnit: this.parameters.OwningBusinessUnit,
      FilterType: this.parameters.FilterType,
      FilterId: this.parameters.FilterId,
      ConsentValue: this.parameters.ConsentValue,
      UpdateExistingRecords: this.parameters.UpdateExistingRecords,
      ComplianceProfileId: this.parameters.ComplianceProfileId,
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

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_StartLoadConsentV4CustomActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_StartLoadConsentV4CustomActionResponse;
  }
}
