import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RecommendedEmailTemplates message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RecommendedEmailTemplatesRequestParameters {
  emailString: string;
  emailContextData?: string;
  isTemplateResponse?: boolean;
  templateFiltersInString: string;
  multiturnPayload?: string;
  emailId: string;
  copilotRequestParameters: string;
  customerIntent: string;
  filters?: string;
  transactionId: string;
}

/**
 * msdyn_RecommendedEmailTemplates request message
 *
 * Web API Action: msdyn_RecommendedEmailTemplates
 */
export class msdyn_RecommendedEmailTemplatesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RecommendedEmailTemplatesResponse>
{
  declare readonly Parameters: Readonly<msdyn_RecommendedEmailTemplatesRequestParameters>;

  constructor(parameters: msdyn_RecommendedEmailTemplatesRequestParameters) {
    super("msdyn_RecommendedEmailTemplates", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RecommendedEmailTemplates`;

    const body = requestBody({
      emailString: this.Parameters.emailString,
      emailContextData: this.Parameters.emailContextData,
      isTemplateResponse: this.Parameters.isTemplateResponse,
      templateFiltersInString: this.Parameters.templateFiltersInString,
      multiturnPayload: this.Parameters.multiturnPayload,
      emailId: this.Parameters.emailId,
      copilotRequestParameters: this.Parameters.copilotRequestParameters,
      customerIntent: this.Parameters.customerIntent,
      filters: this.Parameters.filters,
      transactionId: this.Parameters.transactionId,
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

  async parseResponse(response: Response): Promise<msdyn_RecommendedEmailTemplatesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RecommendedEmailTemplatesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RecommendedEmailTemplates action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RecommendedEmailTemplatesResult {
  "@odata.context"?: string;
  emailTemplates: string;
  generatedEmailString: string;
  recommendedTemplate: string;
}

/**
 * msdyn_RecommendedEmailTemplates response message
 *
 * `result` is the value the msdyn_RecommendedEmailTemplates action returns (see {@link msdyn_RecommendedEmailTemplatesResult}).
 */
export class msdyn_RecommendedEmailTemplatesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RecommendedEmailTemplatesResult) {
    super("msdyn_RecommendedEmailTemplates");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RecommendedEmailTemplatesResponse {
    return new msdyn_RecommendedEmailTemplatesResponse(
      data as msdyn_RecommendedEmailTemplatesResult
    );
  }
}
