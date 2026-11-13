---
"@mohsinonxrm/dataverse-sdk-metadata": patch
---

`OneToManyRelationshipMetadata.RelationshipBehavior` (and `ComplexOneToManyRelationshipMetadata`'s) is documented: Microsoft doesn't document it, Dataverse sets it, and it isn't the relationship's type of behavior (#537). Read `CascadeConfiguration` for what an action on the parent does to the children; in practice the value follows `SecurityTypes` (0 None, 1 Append, 2 ParentChild, 4 and 12 Pointer). It stays a `number`.
