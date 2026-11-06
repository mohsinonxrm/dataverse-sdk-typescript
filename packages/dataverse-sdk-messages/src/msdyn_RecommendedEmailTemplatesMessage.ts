import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_RecommendedEmailTemplatesResponse as msdyn_RecommendedEmailTemplatesResponseData } from "./types/index.js";

/**
 * msdyn_RecommendedEmailTemplates request message
 *
 * Web API Action: msdyn_RecommendedEmailTemplates
 */
export class msdyn_RecommendedEmailTemplatesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RecommendedEmailTemplatesResponse>
{
  constructor(
    public isTemplateResponse: boolean,
    public emailContextData: string,
    public emailId: string,
    public templateFiltersInString: string,
    public filters: string,
    public customerIntent: string,
    public transactionId: string,
    public emailString: string,
    public multiturnPayload: string,
    public copilotRequestParameters: string
  ) {
    super("msdyn_RecommendedEmailTemplates");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RecommendedEmailTemplates`;

    const body: Record<string, unknown> = {
      isTemplateResponse: this.isTemplateResponse,
      emailContextData: this.emailContextData,
      emailId: this.emailId,
      templateFiltersInString: this.templateFiltersInString,
      filters: this.filters,
      customerIntent: this.customerIntent,
      transactionId: this.transactionId,
      emailString: this.emailString,
      multiturnPayload: this.multiturnPayload,
      copilotRequestParameters: this.copilotRequestParameters,
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

  async parseResponse(response: Response): Promise<msdyn_RecommendedEmailTemplatesResponse> {
    const data = await response.json();
    return msdyn_RecommendedEmailTemplatesResponse.fromResponse(data);
  }
}

/**
 * msdyn_RecommendedEmailTemplates response message
 */
export class msdyn_RecommendedEmailTemplatesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RecommendedEmailTemplatesResponseData) {
    super("msdyn_RecommendedEmailTemplates");
  }

  static fromResponse(data: unknown): msdyn_RecommendedEmailTemplatesResponse {
    return new msdyn_RecommendedEmailTemplatesResponse(
      responseObject<msdyn_RecommendedEmailTemplatesResponseData>(data)
    );
  }
}
