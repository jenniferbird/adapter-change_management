const request = require('request');

const validResponseRegex = /(2\d\d)/;


/**
 * The ServiceNowConnector class.
 *
 * @summary ServiceNow Change Request Connector
 * @description This class contains properties and methods to execute the
 *   ServiceNow Change Request product's APIs.
 */
class ServiceNowConnector {

  /**
   * @memberof ServiceNowConnector
   * @constructs
   * @description Copies the options parameter to a public property for use
   *   by class methods.
   *
   * @param {object} options - API instance options.
   * @param {string} options.url - Your ServiceNow Developer instance's URL.
   * @param {string} options.username - Username to your ServiceNow instance.
   * @param {string} options.password - Your ServiceNow user's password.
   * @param {string} options.serviceNowTable - The table target of the ServiceNow table API.
   */
  constructor(options) {
    this.options = options;
  }

  /**
   * @callback iapCallback
   * @description A [callback function]{@link
   *   https://developer.mozilla.org/en-US/docs/Glossary/Callback_function}
   *   is a function passed into another function as an argument, which is
   *   then invoked inside the outer function to complete some kind of
   *   routine or action.
   *
   * @param {*} responseData - When no errors are caught, return data as a
   *   single argument to callback function.
   * @param {error} [errorMessage] - If an error is caught, return error
   *   message in optional second argument to callback function.
   */

