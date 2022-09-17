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

export type Query = {
  __typename?: 'Query';
  questions: Array<Question>;
  questionsByCategory: Array<Question>;
};


export type QueryQuestionsByCategoryArgs = {
  category: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  answer: Scalars['String'];
  category: Scalars['String'];
  difficulty: Scalars['String'];
  id: Scalars['ID'];
  source: Scalars['String'];
  text: Scalars['String'];
};

export type GetQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQuestionsQuery = { __typename?: 'Query', questions: Array<{ __typename?: 'Question', id: string, text: string, answer: string, category: string }> };

export type GetQuestionsByCategoryQueryVariables = Exact<{
  category: Scalars['String'];
}>;


export type GetQuestionsByCategoryQuery = { __typename?: 'Query', questionsByCategory: Array<{ __typename?: 'Question', id: string, text: string, answer: string, category: string }> };


export const GetQuestionsDocument = gql`
    query getQuestions {
  questions {
    id
    text
    answer
    category
  }
}
    `;
export const GetQuestionsByCategoryDocument = gql`
    query getQuestionsByCategory($category: String!) {
  questionsByCategory(category: $category) {
    id
    text
    answer
    category
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getQuestions(variables?: GetQuestionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetQuestionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetQuestionsQuery>(GetQuestionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getQuestions', 'query');
    },
    getQuestionsByCategory(variables: GetQuestionsByCategoryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetQuestionsByCategoryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetQuestionsByCategoryQuery>(GetQuestionsByCategoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getQuestionsByCategory', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;