sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ndc/BarcodeScanner",
],
function (Controller,BarcodeScanner) {
    "use strict";

    return Controller.extend("equipment.controller.View1", {
        onInit: function () {

        },
        onButtonPress: function () {
            var that = this;
            BarcodeScanner.scan(
                function (result) {
                    if (result.cancelled) {
                        MessageBox.error("Scanning cancelled");
                    } else {
                        var sScannedValue = result.text;
                        that._processScannedEquipment(sScannedValue);
                    }
                },
                function (error) {
                    MessageBox.error("Scanning failed: " + error);
                }
            );
        },
    });
});
