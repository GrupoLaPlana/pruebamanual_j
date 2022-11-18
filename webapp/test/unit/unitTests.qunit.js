/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"esseidorcurso/pruebamanual_j/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
