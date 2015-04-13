'use strict';

describe('The queue app', function () {
    var page;

    beforeEach(function () {
        browser.get('http://127.0.0.1:1337/index.html');
        page = require('./main.po');
    });

    describe('add customer block', function () {
        it('should show an alert if name field blank', function () {
            page.firstProductEl.click();
            page.addButtonEl.click();

            var alertDialog = browser.switchTo().alert().then(function (alert) {
                var text = alert.getText();
                alert.accept();
                expect(text).toBe('You must give a name');
            });
        });
        it('should show an alert if select field blank', function () {
            page.nameEl.sendKeys('Mr Qudini');
            page.addButtonEl.click();

            var alertDialog = browser.switchTo().alert().then(function (alert) {
                var text = alert.getText();
                alert.accept();
                expect(text).toBe('You must select a product');
            });
        });
        it('should add user to queueing customers block', function () {

            page.queueingCustomers.count().then(function (initialCount) {
                page.nameEl.sendKeys('Mr Qudini');
                page.firstProductEl.click();

                page.addButtonEl.click();

                expect(page.queueingCustomers.count()).toBe(initialCount + 1);
            });

        });
    });

    describe('queueing customers block', function () {
        it('should show a Queue list of customers', function () {
            expect(page.queueingCustomers.count()).not.toBe(0);
        });

        it('remove clicks removes one customer n drops it from the list', function () {
            page.queueingCustomers.count().then(function (initialCount) {

                page.queueingCustomers.get(0).element(by.buttonText('Remove')).click();
                expect(page.queueingCustomers.count()).toBe(initialCount - 1);

            });
        });

        it('serve clicks serves one customer n drops it from the list', function () {
            page.queueingCustomers.count().then(function (initialqueueCount) {

                page.servedCustomers.count().then(function(initialServedCount){

                    page.queueingCustomers.get(0).element(by.buttonText('Serve')).click();

                    expect(page.queueingCustomers.count()).toBe(initialqueueCount - 1);

                    expect(page.servedCustomers.count()).toBe(initialServedCount + 1);

                });

            });
        });
    });

});