  /**
   * @memberof ServiceNowConnector
   * @method get
   * @summary Calls ServiceNow GET API
   * @description Call the ServiceNow GET API. Sets the API call's method and query,
   *   then calls this.sendRequest(). In a production environment, this method
   *   should have a parameter for passing limit, sort, and filter options.
   *   We are ignoring that for this course and hardcoding a limit of one.
   *
   * @param {iapCallback} callback - Callback a function.
   * @param {(object|string)} callback.data - The API's response. Will be an object if sunnyday path.
   *   Will be HTML text if hibernating instance.
   * @param {error} callback.error - The error property of callback.
   */
  get() {
    let getCallOptions = { ...this.options };
    const myOptions = {method: 'GET',
                       query: 'sysparm_limit=1',
                       serviceNowTable: getCallOptions.serviceNowTable,
                       username: getCallOptions.username,
                       password: getCallOptions.password,
                       url: getCallOptions.url};
  //    console.log('get:getCallOptions.method: ' + myOptions.method);
  //    console.log('get:getCallOptions.query: ' + myOptions.query);
  //    console.log('gett:getCallOptions.serviceNowTable: ' + myOptions.serviceNowTable);
  this.sendRequest(myOptions, (results, error) => (results, error));
    //getCallOptions.method = 'GET';
    //getCallOptions.query = 'sysparm_limit=1';
    //this.sendRequest(getCallOptions, (results, error) => callback(results, error));
  }




/**
 * @memberof ServiceNowConnector
 * @method post
 * @summary Calls ServiceNow GET API
 * @description Call the ServiceNow POST API. Sets the API call's method,
 *   then calls sendRequest().
 *
 * @param {iapCallback} callback - Callback a function.
 * @param {(object|string)} callback.data - The API's response. Will be an object if sunnyday path.
 *   Will be HTML text if hibernating instance.
 * @param {error} callback.error - The error property of callback.
 */
post() {
    let getCallOptions = { ...this.options };
    const myOptions = {method: 'POST',
                       query: '',
                       serviceNowTable: getCallOptions.serviceNowTable,
                       username: getCallOptions.username,
                       password: getCallOptions.password,
                       url: getCallOptions.url};
  this.sendRequest(myOptions, (data, error) => (data, error));
}


/**
 * 
   * @memberof ServiceNowConnector
   * @method constructUri
   * @summary Builds the URL
   * @description Build and return the proper URI by appending an optionally passed
   *   [URL query string]{@link https://en.wikipedia.org/wiki/Query_string}.
   *
   * @param {string} serviceNowTable - The table target of the ServiceNow table API.
   * @param {string} [query] - Optional URL query string.
   *
   * @return {string} ServiceNow URL
 */
constructUri(serviceNowTable, query = null) {
    let getCallOptions = { ...this.options };
  //let uri = `/api/now/table/` + getCallOptions.serviceNowTable;
  let uri = `/api/now/table/${getCallOptions.serviceNowTable}`;
  if ( query) {
    uri = uri + '?' + query;
  }
  //getCallOptions.uri = uri;
  return uri;
}


/**
 * @memberof ServiceNowConnector
 * @method isHibernating
 * @summary Checks is ServiceNow is Hibernating
 * @description Checks if request function responded with evidence of
 *   a hibernating ServiceNow instance.
 *
 * @param {object} response - The response argument passed by the request function in its callback.
 *
 * @return {boolean} Returns true if instance is hibernating. Otherwise returns false.
 */
isHibernating(response) {
  return response.body.includes('Instance Hibernating page')
  && response.body.includes('<html>')
  && response.statusCode === 200;
}

/**
 * @memberof ServiceNowConnector
 * @method processRequestResults
 * @summary process errors
 * @description Inspect ServiceNow API response for an error, bad response code, or
 *   a hibernating instance. If any of those conditions are detected, return an error.
 *   Else return the API's response.
 *
 * @param {error} error - The error argument passed by the request function in its callback.
 * @param {object} response - The response argument passed by the request function in its callback.
 * @param {string} body - The HTML body argument passed by the request function in its callback.
 * @param {iapCallback} callback - Callback a function.
 * @param {(object|string)} callback.data - The API's response. Will be an object if sunnyday path.
 *   Will be HTML text if hibernating instance.
 * @param {error} callback.error - The error property of callback.
 */
processRequestResults(helpOptions) {
  /**
   * You must build the contents of this function.
   * Study your package and note which parts of the get()
   * and post() functions evaluate and respond to data
   * and/or errors the request() function returns.
   * This function must not check for a hibernating instance;
   * it must call function isHibernating.
   */
   
    let gethelpOptions = { ...this.options };
 //     console.log('processRequestResults:gethelpOptions.statusCode: ' + helpOptions.statusCode);
 //     console.log('processRequestResults:gethelpOptions.error:' + helpOptions.error);
    // Initialize return arguments for callback
  let processedResults = null;
  let processedError = null;

    if (helpOptions.error) {
      console.error('Error present.' + helpOptions.error);//'Error present.');
      processedError = helpOptions.error;
    } else if (!validResponseRegex.test(helpOptions.response.statusCode)) {
      console.error('Bad response code.');
      processedError = helpOptions.response;
    } else if (this.isHibernating(helpOptions.response)) {
      processedError = 'Service Now instance is hibernating';
      console.error(processedError);
    } else {
      processedResults = helpOptions.response;
 //     callback.data = helpOptions.response;
    };
    
    console.log(' processedResults' +  processedResults);
    console.log(' processedError' +  processedError);
 //   return  (callback.data, processedError);
    return  (processedResults, processedError);
}


/**
 * 
 * @memberof ServiceNowConnector
 * @method sendRequest
 * @summary Execute request call
 * @description Builds final options argument for request function
 *   from global const options and parameter callOptions.
 *   Executes request call, then verifies response.
 *
 * @param {object} callOptions - Passed call options.
 * @param {string} callOptions.query - URL query string.
 * @param {string} callOptions.serviceNowTable - The table target of the ServiceNow table API.
 * @param {string} callOptions.method - HTTP API request method.
 * @param {iapCallback} callback - Callback a function.
 * @param {(object|string)} callback.data - The API's response. Will be an object if sunnyday path.
 *   Will be HTML text if hibernating instance.
 * @param {error} callback.error - The error property of callback.
 */
sendRequest(myOptions) {
    let getCallOptions = { ...this.options };
  // Initialize return arguments for callback
  let uri;
  //    console.log('sendRequest:getCallOptions.method: ' + myOptions.method);
     console.log('sendRequest:getCallOptions.query: ' + myOptions.query);
  //    console.log('sendRequest:getCallOptions.serviceNowTable: ' + myOptions.serviceNowTable);
  if (myOptions.query){
    uri = this.constructUri(getCallOptions.serviceNowTable, myOptions.query);
    console.log(uri);
    }
  else {
    uri = this.constructUri(getCallOptions.serviceNowTable);
    console.log(uri);
  }
  /**
   * You must build the requestOptions object.
   * This is not a simple copy/paste of the requestOptions object
   * from the previous lab. There should be no
   * hardcoded values.
   */
  const requestOptions = { method: myOptions.method,
    auth: {
      user: getCallOptions.username,
      pass: getCallOptions.password,
    },
    baseUrl: getCallOptions.url,
    uri: uri};
  request(requestOptions, (error, response, body) => {
  //    console.log(' request.response.error:' + error);
  //    console.log(`\nResponse returned from POST request:\n${JSON.stringify(response)}`);
  //    console.log(' request.response.body:' + body);
      const helpOptions = {error: error,
                           response: response,
                           body: body,
                           statusCode: response.statusCode};
    //    console.log('response:' + response);
    //  console.log(' helpOptions.statusCode:' + helpOptions.statusCode);

    //this.processRequestResults(error, response, body);
    this.processRequestResults(helpOptions, (data, error) => (data, error));
    //this.sendRequest(getCallOptions, (processedResults, processedError) => callback(processedResults, processedError));
  });
}
}
module.exports = ServiceNowConnector;