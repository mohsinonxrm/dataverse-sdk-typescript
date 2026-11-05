import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_EmailTemplateRecommendation action
 */
export interface msdyn_EmailTemplateRecommendationResponse {
  diagnosticInfo: string;
  emailTemplates: string;
  recommendedTemplate: string;
  generatedEmailString: string;
}

/**
 * msdyn_EmailTemplateRecommendation action
 *
 * Unbound action
 */
export class msdyn_EmailTemplateRecommendationAction implements Executable<msdyn_EmailTemplateRecommendationResponse> {
  constructor(
    public readonly headers: number,
    public readonly customerIntent: string,
    public readonly filters: string,
    public readonly templateFiltersInString: string,
    public readonly emailString: string,
    public readonly isTemplateResponse: boolean,
    public readonly transactionId: string,
    public readonly multiturnPayload: string,
    public readonly emailContextData: string,
    public readonly copilotRequestParameters: string,
    public readonly emailId: string,
    public readonly entityReference: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailTemplateRecommendation`;

    const body: Record<string, unknown> = {
      Headers: this.headers,
      customerIntent: this.customerIntent,
      filters: this.filters,
      templateFiltersInString: this.templateFiltersInString,
      emailString: this.emailString,
      isTemplateResponse: this.isTemplateResponse,
      transactionId: this.transactionId,
      multiturnPayload: this.multiturnPayload,
      emailContextData: this.emailContextData,
      copilotRequestParameters: this.copilotRequestParameters,
      emailId: this.emailId,
      entityReference: this.entityReference,
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

  async parseResponse(response: Response): Promise<msdyn_EmailTemplateRecommendationResponse> {
    const data = await response.json();
    return data as msdyn_EmailTemplateRecommendationResponse;
  }
}
