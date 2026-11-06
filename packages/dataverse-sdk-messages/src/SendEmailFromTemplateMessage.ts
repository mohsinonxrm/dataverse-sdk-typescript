import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { email } from "./types/index.js";

/**
 * Parameters of the SendEmailFromTemplate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendEmailFromTemplateRequestParameters {
  TemplateId: string;
  Regarding: EntityReference | AnyEntityPayload;
  Target: EntityReference | AnyEntityPayload;
}

/**
 * SendEmailFromTemplate request message
 *
 * Web API Action: SendEmailFromTemplate
 */
export class SendEmailFromTemplateRequest
  extends OrganizationRequest
  implements Executable<SendEmailFromTemplateResponse>
{
  declare readonly Parameters: Readonly<SendEmailFromTemplateRequestParameters>;

  constructor(parameters: SendEmailFromTemplateRequestParameters) {
    super("SendEmailFromTemplate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendEmailFromTemplate`;

    const body = requestBody({
      TemplateId: this.Parameters.TemplateId,
      Regarding: this.Parameters.Regarding,
      Target: this.Parameters.Target,
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

  async parseResponse(response: Response): Promise<SendEmailFromTemplateResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return SendEmailFromTemplateResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return SendEmailFromTemplateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the SendEmailFromTemplate action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type SendEmailFromTemplateResult =
  (email & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * SendEmailFromTemplate response message
 *
 * `result` is the value the SendEmailFromTemplate action returns (see {@link SendEmailFromTemplateResult}).
 */
export class SendEmailFromTemplateResponse extends OrganizationResponse {
  constructor(public result: SendEmailFromTemplateResult) {
    super("SendEmailFromTemplate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SendEmailFromTemplateResponse {
    return new SendEmailFromTemplateResponse((data ?? null) as SendEmailFromTemplateResult);
  }
}
