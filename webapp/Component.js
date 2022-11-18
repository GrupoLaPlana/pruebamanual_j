/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "es/seidor/curso/pruebamanualj/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("es.seidor.curso.pruebamanualj.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();
                this.getModel().setSizeLimit(999999);
                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                this.miVariableGlobal = 1;
            }
        });
    }
);