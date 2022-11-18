sap.ui.define([
  //  "sap/ui/core/mvc/Controller"
  "es/seidor/curso/pruebamanualj/controller/ControladorBase",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("es.seidor.curso.pruebamanualj.controller.ListaClientes", {
            onInit: function () {
     
            },
            onPressDetalleCliente: function(oEvent) {
                var oItem = oEvent.getSource();
                var oInformacionEnlace = oItem.getBindingContext();
                // 
                var sCliente = oInformacionEnlace.getProperty("Kunnr");
                var oCliente = oInformacionEnlace.getObject();
                              
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                if(this.getView().byId("idSwitch").getState()){
                    oRouter.navTo("RouteDetalleCliente2", {cliente2:sCliente});
                }else{
                    oRouter.navTo("RouteDetalleCliente", {cliente:sCliente});  
                };

              
            },
            onSearchCliente: function(oEvent){
                var sCadCli = oEvent.getSource().getValue();
                var oItemsBinding = this.getView().byId("idListaCli").getBinding("items");
                
                
              //  var oFiltro = new sap.ui.model.Filter("Waers",sap.ui.model.FilterOperator.Contains,sCadena.toUpperCase());
                
                var oFiltro = new sap.ui.model.Filter({
                    filters:[
                        new sap.ui.model.Filter("Kunnr",sap.ui.model.FilterOperator.Contains,sCadCli),
                        new sap.ui.model.Filter("Name1",sap.ui.model.FilterOperator.Contains,sCadCli.toUpperCase())
                            ],
                    and: false
                });

                oItemsBinding.filter(oFiltro);

            },
            onOpenFiltros: function(oEvent) {
                if (!this.oDialogCrearFiltro){
                    //utilizo this para que sea global y no utilizo var en dialogo
                    this.oDialogCrearFiltro = sap.ui.xmlfragment("es.seidor.curso.pruebamanualj.view.fragments.filtrosCliente",this);
                    //para poder acceder a esta lista necesito el siguiente comando
                    this.getView().addDependent(this.oDialogCrearFiltro);
                   };
                   this.oDialogCrearFiltro.open();
            },
            onConfirmar: function(oEvent) {
                //obtengo parámetros del View por ordenación


                var mParams = oEvent.getParameters();
                var oList = this.getView().byId("idListaCli");
                var oBinding = oList.getBinding("items");
                var aSorters = [];

                if(mParams.groupItem){
                    var sPathGroup = mParams.groupItem.getKey();
                    var bDescendingGroup = mParams.groupDescending;
                    var vGroup = function(oContext) {
                    var name = oContext.getProperty(sPathGroup);
                    return { key: name, text: name }
                                                 };
                    aSorters.push(new sap.ui.model.Sorter(sPathGroup, bDescendingGroup, vGroup));                                                 
                };                                 
                
                
                //ordeno
                if(mParams.sortItem){
                    var sPath = mParams.sortItem.getKey();
                    var bDescending = mParams.sortDescending;
                    aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));
                };

                //obtengo los datos filtrados
                if(mParams.filterItems){
                    var aFilterItems = mParams.filterItems;
                    var aFilters = [];
                    for(var i=0; i< aFilterItems.length; i++){
                        var miFilter = aFilterItems[i];
                        var sValue = miFilter.getKey();
                        var sPath1 = miFilter.getParent().getKey();
                        aFilters.push(new sap.ui.model.Filter(sPath1,"EQ",sValue));
                        };
                };

               

                oBinding.sort(aSorters);    
                oBinding.filter(aFilters);
            
                } 
        });
    });
