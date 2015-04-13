/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() { 
  this.nameEl = element(by.model('name'));
  this.productEl = element(by.model('product'));
  this.firstProductEl = element(by.cssContainingText('option', 'Grammatical advice'));
  this.addButtonEl = element(by.buttonText('Add'));

  this.queueingCustomers = element.all(by.css('.Queue-customer-list customer'));

  this.servedCustomers = element.all(by.css('.Queue-customer-served-list customer'));
};

module.exports = new MainPage();
