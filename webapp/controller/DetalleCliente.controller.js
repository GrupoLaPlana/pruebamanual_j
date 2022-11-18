sap.ui.define([
   // "sap/ui/core/mvc/Controller"
    "es/seidor/curso/pruebamanualj/controller/ControladorBase"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("es.seidor.curso.pruebamanualj.controller.DetalleCliente", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var oRuta = oRouter.getRoute("RouteDetalleCliente");
                oRuta.attachMatched(this.meHanLlamado, this);
                var oModelo = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oModelo, "miCliente");
                var oModelo2 = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oModelo2, "misPedidos");
            },
            meHanLlamado:function(oEvent){
                //recupero parámetros de la ruta
                var scodcli = oEvent.getParameter("arguments").cliente;
                var oView = this.getView();
               // oView.bindElement("/ClienteSet('" + scodcli + "')");

               this.getView().getModel().read(
                    "/ClienteSet('" + scodcli + "')",
                    {
                        success: function(oData){
                            oData.Kunnr = '000' + oData.Kunnr;
                            this.getView().getModel("miCliente").setData(oData);
                        }.bind(this),
                        error: function(oError){
                            MessageToast.show("Se ha producido un error");
                        }.bind(this)
                    }
               );

                //obtengo la lista de pedidos
                this.enlazarLista(scodcli);

            },
            enlazarLista: function (scodcli) {
                var oBinding = this.getView().byId("ListaPedcli1").getBinding('items');
                var aFilters = [
                        new sap.ui.model.Filter({
                            path: 'Kunnr',
                            operator: 'EQ',
                            value1: scodcli
                        })
                ];
                oBinding.filter(aFilters);
            },
            onPressDetallePedido: function(oEvent) {
                var oItem = oEvent.getSource();
                var oInformacionEnlace = oItem.getBindingContext();
                // 
                var sPedido = oInformacionEnlace.getProperty("Vbeln");
                var oCliente = oInformacionEnlace.getObject();
                              
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                oRouter.navTo("RouteDetallePedido", {pedido:sPedido});
                
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
