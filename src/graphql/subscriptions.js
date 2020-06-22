/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateExpense = /* GraphQL */ `
  subscription OnCreateExpense($owner: String!) {
    onCreateExpense(owner: $owner) {
      id
      createdAt
      description
      amount
      note
      owner
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const onUpdateExpense = /* GraphQL */ `
  subscription OnUpdateExpense($owner: String!) {
    onUpdateExpense(owner: $owner) {
      id
      createdAt
      description
      amount
      note
      owner
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const onDeleteExpense = /* GraphQL */ `
  subscription OnDeleteExpense($owner: String!) {
    onDeleteExpense(owner: $owner) {
      id
      createdAt
      description
      amount
      note
      owner
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
