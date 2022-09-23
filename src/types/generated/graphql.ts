import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  active: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  getNewRoomId: Scalars['String'];
  questions: Array<Question>;
  questionsByCategory: Array<Question>;
  totalCount: Scalars['String'];
};


export type QueryQuestionsByCategoryArgs = {
  category_id?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};

export type Question = {
  __typename?: 'Question';
  answer: Scalars['String'];
  category: Category;
  category_id: Scalars['Int'];
  id: Scalars['ID'];
  source: Scalars['String'];
  text: Scalars['String'];
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, value: string, active: boolean }> };

export type GetQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQuestionsQuery = { __typename?: 'Query', questions: Array<{ __typename?: 'Question', id: string, text: string, answer: string, category_id: number, category: { __typename?: 'Category', name: string, value: string } }> };

export type GetQuestionsByCategoryQueryVariables = Exact<{
  category_id: Scalars['Int'];
  page?: InputMaybe<Scalars['Int']>;
}>;


export type GetQuestionsByCategoryQuery = { __typename?: 'Query', questionsByCategory: Array<{ __typename?: 'Question', id: string, text: string, answer: string, category_id: number }> };

export type GetNewRoomIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNewRoomIdQuery = { __typename?: 'Query', getNewRoomId: string };

export type GetTotalCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTotalCountQuery = { __typename?: 'Query', totalCount: string };


export const GetCategoriesDocument = gql`
    query getCategories {
  categories {
    id
    name
    value
    active
  }
}
    `;
export const GetQuestionsDocument = gql`
    query getQuestions {
  questions {
    id
    text
    answer
    category_id
    category {
      name
      value
    }
  }
}
    `;
export const GetQuestionsByCategoryDocument = gql`
    query getQuestionsByCategory($category_id: Int!, $page: Int) {
  questionsByCategory(category_id: $category_id, page: $page) {
    id
    text
    answer
    category_id
  }
}
    `;
export const GetNewRoomIdDocument = gql`
    query getNewRoomId {
  getNewRoomId
}
    `;
export const GetTotalCountDocument = gql`
    query getTotalCount {
  totalCount
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getCategories(variables?: GetCategoriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoriesQuery>(GetCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategories', 'query');
    },
    getQuestions(variables?: GetQuestionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetQuestionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetQuestionsQuery>(GetQuestionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getQuestions', 'query');
    },
    getQuestionsByCategory(variables: GetQuestionsByCategoryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetQuestionsByCategoryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetQuestionsByCategoryQuery>(GetQuestionsByCategoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getQuestionsByCategory', 'query');
    },
    getNewRoomId(variables?: GetNewRoomIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetNewRoomIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNewRoomIdQuery>(GetNewRoomIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getNewRoomId', 'query');
    },
    getTotalCount(variables?: GetTotalCountQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTotalCountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTotalCountQuery>(GetTotalCountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTotalCount', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;