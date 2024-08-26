/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ztpr/zticket_processing/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
