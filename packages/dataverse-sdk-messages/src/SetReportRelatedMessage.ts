import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the SetReportRelated message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetReportRelatedRequestParameters {
  ReportId: string;
  Entities: number[];
  Categories: number[];
  Visibility: number[];
}

/**
 * SetReportRelated request message
 *
 * Web API Action: SetReportRelated
 */
export class SetReportRelatedRequest
  extends OrganizationRequest
  implements Executable<SetReportRelatedResponse>
{
  declare readonly Parameters: Readonly<SetReportRelatedRequestParameters>;

  constructor(parameters: SetReportRelatedRequestParameters) {
    super("SetReportRelated", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetReportRelated`;

    const body = requestBody({
      ReportId: this.Parameters.ReportId,
      Entities: this.Parameters.Entities,
      Categories: this.Parameters.Categories,
      Visibility: this.Parameters.Visibility,
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

  async parseResponse(response: Response): Promise<SetReportRelatedResponse> {
    // No return value (204 No Content)
    return new SetReportRelatedResponse();
  }
}

/**
 * SetReportRelated response message
 */
export class SetReportRelatedResponse extends OrganizationResponse {
  constructor() {
    super("SetReportRelated");
  }

  static fromResponse(_data: unknown): SetReportRelatedResponse {
    return new SetReportRelatedResponse();
  }
}
