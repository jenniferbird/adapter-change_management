


/**
 * Import the Node.js request package.
 * See https://www.npmjs.com/package/request
 */
const request = require('request');


// We'll use this regular expression to verify REST API's HTTP response status code.
const validResponseRegex = /(2\d\d)/;

// ServiceNow credentials
const options = {
  url: 'https://dev102064.service-now.com/',
  username: 'admin',
  password: 'EK7obHg7omHI',
  serviceNowTable: 'change_request'
};
// Import built-in Node.js package path.
const path = require('path');

/**
 * Import the ServiceNowConnector class from local Node.js module connector.js.
 *   and assign it to constant ServiceNowConnector.
 * When importing local modules, IAP requires an absolute file reference.
 * Built-in module path's join method constructs the absolute filename.
 */
const ServiceNowConnector = require(path.join(__dirname, './connector.js'));

/**
 * @function mainOnObject
 * @description Instantiates an object from the imported ServiceNowConnector class
 *   and tests the object's get and post methods.
 * @param {iapCallback} callback - Callback a function.
 * @param {(object|string)} callback.data - The API's response. Will be an object if sunnyday path.
 *   Will be HTML text if hibernating instance.
 * @param {error} callback.error - The error property of callback.
 */
function mainOnObject() {
  // Instantiate an object from class ServiceNowConnector.
  const connector = new ServiceNowConnector(options);
  
  // Test the object's get and post methods.
  // You must write the arguments for get and post.
    console.log('am I really running');
  connector.get(callback  => {
    console.log(`RESULTS:${JSON.stringify(callback.data)}`  );
    console.log('error:' + callback.error);
  //  if (error) {
  //    console.error(`\nError returned from GET request:\n${JSON.stringify(error)}`);
  //  }
    console.log(`\nResponse returned from GET request:\n${JSON.stringify(callback.data)}`);
  });

  connector.post( (data, error) => {
    if (error) {
      console.error(`\nError returned from POST request:\n${JSON.stringify(error)}`);
    }
    console.log(`\nResponse returned from POST request:\n${JSON.stringify(data)}`);
    console.log('RESULTS:' + data);
    console.log('error:' + error);
  });

}
  //this.sendRequest(myOptions, (results, error) => callback(results, error));

// Call mainOnObject to run it.
mainOnObject();