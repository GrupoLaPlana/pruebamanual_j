sap.ui.define([
    "es/seidor/curso/pruebamanualj/controller/ControladorBase",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("es.seidor.curso.pruebamanualj.controller.DetallePedido", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var oRuta = oRouter.getRoute("RouteDetallePedido");
                oRuta.attachMatched(this.meHanLlamado, this);
                var oModelo = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oModelo, "misPedidos");

                var oModeloFactura = new sap.ui.model.json.JSONModel(
                    {
                        numPedido: "",
                        fecha: new Date(),
                        importe: 0,
                        moneda: "EUR",
                        impuesto: 0
                    }
                );
                this.getView().setModel(oModeloFactura, "miFactura"); 

            },
            onAfterRendering: function () {
              var a = 'hola';
            },
            meHanLlamado:function(oEvent){
                //recupero parámetros de la ruta
                var spedido = oEvent.getParameter("arguments").pedido;
                var oView = this.getView();
                oView.bindElement("/PedidoClienteSet('" + spedido + "')");
             //   this.getView().getElementBinding().refresh();
              
            },
           
            onCrearFactura: function(oEvent) {
                if (!this.oDialogCrearFactura){
                 //utilizo this para que sea global y no utilizo var en dialogo
                 this.oDialogCrearFactura = sap.ui.xmlfragment("es.seidor.curso.pruebamanualj.view.fragments.crearFactura",this);
                 //para poder acceder a esta lista necesito el siguiente comando
                 this.getView().addDependent(this.oDialogCrearFactura);
                };
                var oPedido = this.getView().getBindingContext().getObject();  //enlazo la vista con el pedido
                this.getView().getModel("miFactura").setProperty("/numPedido",oPedido.Vbeln);
                this.getView().getModel("miFactura").setProperty("/fecha",oPedido.Erdat);
                this.getView().getModel("miFactura").setProperty("/importe",oPedido.Netwr);
                this.oDialogCrearFactura.open();
            },
            onCrearFacturaDo: function(oEvent){
                var oFactura = this.getView().getModel("miFactura").getData();

                // llamamos al modelo de create oData
                oFactura.fecha = new Date(Date.UTC(oFactura.fecha.getFullYear(),
                    oFactura.fecha.getMonth(),oFactura.fecha.getDate()));

                this.getView().getModel().create("/FacturaSet",{
                                                    Vbeln: oFactura.numPedido,
                                                    Fecha: oFactura.fecha,
                                                    Impuesto: oFactura.impuesto+'',
                                                    Waers: oFactura.moneda,
                                                    Netwr: oFactura.importe
                                                    }, 
                                                    {
                                                        success: function(oData) {
                                                            MessageBox.success("createSuccess");
                                                            this.oDialogCrearFactura.close();
                                                            }.bind(this),
                                                        error: function(e) {
                                                            MessageBox.error("createError"); }
                                                     })
            },
            onCerrarCrearFactura: function() {
                this.oDialogCrearFactura.close();
            },
            onPressVhMoneda:function(oEvent) {
                if (!this.oDialogMoneda){
                    //utilizo this para que sea global y no utilizo var en dialogo
                    this.oDialogMoneda = sap.ui.xmlfragment("es.seidor.curso.pruebamanualj.view.fragments.vhMoneda",this);
                    this.getView().addDependent(this.oDialogMoneda);
                    };
                    this.oDialogMoneda.open();
            },
            onSelectMoneda: function(oEvent) {
                var sMoneda = oEvent.getParameter("selectedItem").getBindingContext().getProperty("Waers");  
                this.getView().getModel("miFactura").setProperty("/moneda",sMoneda);
            },
            onSearchMoneda: function(oEvent) {
                //recupera la cadena de búsqueda del search
                var sCadena = oEvent.getParameter("value");

                var oItemsBinding = oEvent.getParameter("itemsBinding");
                
                
              //  var oFiltro = new sap.ui.model.Filter("Waers",sap.ui.model.FilterOperator.Contains,sCadena.toUpperCase());
                
                var oFiltro = new sap.ui.model.Filter({
                    filters:[
                        new sap.ui.model.Filter("Waers",sap.ui.model.FilterOperator.Contains,sCadena.toUpperCase()),
                        new sap.ui.model.Filter("Ltext",sap.ui.model.FilterOperator.Contains,sCadena)
                    ],
                    and: false
                });

                oItemsBinding.filter(oFiltro);


            },
            onVisualizaFacturas: function(oEvent){
                var oItem = oEvent.getSource();
                var oInformacionEnlace = oItem.getBindingContext();
                // 
                var sPedido = oInformacionEnlace.getProperty("Vbeln");
                //var oCliente = oInformacionEnlace.getObject();
                              
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                oRouter.navTo("RouteListaFacturas", {pedido:sPedido});
            }
        });
    });
