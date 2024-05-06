import * as admin from "firebase-admin";

admin.initializeApp();

import {
  apiTestFunction,
} from "./functions/test/api_test_function";
exports.apiTestFunction =
  apiTestFunction;


import {
  apiTestFunctionPost,
} from "./functions/test/api_test_function_post";
exports.apiTestFunctionPost =
  apiTestFunctionPost;

import {
  askSupport,
} from "./functions/ask_support";
exports.askSupport =
  askSupport;

import {
  newsletterSubscribe,
} from "./functions/newsletter_subscribe";
exports.newsletterSubscribe =
  newsletterSubscribe;


import {
  commandValidated,
} from "./functions/command_validated";
exports.commandValidated =
  commandValidated;
