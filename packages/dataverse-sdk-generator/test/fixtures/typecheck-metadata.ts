/**
 * A small but realistic $metadata document and RetrieveMetadataChanges responses, shaped like a
 * real Dataverse org: the schema uses the `mscrm` alias for its own types, entities derive from
 * the abstract `crmbaseentity`, lookups have `_x_value` properties and polymorphic lookups have
 * one navigation property per target.
 */
import type {
  MetadataService,
  RetrieveMetadataChangesResponse,
} from "../../src/metadata-service.js";

export const TYPECHECK_EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="account" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="accountid" /></Key>
        <Property Name="accountid" Type="Edm.Guid" />
        <Property Name="name" Type="Edm.String" Unicode="false" />
        <Property Name="revenue" Type="Edm.Decimal" Scale="Variable" />
        <Property Name="numberofemployees" Type="Edm.Int32" />
        <Property Name="industrycode" Type="Edm.Int32" />
        <Property Name="preferredcontactmethodcode" Type="Edm.Int32" />
        <Property Name="statecode" Type="Edm.Int32" />
        <Property Name="createdon" Type="Edm.DateTimeOffset" />
        <Property Name="lastonholdtime" Type="Edm.Date" />
        <Property Name="entityimage" Type="Edm.Binary" />
        <Property Name="creditonhold" Type="Edm.Boolean" />
        <Property Name="_primarycontactid_value" Type="Edm.Guid" />
        <Property Name="_ownerid_value" Type="Edm.Guid" />
        <NavigationProperty Name="primarycontactid" Type="mscrm.contact" Nullable="false" Partner="account_primary_contact">
          <ReferentialConstraint Property="_primarycontactid_value" ReferencedProperty="contactid" />
        </NavigationProperty>
        <NavigationProperty Name="parentaccountid" Type="mscrm.account" Nullable="false" Partner="account_master_account" />
        <NavigationProperty Name="ownerid" Type="mscrm.principal" Nullable="false" Partner="owner_accounts" />
        <NavigationProperty Name="contact_customer_accounts" Type="Collection(mscrm.contact)" Partner="parentcustomerid_account" />
        <NavigationProperty Name="Account_Tasks" Type="Collection(mscrm.task)" Partner="regardingobjectid_account_task" />
      </EntityType>
      <EntityType Name="contact" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="contactid" /></Key>
        <Property Name="contactid" Type="Edm.Guid" />
        <Property Name="fullname" Type="Edm.String" Unicode="false" />
        <Property Name="_parentcustomerid_value" Type="Edm.Guid" />
        <NavigationProperty Name="parentcustomerid_account" Type="mscrm.account" Nullable="false" Partner="contact_customer_accounts" />
        <NavigationProperty Name="parentcustomerid_contact" Type="mscrm.contact" Nullable="false" Partner="contact_customer_contacts" />
      </EntityType>
      <EntityType Name="import" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="importid" /></Key>
        <Property Name="importid" Type="Edm.Guid" />
        <Property Name="name" Type="Edm.String" Unicode="false" />
        <Property Name="iscustomizable" Type="mscrm.BooleanManagedProperty" />
      </EntityType>
      <EntityType Name="principal" BaseType="mscrm.crmbaseentity" Abstract="true" />
      <EntityType Name="task" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="activityid" /></Key>
        <Property Name="activityid" Type="Edm.Guid" />
      </EntityType>
      <EntityType Name="opportunityclose" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="activityid" /></Key>
        <Property Name="activityid" Type="Edm.Guid" />
      </EntityType>
      <ComplexType Name="BooleanManagedProperty">
        <Property Name="Value" Type="Edm.Boolean" />
        <Property Name="CanBeChanged" Type="Edm.Boolean" />
        <Property Name="ManagedPropertyLogicalName" Type="Edm.String" Unicode="false" />
      </ComplexType>
      <ComplexType Name="WhoAmIResponse">
        <Property Name="BusinessUnitId" Type="Edm.Guid" />
        <Property Name="UserId" Type="Edm.Guid" />
        <Property Name="OrganizationId" Type="Edm.Guid" />
      </ComplexType>
      <ComplexType Name="ExportComponentsParams">
        <Property Name="ExportIncludeDependencies" Type="Edm.Boolean" />
      </ComplexType>
      <ComplexType Name="ExportSolutionResponse">
        <Property Name="ExportSolutionFile" Type="Edm.Binary" />
      </ComplexType>
      <ComplexType Name="RetrieveTotalRecordCountResponse">
        <Property Name="EntityRecordCountCollection" Type="mscrm.EntityRecordCountCollection" />
      </ComplexType>
      <ComplexType Name="EntityRecordCountCollection">
        <Property Name="Count" Type="Edm.Int32" />
        <Property Name="IsReadOnly" Type="Edm.Boolean" />
      </ComplexType>
      <ComplexType Name="QueryBase">
        <Property Name="Distinct" Type="Edm.Boolean" />
      </ComplexType>
      <ComplexType Name="QueryExpression" BaseType="mscrm.QueryBase">
        <Property Name="EntityName" Type="Edm.String" Unicode="false" />
        <Property Name="Rights" Type="mscrm.AccessRights" />
        <Property Name="Rows" Type="Collection(mscrm.crmbaseentity)" />
      </ComplexType>
      <EnumType Name="AccessRights" IsFlags="true">
        <Member Name="None" Value="0" />
        <Member Name="ReadAccess" Value="1" />
        <Member Name="WriteAccess" Value="2" />
      </EnumType>
      <Action Name="WinOpportunity">
        <Parameter Name="OpportunityClose" Type="mscrm.opportunityclose" Nullable="false" />
        <Parameter Name="Status" Type="Edm.Int32" Nullable="false" />
      </Action>
      <Action Name="ExportSolution">
        <Parameter Name="SolutionName" Type="Edm.String" Nullable="false" Unicode="false" />
        <Parameter Name="Managed" Type="Edm.Boolean" Nullable="false" />
        <Parameter Name="ExportComponentsParams" Type="mscrm.ExportComponentsParams" />
        <ReturnType Type="mscrm.ExportSolutionResponse" Nullable="false" />
      </Action>
      <Action Name="PublishAllXml" />
      <Action Name="CalculatePrice">
        <Parameter Name="Target" Type="mscrm.crmbaseentity" Nullable="false" />
        <Parameter Name="ParentId" Type="Edm.Guid" />
      </Action>
      <Action Name="contoso_Recalculate" IsBound="true">
        <Parameter Name="entity" Type="mscrm.account" Nullable="false" />
        <Parameter Name="Mode" Type="Edm.Int32" Nullable="false" />
        <ReturnType Type="mscrm.account" Nullable="false" />
      </Action>
      <Function Name="WhoAmI">
        <ReturnType Type="mscrm.WhoAmIResponse" Nullable="false" />
      </Function>
      <Function Name="RetrieveTotalRecordCount">
        <Parameter Name="EntityNames" Type="Collection(Edm.String)" Nullable="false" Unicode="false" />
        <ReturnType Type="mscrm.RetrieveTotalRecordCountResponse" Nullable="false" />
      </Function>
      <Function Name="CalculateRollupField">
        <Parameter Name="Target" Type="mscrm.crmbaseentity" Nullable="false" />
        <Parameter Name="FieldName" Type="Edm.String" Nullable="false" Unicode="false" />
        <ReturnType Type="mscrm.crmbaseentity" Nullable="false" />
      </Function>
      <Function Name="contoso_GetScore" IsBound="true">
        <Parameter Name="entity" Type="mscrm.account" Nullable="false" />
        <Parameter Name="Rights" Type="mscrm.AccessRights" Nullable="false" />
        <ReturnType Type="Edm.Int32" Nullable="false" />
      </Function>
      <Function Name="contoso_Search" IsBound="true">
        <Parameter Name="entityset" Type="Collection(mscrm.account)" Nullable="false" />
        <Parameter Name="Term" Type="Edm.String" Nullable="false" Unicode="false" />
        <Parameter Name="OwnerId" Type="Edm.Guid" Nullable="false" />
        <Parameter Name="Since" Type="Edm.DateTimeOffset" />
        <Parameter Name="Day" Type="Edm.Date" />
        <ReturnType Type="Collection(mscrm.account)" Nullable="false" />
      </Function>
      <Function Name="RetrieveUnpublished" IsBound="true">
        <Parameter Name="entity" Type="mscrm.account" Nullable="false" />
        <ReturnType Type="mscrm.account" Nullable="false" />
      </Function>
      <Function Name="RetrieveUnpublished" IsBound="true">
        <Parameter Name="entity" Type="mscrm.contact" Nullable="false" />
        <ReturnType Type="mscrm.contact" Nullable="false" />
      </Function>
      <Function Name="contoso_Touch" IsBound="true">
        <Parameter Name="entity" Type="mscrm.crmbaseentity" Nullable="false" />
        <Parameter Name="Paging" Type="mscrm.QueryBase" />
        <ReturnType Type="Edm.Boolean" Nullable="false" />
      </Function>
      <Function Name="RetrieveCurrentOrganization">
        <Parameter Name="AccessType" Type="mscrm.AccessRights" Nullable="false" />
        <Parameter Name="Names" Type="Collection(Edm.String)" />
        <ReturnType Type="mscrm.WhoAmIResponse" Nullable="false" />
      </Function>
      <Action Name="contoso_Flag" IsBound="true">
        <Parameter Name="entityset" Type="Collection(mscrm.contact)" Nullable="false" />
        <Parameter Name="Reason" Type="Edm.String" />
      </Action>
      <EntityContainer Name="System">
        <EntitySet Name="accounts" EntityType="Microsoft.Dynamics.CRM.account" />
        <EntitySet Name="contacts" EntityType="Microsoft.Dynamics.CRM.contact" />
        <EntitySet Name="imports" EntityType="Microsoft.Dynamics.CRM.import" />
        <EntitySet Name="tasks" EntityType="Microsoft.Dynamics.CRM.task" />
        <EntitySet Name="opportunitycloses" EntityType="Microsoft.Dynamics.CRM.opportunityclose" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

