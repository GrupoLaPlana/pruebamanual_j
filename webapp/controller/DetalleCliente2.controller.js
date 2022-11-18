sap.ui.define([
  //  "sap/ui/core/mvc/Controller"
  "es/seidor/curso/pruebamanualj/controller/ControladorBase",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("es.seidor.curso.pruebamanualj.controller.DetalleCliente2", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var oRuta = oRouter.getRoute("RouteDetalleCliente2");
                oRuta.attachMatched(this.meHanLlamado, this);
                var oModelo = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oModelo, "misPedidos");
            },
            meHanLlamado:function(oEvent){
                //recupero parámetros de la ruta
                var scodcli = oEvent.getParameter("arguments").cliente2;
                var oView = this.getView();
                oView.bindElement("/ClienteSet('" + scodcli + "')");

                //añado lista de pedidos del cliente
                this.getView().getModel().read(
                    "/PedidoClienteSet",  
                    {
                        filters:[
                            new sap.ui.model.Filter({
                            path : "Kunnr",
                            operator: "EQ",
                            value1: scodcli
                            })
                            ],
                        success: function(oData){
                            this.getView().getModel("misPedidos").setData(oData.results);
                        }.bind(this),
                        error: function(oError){
                            MessageToast.show("Se ha producido un error");
                        }.bind(this)
                    }
               );
            }
        });
    });
