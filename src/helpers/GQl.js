import gql from "graphql-tag"; //!GQL Data

const POST_MSP_PAGENAME = gql`//!GQL Data
  mutation crateMspPageName(
    $accountNumber: Int
    $birthdate: String
    $checkPartenerUnder19: String
    $fillingPartenerName: String
    $heightGrade: String
    $url: String
    $token: String
    $APIEndPoint: String
  ) {
    crateMspPageName(
      input: {
        accountNumber: $accountNumber
        birthdate: $birthdate
        checkPartenerUnder19: $checkPartenerUnder19
        fillingPartenerName: $fillingPartenerName
        heightGrade: $heightGrade
        url: $url
        token: $token
        APIEndPoint: $APIEndPoint
      }
    ) {
      response
      message
      displayMessage
    }
  }
`;
export { POST_MSP_PAGENAME }; //!GQL Data

