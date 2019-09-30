'use strict';



const assert = require('assert');
const test = require('selenium-webdriver/testing');
const webdriver = require('selenium-webdriver');
const By = webdriver.By;

let browser;



// Test suite
test.describe("Me page", function() {
    test.beforeEach(function(done) {
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox()).build();

        browser.get('http://localhost:8082/');
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(target));
        });
    }

    function assertH1(target) {
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }



    test.it("Test index", function(done) {
        let promise = browser.getTitle();

        promise.then(function(title) {
            assert.equal(title, "Me-sida | jsramverk");
        });

        browser.getTitle().then(function(title) {
            assert.equal(title, "Me-sida | jsramverk");
        });

        assertH1("Min Me-sida i kursen jsramverk");
        matchUrl('/');

        done();
    });



    test.it("Test go to Home", function(done) {
        goToNavLink("Hem");
        assertH1("Min Me-sida i kursen jsramverk");
        matchUrl('/');

        done();
    });



    test.it("Test go to About", function(done) {
        goToNavLink("Om");
        assertH1("Om");
        matchUrl('about');

        done();
    });



    test.it("Test go to Login", function(done) {
        goToNavLink("Logga in");
        assertH1("Logga in");
        matchUrl('login');

        done();
    });
});
