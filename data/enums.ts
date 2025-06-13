enum TransactionType {
  REQUEST = "requested",
  PAY = "paid",
}

enum Strings {
  DELETED = "(Deleted)",
  COMMENT = "Very new Comment",
}

enum UrlLinks {
  API_BASE_URL = "http://localhost:3002",
}

enum UrlEndpoints {
  LOGIN = "/login",
  BANK_ACCOUNTS = "/bankAccounts/",
  COMMENTS = "/comments/",
  TRANSACTIONS = "/transactions/",
  USERS = "/users",
  USERS_BY_ID = "/users/profile/",
}

enum ApiLoginType {
  LOGIN = "LOGIN",
}

export { TransactionType, Strings, UrlLinks, UrlEndpoints, ApiLoginType };
