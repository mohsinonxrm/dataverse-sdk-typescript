import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { PropagationOwnershipOptions, bulkoperation, queue, template } from "./types/index.js";

/**
 * Parameters of the DistributeCampaignActivity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DistributeCampaignActivityRequestParameters {
  Propagate: boolean;
  Activity?: EntityReference | AnyEntityPayload;
  Template: EntityReference | EntityPayload<template>;
  OwnershipOptions: PropagationOwnershipOptions;
  Owner: EntityReference | AnyEntityPayload;
  SendEmail: boolean;
  Queue?: EntityReference | EntityPayload<queue>;
  PostWorkflowEvent: boolean;
  ExtendedActivityParameters?: string;
}

/**
 * DistributeCampaignActivity request message
 *
 * Web API Action: DistributeCampaignActivity
 *
 * The first argument is the id of the campaignactivity record to call it on.
 */
export class DistributeCampaignActivityRequest
  extends OrganizationRequest
  implements Executable<DistributeCampaignActivityResponse>
{
  declare readonly Parameters: Readonly<DistributeCampaignActivityRequestParameters>;

  constructor(
    public campaignactivityId: string,
    parameters: DistributeCampaignActivityRequestParameters
  ) {
    super("DistributeCampaignActivity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/campaignactivities(${this.campaignactivityId})/Microsoft.Dynamics.CRM.DistributeCampaignActivity`;

    const body = requestBody({
      Propagate: this.Parameters.Propagate,
      Activity: this.Parameters.Activity,
      Template: this.Parameters.Template,
      OwnershipOptions: enumBody(this.Parameters.OwnershipOptions, "PropagationOwnershipOptions"),
      Owner: this.Parameters.Owner,
      SendEmail: this.Parameters.SendEmail,
      Queue: this.Parameters.Queue,
      PostWorkflowEvent: this.Parameters.PostWorkflowEvent,
      ExtendedActivityParameters: this.Parameters.ExtendedActivityParameters,
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

  async parseResponse(response: Response): Promise<DistributeCampaignActivityResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return DistributeCampaignActivityResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return DistributeCampaignActivityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the DistributeCampaignActivity action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type DistributeCampaignActivityResult =
  | (bulkoperation & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * DistributeCampaignActivity response message
 *
 * `result` is the value the DistributeCampaignActivity action returns (see {@link DistributeCampaignActivityResult}).
 */
export class DistributeCampaignActivityResponse extends OrganizationResponse {
  constructor(public result: DistributeCampaignActivityResult) {
    super("DistributeCampaignActivity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DistributeCampaignActivityResponse {
    return new DistributeCampaignActivityResponse(
      (data ?? null) as DistributeCampaignActivityResult
    );
  }
}
