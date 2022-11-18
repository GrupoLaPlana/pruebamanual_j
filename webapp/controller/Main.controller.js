sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("es.seidor.curso.pruebamanualj.controller.Main", {
            onInit: function () {

                this.miFuncion("Juan");
                var oButton = new sap.m.Button("idButtonDinamico", {text:"Botón dinámico"});
                oButton.attachPress(this.onPressDinamico, this);
                //aquí añadimos el botón en la página
                var oPage = this.getView().byId("idPageMain");
                //esta opción es para añadirla en el SimpleForm
                //var oPage = this.getView().byId("idSimpleForm");
                oPage.addContent(oButton);
     
            },
            onPressDinamico: function(oEvent) {
                
                var oCheck = new sap.m.Switch("idSwitch");
                oCheck.attachChange(this.onPressSwitch, this); 
                var oSimple = this.getView().byId("idSimpleForm");
                oSimple.addContent(oCheck);
             
            },
            onPressSwitch: function (oEvent) {
                if (oEvent.getParameter("state") == true){  // getSource().getState()
                    if (sap.ui.getCore().byId("idAreaText") == undefined){
                        var oText = new sap.m.TextArea(this.createId("idAreaText"), {});
                        var oSimple = this.getView().byId("idSimpleForm");
                        //this.getView().byId("idSimpleForm").addContent(oText);
                        oSimple.addContent(oText);
                    }
                    else
                    {
                        //this.getView().byId("idAreaText").setVisible(true);
                        sap.ui.getCore().byId("idAreaText").setVisible(true);
                    }
                }
                else{
                    if (sap.ui.getCore().byId("idAreaText")){
                        sap.ui.getCore().byId("idAreaText").setVisible(false);
                    };
                };
            },

            onChangeInput: function (oEvent) {
                var oNombre = this.getView().byId("idDatoEnviado");
                var oDatoRec = this.getView().byId("idDatoRecogido");
                var sValorCampoCliente = oNombre.getValue();

                if (sValorCampoCliente != ""){
                    sap.m.MessageToast.show("¡Hola " + sValorCampoCliente + "!");

                    oNombre.setValue("");
                    oDatoRec.setValue(sValorCampoCliente);
                };                
     
            },
            onChangePasswd1: function (oEvent) {
                var oNombre = this.getView().byId("idDatoEnviado");
                var sValorCampoCliente = oNombre.getValue();

                var oPassword = this.getView().byId("passwd");
                var sValorCampoPass = oPassword.getValue();

                if (sValorCampoCliente != "curso" && sValorCampoPass != "123"){
                    sap.m.MessageToast.show("Error en usuario contraseña");

                   //oNombre.setValue("");
                   // oDatoRec.setValue(sValorCampoCliente);
                };                
     
            },
            onChangePasswd: function (oEvent) {
                var oNombre = this.getView().byId("idDatoEnviado");
                var sValorCampoCliente = oNombre.getValue();

                var sValorCampoPass = oEvent.getParameter("value"); // el evento se trae del input

                if (sValorCampoCliente != "curso" && sValorCampoPass != "123"){
                    sap.m.MessageToast.show("Error en usuario contraseña");

                   //oNombre.setValue("");
                   // oDatoRec.setValue(sValorCampoCliente);
                };                
     
            },
            onPressNavegaView1: function(){
                var sNombre = this.getView().byId("idDatoRecogido").getValue();
                var sAreaT = this.getView().byId("idAreaText").getValue();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteView1",{nombre:sNombre, areat:sAreaT});
            },
            onPressNavegaListaClientes: function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteListaClientes");
            },
            onPressNavegaSPListaClientes: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteListaClientesSA");
            },
            onPressNavegaTableClientes: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteListaClientesTB");
            },
            onPressSaluda: function (oEvent) {

                sap.m.MessageToast.show("¡Hola mundo!");
            },
            onPressCierraAPP: function (oEvent){
                window.close();
            },
            miFuncion: function(oEvent){
                var miNombre = oEvent;
        }
        });
    });
