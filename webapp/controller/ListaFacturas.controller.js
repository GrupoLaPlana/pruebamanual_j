sap.ui.define([
    "es/seidor/curso/pruebamanualj/controller/ControladorBase",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox,MessageToast) {
        "use strict";

        return Controller.extend("es.seidor.curso.pruebamanualj.controller.ListaFacturas", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var oRuta = oRouter.getRoute("RouteListaFacturas");
                oRuta.attachMatched(this.onRouteMatched, this);
                var oModelo = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oModelo, "misFacturas");
                

            },
            onRouteMatched: function(oEvent){
                var sPedido = oEvent.getParameter("arguments").pedido;
                var oBinding = this.getView().byId("idListaFacturas").getBinding('items');
                var aFilters = [
                    new sap.ui.model.Filter({
                        path: 'Vbeln',
                        operator: 'EQ',
                        value1: sPedido })
                    ];
                oBinding.filter(aFilters);
            },
            onPressGestionaFactura: function(oEvent){
                if (!this.oDialogGestionaFactura){
                    //utilizo this para que sea global y no utilizo var en dialogo
                    this.oDialogGestionaFactura = sap.ui.xmlfragment("es.seidor.curso.pruebamanualj.view.fragments.gestionaFactura",this);
                    //para poder acceder a esta lista necesito el siguiente comando
                    this.getView().addDependent(this.oDialogGestionaFactura);
                   };
                   var oFactura = oEvent.getSource().getBindingContext().getObject();  //enlazo la vista con la factura
                   oFactura.Fecha = new Date(Date.UTC(oFactura.Fecha.getFullYear(),
                                    oFactura.Fecha.getMonth(),oFactura.Fecha.getDate()));
                   this.getView().getModel("misFacturas").setData(oFactura);
                  // this.getView().getModel("misFacturas").setProperty("/numFactura",oFactura.VbelnVf);
                  // this.getView().getModel("misFacturas").setProperty("/fecha",oFactura.Erdat);
                  // this.getView().getModel("misFacturas").setProperty("/importe",oFactura.Netwr);
                  // this.getView().getModel("misFacturas").setProperty("/impuesto",oFactura.Impuesto);
                   this.oDialogGestionaFactura.open();
            },
            onGestionaFacturaUpdate: function(oEvent){
                var oFacturaUpd = this.getView().getModel("misFacturas").getData();
                oFacturaUpd.Fecha = new Date(Date.UTC(oFacturaUpd.Fecha.getFullYear(),
                                    oFacturaUpd.Fecha.getMonth(),oFacturaUpd.Fecha.getDate()));
                this.getView().setBusy(true);
                this.getView().getModel().update("/FacturaSet(VbelnVf='"+oFacturaUpd.VbelnVf+"')",
                    {
                        VbelnVf: oFacturaUpd.VbelnVf,
                        Fecha: oFacturaUpd.Fecha,
                        Impuesto: oFacturaUpd.Impuesto+'',
                        Waers: oFacturaUpd.Waers,
                        Netwr: oFacturaUpd.Netwr
                    }, {
                    success: function(oData){
                        MessageToast.show("createSuccess");
                        this.getView().byId("idListaFacturas").getBinding('items').refresh();
                        this.getView().setBusy(false);
                        this.oDialogGestionaFactura.close();
                        
                        }.bind(this),
                    error: function(oResponse){
                        MessageBox.error("createError");
                        this.getView().setBusy(false);
                        MessageToast.show('¡Error!');
                        }.bind(this)
                    });
            },

            onGestionaFacturaDelete: function(oEvent){
                var oFacturaUpd = this.getView().getModel("misFacturas").getData();
                this.getView().setBusy(true);
                this.getView().getModel().remove("/FacturaSet(VbelnVf='"+oFacturaUpd.VbelnVf+"')",
                     {
                    success: function(oData){
                        MessageBox.success("createSuccess");
                        this.getView().setBusy(false);
                        this.oFragmentGestionaFactura.close();
                        }.bind(this),
                    error: function(oResponse){
                        MessageBox.success("createError");
                        this.getView().setBusy(false);
                        MessageToast.show('¡Error!');
                        }.bind(this)
                    });
            },
            onCerrarGestionaFactura: function() {
                this.oDialogGestionaFactura.close();
            } /*,
            onNavBack: function () {
                var oHistory = sap.ui.core.routing.History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
                if (sPreviousHash !== undefined) {
                window.history.go(-1);
                } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteMain", {}, true);
                }
                } */
        });
    });
