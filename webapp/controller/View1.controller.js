sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("es.seidor.curso.pruebamanualj.controller.View1", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var oRuta = oRouter.getRoute("RouteView1");
                oRuta.attachMatched(this.meHanLlamado, this);
            },
            meHanLlamado:function(oEvent){
                //recupero parámetros de la ruta
                var sNombre = oEvent.getParameter("arguments").nombre;
                this.getView().byId("idInputView1").setValue(sNombre);
            },
            onNavBack: function () {
                var oHistory = sap.ui.core.routing.History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
                if (sPreviousHash !== undefined) {
                window.history.go(-1);
                } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteMain", {}, true);
                }
                }
        });
    });
