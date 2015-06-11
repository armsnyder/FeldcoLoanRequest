"use strict";

require("./helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    Q = require('q'),
    serverConfigs = require('./helpers/appium-servers');

describe("Feldco", function () {
    this.timeout(30000);
    var driver;
    var allPassed = true;

    before(function () {
        var serverConfig = process.env.SAUCE ?
            serverConfigs.sauce : serverConfigs.local;
        driver = wd.promiseChainRemote(serverConfig);
        require("./helpers/logging").configure(driver);

        var desired = _.clone(require("./helpers/caps").mycapabilities);
        desired.app = require("./helpers/apps").myTestApp;
        if (process.env.SAUCE) {
            desired.name = 'Feldco';
            desired.tags = ['Feldco'];
        }
        return driver.init(desired);
    });

    after(function () {
        return driver
            .quit()
            .finally(function () {
                if (process.env.SAUCE) {
                    return driver.sauceJobStatus(allPassed);
                }
            });
    });

    afterEach(function () {
        allPassed = allPassed && this.currentTest.state === 'passed';
    });

    it("should not accept false credentials", function () {
        return driver
            .elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIAScrollView[1]/UIAWebView[1]/UIATextField[1]").sendKeys("Trudy")
            .elementByXPath("//UIAApplication[1]/UIAWindow[2]/UIAToolbar[1]/UIAButton[2]").click()
            .elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIAScrollView[1]/UIAWebView[1]/UIASecureTextField[1]").sendKeys("haxxor")
            .elementByXPath("//UIAApplication[1]/UIAWindow[2]/UIAToolbar[1]/UIAButton[3]").click()
            .elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIAScrollView[1]/UIAWebView[1]/UIAButton[1]").click()
            .elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIANavigationBar[1]/UIAStaticText[1]").text()
            .should.eventually.equal('Log In');
    });

});