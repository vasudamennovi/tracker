sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/model/FilterOperator",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    Controller,
    JSONModel,
    MessageBox,
    Fragment,
    FilterOperator,
    Spreadsheet,
    exportLibrary
  ) {
    "use strict";
    var EdmType = exportLibrary.EdmType;

    return Controller.extend( "ztpr.zticketprocessing.controller.View1", {
      onInit: function () {
        var oItemLenModel = new JSONModel();
        this.getView().setModel( oItemLenModel, "oItemLenModel" );

        this.N;
        this.getBackendData();
      },
      getBackendData: function () {
        debugger;
        this.N = "";

        sap.ui.core.BusyIndicator.show();
        // var gpfservice = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZTICKET_TOOL_SRV/");
        var gpfservice = this.getOwnerComponent().getModel();
        var t = this,
          ticketNum = [],
          tickSts = [],
          Descrip = [],
          priority = [],
          complexity = [],
          DevSts = [],
          funcConst = [],
          region=[],
          techCons = [];
        gpfservice.read( "/Ticket_DetailsSet", {
          success: function ( oData ) {
            for ( var i = 0; i < oData.results.length; i++ ) {
              delete oData.results[i].__metadata;
              var frmt = sap.ui.core.format.DateFormat.getDateInstance( {
                pattern: "dd-MM-yyyy",
              } );
              var d = frmt.format( new Date( oData.results[i].FsTargetCom ) );
              // oData.results[i].FsTargetCom = d;

              var frmt2 = sap.ui.core.format.DateFormat.getDateInstance( {
                pattern: "dd-MM-yyyy",
              } );
              var d1 = frmt2.format( new Date( oData.results[i].FsReceDate ) );
              // oData.results[i].FsReceDate = d1;

              var frmt3 = sap.ui.core.format.DateFormat.getDateInstance( {
                pattern: "dd-MM-yyyy",
              } );
              var d2 = frmt3.format( new Date( oData.results[i].DevTargetDate ) );
              // oData.results[i].DevTargetDate = d2;

              Descrip.push( oData.results[i].Description );
              tickSts.push( oData.results[i].TicketStatus );
              ticketNum.push( oData.results[i].RICEF_ID );
            }
            var TickNum_C = t.getView().byId( "TickNum" );
            TickNum_C.mBindingInfos.items.length = ticketNum.length;

            var Descrip_C = t.getView().byId( "Descrip" );
            Descrip_C.mBindingInfos.items.length = Descrip.length;

            var FuncCons_C = t.getView().byId( "FuncCons" );
            FuncCons_C.mBindingInfos.items.length = funcConst.length;

            var TechCons_C = t.getView().byId( "TechCons" );
            TechCons_C.mBindingInfos.items.length = techCons.length;

            var Prio_C = t.getView().byId( "Prio" );
            Prio_C.mBindingInfos.items.length = priority.length;

            var Complex_C = t.getView().byId( "Complex" );
            Complex_C.mBindingInfos.items.length = complexity.length;

            var DevSts_C = t.getView().byId( "DevSts" );
            DevSts_C.mBindingInfos.items.length = DevSts.length;

            var TicSts_C = t.getView().byId( "TicSts" );
            TicSts_C.mBindingInfos.items.length = tickSts.length;

            var dashboard = new sap.ui.model.json.JSONModel();
            dashboard.setData( oData.results );
            t.getView().setModel( dashboard, "datamodel1" );

            t.getView().getModel( "oItemLenModel" ).setData( oData.results.length );
            t.getView().getModel( "oItemLenModel" ).refresh();

            tickSts = [...new Set( tickSts )];
            var tickStsModel = new sap.ui.model.json.JSONModel();
            tickStsModel.setData( tickSts );
            t.getView().setModel( tickStsModel, "tickStsModel" );
            Descrip = [...new Set( Descrip )];
            var desModel = new sap.ui.model.json.JSONModel();
            desModel.setData( Descrip );
            t.getView().setModel( desModel, "desModel" );
            //------------------------------------------------------------
            //        		            var ticketNumModel = new JSONModel();
            //        		            ticketNumModel.setData(ticketNum);
            //        		            that.getView().setModel(ticketNumModel, "ticketNumModel");

            //-----------------------------------------------------

            sap.ui.core.BusyIndicator.hide();
          },
          error: function ( error ) {
            sap.ui.core.BusyIndicator.hide();
            var message = error;
            var msg = $( error.response.body ).find( "message" ).first().text();
            var action = "OK";
            new sap.m.MessageBox.error( msg, {
              onClose: function () {
                if ( action === "OK" ) {
                }
              },
            } );
          },
        } );

        gpfservice.read( "/Ticket_f4Set", {
          success: function ( oData ) {
            debugger;
            for ( var i = 0; i < oData.results.length; i++ ) {
              if ( oData.results[i].Field === "C" ) {
                priority.push( oData.results[i] );
              } else if ( oData.results[i].Field === "D" ) {
                complexity.push( oData.results[i] );
              } else if ( oData.results[i].Field === "DS" ) {
                DevSts.push( oData.results[i] );
              } else if ( oData.results[i].Field === "FUU" ) {
                funcConst.push( oData.results[i] );
              } else if ( oData.results[i].Field === "TEU" ) {
                techCons.push( oData.results[i] );
              }
              else if ( oData.results[i].Field === "R" ) {
                region.push( oData.results[i] );
              }
            }
            var prioModel = new sap.ui.model.json.JSONModel();
            prioModel.setData( priority );
            t.getView().setModel( prioModel, "prioModel" );
            var compModel = new sap.ui.model.json.JSONModel();
            compModel.setData( complexity );
            t.getView().setModel( compModel, "compModel" );
            var devStsModel = new sap.ui.model.json.JSONModel();
            devStsModel.setData( DevSts );
            t.getView().setModel( devStsModel, "devStsModel" );
            var funcConstModel = new sap.ui.model.json.JSONModel();
            funcConstModel.setData( funcConst );
            t.getView().setModel( funcConstModel, "funcConstModel" );

            var techConstModel = new sap.ui.model.json.JSONModel();
            techConstModel.setData( techCons );
            t.getView().setModel( techConstModel, "techConstModel" );

            var regionModel = new sap.ui.model.json.JSONModel();
            regionModel.setData( region );
            t.getView().setModel( regionModel, "regionModel" );
          },
        } );

        // gpfservice.read( "/BusinessUnitSet", {
        //   success: function ( oData ) {
        //     //model.BUData = oData.results;
        //     var BU = [];
        //     var buisnessunit = new sap.ui.model.json.JSONModel();
        //     BU = [
        //       ...new Map( oData.results.map( ( m ) => [m.ParentField, m] ) ).values(),
        //     ];
        //     buisnessunit.setData( BU );
        //     t.getView().setModel( buisnessunit, "BUModel" );
        //   },
        // } );
      },
      onRowSelect: function ( oEvent ) {
        debugger;

        var tr = oEvent
          .getSource()
          .getBindingContext( "datamodel1" )
          .getProperty().RICEF_ID;
        var age = oEvent
          .getSource()
          .getBindingContext( "datamodel1" )
          .getProperty().Aging;
        this.getOwnerComponent().getModel( "globalModel" ).ticketage = age;
        
        var router = this.getOwnerComponent().getRouter();
        router.navTo( "RouteView2", { tn: tr, flag: "C" } );
      },
      NavtoView2: function ( evt ) {
        debugger;
        var path = evt
          .getSource()
          .getBindingInfo( "text" )
          .binding.getContext()
          .getPath();
        path = path.split( "/" );
        path = parseInt( path[1] );
        var age = this.getView().getModel( "datamodel1" ).getProperty( "/" )[
          path
        ].Aging;
        this.getOwnerComponent().getModel( "globalModel" ).ticketage = age;

        var tr = evt.oSource.mProperties.text;
        var router = this.getOwnerComponent().getRouter();
        router.navTo( "RouteView2", { tn: tr, flag: "C" } ); //flag "C" indicates it is not a reference  request number//
      },

      create: function () {
        var router = this.getOwnerComponent().getRouter();
        router.navTo( "RouteView2", { tn: "C", flag: "C" } ); //flag "C" indicates it is not a reference  request number//
        //tn='C' indicates creation //
      },
      /////create reference for ticket request//////

      Ref_Ok: function ( evt ) {
        var val = parseInt(
          evt
            .getSource()
            .oPropagatedProperties.oBindingContexts.datamodel1.sPath.slice( 1 )
        );

        var data = evt
          .getSource()
          .getBindingContext( "datamodel1" )
          .getObject().RICEF_ID;

        var val1 = "Z"; //flag create for reference"//
        this.N = "";

        var router = this.getOwnerComponent().getRouter();
        router.navTo( "RouteView2", { tn: data, flag: "Z" } ); //flag 'Z' indicates it is reference request number//
        /*this.fragment.destroy();*/
       
      },
      dclose: function () {
        var t = this;
        t.getView().getDependents()[0].close();
        t.getView().getDependents()[0].destroy();
      },

      CR_Ref: function () {
        var t = this;

        t.fragment = sap.ui.xmlfragment(
          "ztpr.zticketprocessing.fragments.Ref_Ticket_No",
          t
        );
        t.getView().addDependent( t.fragment );
        t.fragment.open();
      },

      //****************this function returns the color***************//
      statusColor: function ( status ) {
        switch ( status ) {
          case "Work In Progress":
            return 1;
          case "Accept":
            return 6;
          case "Hold":
            return 5;
          case "Cancell":
            return 3;
          case "UT":
            return 2;
        }
      },
      statusColor: function ( status ) {
        switch ( status ) {
          case "Work In Progress":
            return 1;
          case "Accept":
            return 6;
          case "Hold":
            return 5;
          case "Cancell":
            return 3;
          case "UT":
            return 2;
        }
      },
      Priority: function ( pr ) {
        switch ( pr ) {
          case "Medium":
            return 9;
          case "Low":
            return 7;
          case "High":
            return 3;
          case "Very High":
            return 1;
        }
      },
      Complexity: function ( com ) {
        switch ( com ) {
          case "Medium":
            return 8;
          case "Simple":
            return 7;
          case "Complex":
            return 3;
        }
      },
      Compcolor: function ( col ) {
        switch ( col ) {
          case "Yes":
            return "green";
          case "No":
            return "red";
        }
      },
      onPressClear: function () {
        this.byId( "TickNum" ).setSelectedItems( "" );
        this.byId( "BusUnit" ).setSelectedItems( "" );
        this.byId( "Descrip" ).setSelectedItems( "" );
        this.byId( "FuncCons" ).setSelectedItems( "" );
        this.byId( "TechCons" ).setSelectedItems( "" );
        this.byId( "Prio" ).setSelectedItems( "" );
        this.byId( "Complex" ).setSelectedItems( "" );
        this.byId( "DevSts" ).setSelectedItems( "" );
        this.byId( "TicSts" ).setSelectedItems( "" );

        var oBinding = this.getView().byId( "dashboard" ).getBinding( "items" );
        !oBinding.filter( [] );
      },

      filterTable: function ( oEvent ) {
        debugger;

        var sQuery = oEvent.getParameter( "value" );
      },
      onSearch: function ( oEvent ) {
        debugger;
        var t = this;
        var sQuery = oEvent.getParameter( "query" );
        if ( oEvent.getId() == "liveChange" ) {
          sQuery = oEvent.getParameter( "newValue" );
        }
        var oFilter1 = new sap.ui.model.Filter( "RICEF_ID", "Contains", sQuery );
        var oFilter2 = new sap.ui.model.Filter(
          "Description",
          "Contains",
          sQuery
        );
        var oFilter3 = new sap.ui.model.Filter( "FuncConst", "Contains", sQuery );
        var oFilter4 = new sap.ui.model.Filter( "TechPs", "Contains", sQuery );
        var oFilter5 = new sap.ui.model.Filter(
          "FsReceDate",
          "Contains",
          sQuery
        );
        var oFilter6 = new sap.ui.model.Filter(
          "DevTargetDate",
          "Contains",
          sQuery
        );
        var oFilter7 = new sap.ui.model.Filter( "Priority", "Contains", sQuery );
        /*var oFilter8=new sap.ui.model.Filter("Requester","Contains",sQuery);*/
        var oFilter9 = new sap.ui.model.Filter(
          "Complexity",
          "Contains",
          sQuery
        );
        var oFilter10 = new sap.ui.model.Filter( "Aging", "Contains", sQuery );
        var oFilter11 = new sap.ui.model.Filter(
          "TicketStatus",
          "Contains",
          sQuery
        );
        var oFilter12 = new sap.ui.model.Filter(
          "DevStatus",
          "Contains",
          sQuery
        );
        var oFilter13 = new sap.ui.model.Filter( "BusnUnit", "Contains", sQuery );
        var aFilters = new sap.ui.model.Filter( [
          oFilter1,
          oFilter2,
          oFilter3,
          oFilter4,
          oFilter5,
          oFilter6,
          oFilter7,
          oFilter9,
          oFilter10,
          oFilter11,
          oFilter12,
          oFilter13,
        ] );
        var oTable = this.getView().byId( "dashboard" );
        var oBinding = oTable.getBinding( "items" );

        oBinding.filter( [aFilters] );

        t.getView()
          .getModel( "oItemLenModel" )
          .setData(
            t.getView().byId( "dashboard" ).getBinding( "items" ).aIndices.length
          );
        t.getView().getModel( "oItemLenModel" ).refresh();
      },

      onPressGo: function () {
        var t = this;
        var oBinding = this.getView().byId( "dashboard" ).getBinding( "items" ),
          oFinalFilter = [],
          aFilterTicketNum = [],
          aDescrip = [],
          aBusUnit = [],
          aFuncConsul = [],
          aTechCons = [],
          aPrio = [],
          aComplex = [],
          aDevep = [],
          // atickSts = [],
          TicKNum = this.byId( "TickNum" ).getSelectedItems(),
          Descrip = this.byId( "Descrip" ).getSelectedItems(),
          // BusUnit = this.byId("BusUnit").getSelectedItems(),
          FuncConst = this.byId( "FuncCons" ).getSelectedItems(),
          TechCons = this.byId( "TechCons" ).getSelectedItems(),
          Prio = this.byId( "Prio" ).getSelectedItems(),
          Complex = this.byId( "Complex" ).getSelectedItems(),
          Devep = this.byId( "DevSts" ).getSelectedItems(),
          tickSts = this.byId( "TicSts" ).getSelectedItems();
        if (
          !TicKNum.length > 0 &&
          !Descrip.length > 0 &&
          // !BusUnit.length > 0 &&
          !FuncConst.length > 0 &&
          !TechCons.length > 0 &&
          !Prio.length > 0 &&
          !Complex.length > 0 &&
          !Devep.length > 0 
          // !tickSts.length > 0
        ) {
          !oBinding.filter( [] );
        } else {
          for ( var i = 0; i < TicKNum.length; i++ ) {
            aFilterTicketNum.push(
              new sap.ui.model.Filter( {
                path: "RICEF_ID",
                operator: FilterOperator.EQ,
                value1: TicKNum[i].getText(),
              } )
            );
          }
          for ( var i = 0; i < Descrip.length; i++ ) {
            aDescrip.push(
              new sap.ui.model.Filter( {
                path: "Description",
                operator: FilterOperator.EQ,
                value1: Descrip[i].getText(),
              } )
            );
          }
          // for (var i = 0; i < BusUnit.length; i++) {
          //   aBusUnit.push(
          //     new sap.ui.model.Filter({
          //       path: "BusnUnit",
          //       operator: FilterOperator.EQ,
          //       value1: BusUnit[i].getText(),
          //     })
          //   );
          // }
          for ( var i = 0; i < FuncConst.length; i++ ) {
            aFuncConsul.push(
              new sap.ui.model.Filter( {
                path: "FuncConst",
                operator: FilterOperator.EQ,
                value1: FuncConst[i].getText(),
              } )
            );
          }
          for ( var i = 0; i < TechCons.length; i++ ) {
            aTechCons.push(
              new sap.ui.model.Filter( {
                path: "TechPs",
                operator: FilterOperator.EQ,
                value1: TechCons[i].getText(),
              } )
            );
          }
          for ( var i = 0; i < Prio.length; i++ ) {
            aPrio.push(
              new sap.ui.model.Filter( {
                path: "Priority",
                operator: FilterOperator.EQ,
                value1: Prio[i].getText(),
              } )
            );
          }
          for ( var i = 0; i < Complex.length; i++ ) {
            aComplex.push(
              new sap.ui.model.Filter( {
                path: "Complexity",
                operator: FilterOperator.EQ,
                value1: Complex[i].getText(),
              } )
            );
          }
          for ( var i = 0; i < Devep.length; i++ ) {
            aDevep.push(
              new sap.ui.model.Filter( {
                path: "DevStatus",
                operator: FilterOperator.EQ,
                value1: Devep[i].getText(),
              } )
            );
          }
          // for ( var i = 0; i < tickSts.length; i++ ) {
          //   atickSts.push(
          //     new sap.ui.model.Filter( {
          //       path: "TicketStatus",
          //       operator: FilterOperator.EQ,
          //       value1: tickSts[i].getText(),
          //     } )
          //   );
          // }

          if ( aFilterTicketNum.length > 0 ) {
            oFinalFilter.push(
              new sap.ui.model.Filter( {
                and: false,
                filters: aFilterTicketNum,
              } )
            );
          }
          if ( aDescrip.length > 0 ) {
            oFinalFilter.push(
              new sap.ui.model.Filter( {
                and: false,
                filters: aDescrip,
              } )
            );
          }
          // if (aBusUnit.length > 0) {
          //   oFinalFilter.push(
          //     new sap.ui.model.Filter({
          //       and: false,
          //       filters: aBusUnit,
          //     })
          //   );
          // }
          if ( aFuncConsul.length > 0 ) {
            oFinalFilter.push(
              new sap.ui.model.Filter( {
                and: false,
                filters: aFuncConsul,
              } )
            );
          }
          if ( aTechCons.length > 0 ) {
            oFinalFilter.push(
              new sap.ui.model.Filter( {
                and: false,
                filters: aTechCons,
              } )
            );
          }
          if ( aPrio.length > 0 ) {
            oFinalFilter.push(
              new sap.ui.model.Filter( {
                and: false,
                filters: aPrio,
              } )
            );
          }
          if ( aComplex.length > 0 ) {
            oFinalFilter.push(
              new sap.ui.model.Filter( {
                and: false,
                filters: aComplex,
              } )
            );
          }
          if ( aDevep.length > 0 ) {
            oFinalFilter.push(
              new sap.ui.model.Filter( {
                and: false,
                filters: aDevep,
              } )
            );
          }
          // if ( atickSts.length > 0 ) {
          //   oFinalFilter.push(
          //     new sap.ui.model.Filter( {
          //       and: false,
          //       filters: atickSts,
          //     } )
          //   );
          // }
          oBinding.filter( oFinalFilter );
          t.getView()
            .getModel( "oItemLenModel" )
            .setData(
              t.getView().byId( "dashboard" ).getBinding( "items" ).aIndices.length
            );
          t.getView().getModel( "oItemLenModel" ).refresh();
        }
      },

      createColumnConfig: function () {
        var aCols = [];

        aCols.push( {
          label: "Ticket Number",
          type: EdmType.Number,
          property: "RICEF_ID",
          scale: 0,
        } );

        aCols.push( {
          label: "Description",
          property: "Description",
          type: EdmType.String,
        } );

        // aCols.push({
        //   label: "Business Unit",
        //   property: "BusnUnit",
        //   type: EdmType.String,
        // });

        aCols.push( {
          label: "Functional Consultant",
          property: "FuncConst",
          type: EdmType.String,
        } );

        aCols.push( {
          label: "Technical Consultant",
          property: "TechPs",
          type: EdmType.String,
        } );

        aCols.push( {
          label: "FS Target Com.Date",
          property: "FsTargetCom",
          type: EdmType.Date,
        } );

        aCols.push( {
          label: "Dev Target Com.Date",
          property: "DevTargetDate",
          type: EdmType.Date,
        } );

        aCols.push( {
          label: "Priority",
          property: "Priority",
          type: EdmType.String,
        } );

        aCols.push( {
          label: "Complexity",
          property: "Complexity",
          type: EdmType.String,
        } );

        aCols.push( {
          label: "Aging",
          property: "Aging",
          type: EdmType.String,
        } );

        aCols.push( {
          label: "Development Status",
          property: "DevStatus",
          type: EdmType.String,
        } );

        aCols.push( {
          label: "Ticket Status",
          property: "TicketStatus",
          type: EdmType.String,
        } );

        return aCols;
      },

      onExcelExport: function () {
        var oTable = this.getView().byId( "dashboard" );
        var oRowBinding = oTable.getBinding( "items" );
        var aCols = this.createColumnConfig();
        var TableData = [];

        if ( oRowBinding ) {
          // If items are bound to the table
          if (
            oRowBinding.getLength() ===
            this.getView().getModel( "datamodel1" ).getData().length
          ) {
            TableData = oTable.getItems();
          } else {
            var aIndices = oRowBinding.getContexts().map( function ( context ) {
              return context.getPath().split( "/" ).pop();
            } );
            TableData = aIndices.map(
              function ( index ) {
                return this.getView()
                  .getModel( "datamodel1" )
                  .getProperty( "/" + index );
              }.bind( this )
            );
          }
        }

        var oSettings = {
          workbook: {
            columns: aCols,
            hierarchyLevel: "Level",
          },
          dataSource: TableData,
          fileName: "TicketExport.xlsx",
          worker: false, // Disable worker because of MockServer usage
        };

        var oSheet = new Spreadsheet( oSettings );
        oSheet.build().finally( function () {
          oSheet.destroy();
        } );
      },
      onQuikView: function ( oEvent ) {
        var that = this;
        var path = oEvent
          .getSource()
          .getBindingInfo( "text" )
          .binding.getContext()
          .getPath();
        path = path.split( "/" );
        path = parseInt( path[1] );
        var ticketNum = this.getView().getModel( "datamodel1" ).getProperty( "/" )[
          path
        ].RICEF_ID;

        ///////////////read aging history for the ticket/////////////////

        var gpfservice = this.getOwnerComponent().getModel();
        var oFilter = new sap.ui.model.Filter( "RICEF_ID", "EQ", ticketNum );       
         gpfservice.read("/HistorySet",{
          filters: [oFilter],
            success: function ( data ) {
              var dashboardAgingLog = new sap.ui.model.json.JSONModel(
                data.results
              );
              that.getView().setModel( dashboardAgingLog, "dashboardAgingLog" );
            },
          }
        );

        var oButton = oEvent.getSource(),
          oView = this.getView();
        if ( !this._pQuickView ) {
          this._pQuickView = Fragment.load( {
            id: oView.getId(),
            name: "ztpr.zticketprocessing.fragments.agingQuikView",
            controller: this,
          } ).then( function ( oQuickView ) {
            oView.addDependent( oQuickView );
            return oQuickView;
          } );
        }
        this._pQuickView.then( function ( oQuickView ) {
          oQuickView.openBy( oButton );
        } );
      },
    } );
  }
);