const label = (text: string) => ({ UserLocalizedLabel: { Label: text, LanguageCode: 1033 } });

/** RetrieveMetadataChanges responses for the entities the type-check test generates. */
export const TYPECHECK_ENTITY_METADATA: Record<string, RetrieveMetadataChangesResponse> = {
  account: {
    EntityMetadata: [
      {
        LogicalName: "account",
        SchemaName: "Account",
        EntitySetName: "accounts",
        PrimaryIdAttribute: "accountid",
        PrimaryNameAttribute: "name",
        Keys: [],
        Attributes: [
          { LogicalName: "accountid", SchemaName: "AccountId", AttributeType: "Uniqueidentifier" },
          {
            LogicalName: "name",
            SchemaName: "Name",
            AttributeType: "String",
            RequiredLevel: { Value: "ApplicationRequired" },
            DisplayName: label("Account Name"),
            Description: label("Type the company or business name. */ It ends here."),
          },
          {
            LogicalName: "revenue",
            SchemaName: "Revenue",
            AttributeType: "Money",
            SourceType: 1,
          },
          {
            LogicalName: "numberofemployees",
            SchemaName: "NumberOfEmployees",
            AttributeType: "Integer",
            SourceType: 2,
          },
          {
            LogicalName: "industrycode",
            SchemaName: "IndustryCode",
            AttributeType: "Picklist",
            OptionSet: {
              Name: "account_industrycode",
              IsGlobal: false,
              Options: [
                { Value: 1, Label: label("Accounting") },
                { Value: 2, Label: label("Financial Services") },
                { Value: 3, Label: label("Financial Services") },
                { Value: 4, Label: label("3rd-party / Other") },
                { Value: 5, Label: {} },
              ],
            },
          },
          {
            LogicalName: "preferredcontactmethodcode",
            SchemaName: "PreferredContactMethodCode",
            AttributeType: "Virtual",
            AttributeTypeName: { Value: "MultiSelectPicklistType" },
            OptionSet: {
              Name: "account_preferredcontactmethodcode",
              IsGlobal: false,
              Options: [
                { Value: 1, Label: label("Email") },
                { Value: 2, Label: label("Phone") },
              ],
            },
          },
          {
            LogicalName: "statecode",
            SchemaName: "StateCode",
            AttributeType: "State",
            OptionSet: {
              Name: "account_statecode",
              IsGlobal: false,
              Options: [
                { Value: 0, Label: label("Active") },
                { Value: 1, Label: label("Inactive") },
              ],
            },
          },
          {
            LogicalName: "createdon",
            SchemaName: "CreatedOn",
            AttributeType: "DateTime",
            DateTimeBehavior: { Value: "UserLocal" },
          },
          {
            LogicalName: "primarycontactid",
            SchemaName: "PrimaryContactId",
            AttributeType: "Lookup",
            Targets: ["contact"],
          },
          {
            LogicalName: "ownerid",
            SchemaName: "OwnerId",
            AttributeType: "Owner",
            Targets: ["systemuser", "team"],
          },
        ],
      },
    ],
  },
  contact: {
    EntityMetadata: [
      {
        LogicalName: "contact",
        SchemaName: "Contact",
        EntitySetName: "contacts",
        Keys: [],
        Attributes: [
          { LogicalName: "contactid", SchemaName: "ContactId", AttributeType: "Uniqueidentifier" },
          { LogicalName: "fullname", SchemaName: "FullName", AttributeType: "String" },
          {
            LogicalName: "parentcustomerid",
            SchemaName: "ParentCustomerId",
            AttributeType: "Customer",
            Targets: ["account", "contact"],
          },
        ],
      },
    ],
  },
  import: {
    EntityMetadata: [
      {
        LogicalName: "import",
        SchemaName: "Import",
        EntitySetName: "imports",
        Keys: [],
        Attributes: [
          { LogicalName: "importid", SchemaName: "ImportId", AttributeType: "Uniqueidentifier" },
          { LogicalName: "name", SchemaName: "Name", AttributeType: "String" },
        ],
      },
    ],
  },
  task: {
    EntityMetadata: [{ LogicalName: "task", SchemaName: "Task", EntitySetName: "tasks" }],
  },
  opportunityclose: {
    EntityMetadata: [
      {
        LogicalName: "opportunityclose",
        SchemaName: "OpportunityClose",
        EntitySetName: "opportunitycloses",
      },
    ],
  },
};

/** A MetadataService stand-in that serves the fixture instead of calling Dataverse. */
export function createFixtureMetadataService(): MetadataService {
  const service: Pick<MetadataService, "getEdmxMetadata" | "getEntityMetadata"> = {
    getEdmxMetadata: () => Promise.resolve(TYPECHECK_EDMX),
    getEntityMetadata: (logicalName: string) =>
      Promise.resolve(TYPECHECK_ENTITY_METADATA[logicalName] ?? { EntityMetadata: [] }),
  };
  return service as MetadataService;
}
