sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/FilterOperator",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    Controller,
    Fragment,
    JSONModel,
    FilterOperator,
    Spreadsheet,
    exportLibrary
  ) {
    "use strict";

    var EdmType = exportLibrary.EdmType;
    return Controller.extend( "dashboard1.controller.View1", {
      onInit: function () {
        this.ts; //declare ticket number globally
        this.oModel = this.getOwnerComponent().getModel(); //get oData service

        // var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
        // oRouter
        // .getRoute("RouteView1")
        // .attachPatternMatched(this._onRouteMatched, this);
        this.initialfunc();
      },
      initialfunc: function () {
        debugger;
        var that = this,
          ticketNum = [],
          // BU = [],
          tickSts = [],
          Descrip = [],
          priority = [],
          complexity = [],
          DevSts = [],
          funcConst = [],
          techCons = [];

        that.oModel.read( "/DashboardSet", {
          success: ( oData ) => {
            var dashBoardModel = new JSONModel( oData.results );
            that.getView().setModel( dashBoardModel, "dashBoardModel" );
            that.dashboard = oData.results;
            console.log( dashBoardModel );

            for ( var i = 0; i < oData.results.length; i++ ) {
              tickSts.push( oData.results[i].TicketStatus );
              Descrip.push( oData.results[i].Description );
              ticketNum.push( oData.results[i].RICEF_ID );
            }

            var TickNum_C = that.getView().byId( "TickNum" );
            TickNum_C.mBindingInfos.items.length = ticketNum.length;

            var Descrip_C = that.getView().byId( "Descrip" );
            Descrip_C.mBindingInfos.items.length = Descrip.length;

            var FuncCons_C = that.getView().byId( "FuncCons" );
            FuncCons_C.mBindingInfos.items.length = funcConst.length;

            var TechCons_C = that.getView().byId( "TechCons" );
            TechCons_C.mBindingInfos.items.length = techCons.length;

            var Prio_C = that.getView().byId( "Prio" );
            Prio_C.mBindingInfos.items.length = priority.length;

            var Complex_C = that.getView().byId( "Complex" );
            Complex_C.mBindingInfos.items.length = complexity.length;

            var DevSts_C = that.getView().byId( "DevSts" );
            DevSts_C.mBindingInfos.items.length = DevSts.length;

            var TicSts_C = that.getView().byId( "TicSts" );
            TicSts_C.mBindingInfos.items.length = tickSts.length;
          },
        } );

        that.oModel.read( "/Ticket_f4Set", {
          success: ( oData ) => {
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
            }
            //------------------------------------------------------------
            var ticketNumModel = new JSONModel();
            ticketNumModel.setData( ticketNum );
            that.getView().setModel( ticketNumModel, "ticketNumModel" );

            //-----------------------------------------------------
            var prioModel = new JSONModel();
            prioModel.setData( priority );
            that.getView().setModel( prioModel, "prioModel" );
            var compModel = new JSONModel();
            compModel.setData( complexity );
            that.getView().setModel( compModel, "compModel" );
            var devStsModel = new JSONModel();
            devStsModel.setData( DevSts );
            that.getView().setModel( devStsModel, "devStsModel" );
            var funcConstModel = new JSONModel();
            funcConstModel.setData( funcConst );
            that.getView().setModel( funcConstModel, "funcConstModel" );
            var techConstModel = new JSONModel();
            techConstModel.setData( techCons );
            that.getView().setModel( techConstModel, "techConstModel" );
            tickSts = [...new Set( tickSts )];
            var tickStsModel = new JSONModel();
            tickStsModel.setData( tickSts );
            that.getView().setModel( tickStsModel, "tickStsModel" );
            Descrip = [...new Set( Descrip )];
            var desModel = new JSONModel();
            desModel.setData( Descrip );
            that.getView().setModel( desModel, "desModel" );
          },
        } );

        // that.oModel.read( "/BusinessUnitSet", {

        //   success: function ( oData ) {

        //     var buisnessunit = new sap.ui.model.json.JSONModel();
        //     BU = [...new Map( oData.results.map( ( m ) => [m.ParentField, m] ) ).values()];
        //     buisnessunit.setData( BU );
        //     that.getView().setModel( buisnessunit, "BUModel" );

        //   }
        // } );
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

        // aCols.push( {
        //   label: "Business Unit",
        //   property: "BusnUnit",
        //   type: EdmType.String,
        // } );

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
        var oTable = this.getView().byId( "idtable" );
        var oRowBinding = oTable.getBinding( "rows" );
        var aCols = this.createColumnConfig();
        var TableData = [];
        if ( oRowBinding ) {
          var aContexts = oRowBinding.getContexts();

          if ( oRowBinding.getLength() === aContexts.length ) {

            TableData = aContexts.map( function ( context ) {
              return context.getObject();
            } );
          } else {

            var aIndices = aContexts.map( function ( context ) {
              return context.getIndex();
            } );
            TableData = aIndices.map( function ( index ) {
              return this.getView().getModel( "dashBoardModel" ).getProperty( "/" + index );
            }.bind( this ) );
          }
        }
        var oSettings = {
          workbook: {
            columns: aCols,
            hierarchyLevel: "Level"
          },
          dataSource: TableData,
          fileName: "TicketExport.xlsx",
          worker: false
        };

        var oSheet = new Spreadsheet( oSettings );
        oSheet.build().finally( function () {
          oSheet.destroy();
        } );
      },
      onPressClear: function () {
        this.byId( "TickNum" ).setSelectedItems( "" );
        this.byId( "Descrip" ).setSelectedItems( "" );
        this.byId( "FuncCons" ).setSelectedItems( "" );
        this.byId( "TechCons" ).setSelectedItems( "" );
        this.byId( "Prio" ).setSelectedItems( "" );
        this.byId( "Complex" ).setSelectedItems( "" );
        this.byId( "DevSts" ).setSelectedItems( "" );
        this.byId( "TicSts" ).setSelectedItems( "" );

        var oBinding = this.getView().byId( "idtable" ).getBinding( "rows" );
        !oBinding.filter( [] );
      },
      filterTable: function ( oEvent ) {
        debugger;

        var sQuery = oEvent.getParameter( "value" );
      },

      //   onSelectTicNum: function (oEvent) {
      //     debugger;
      //     var TickNum = this.byId("TickNum").getSelectedItems();
      //     var TickNumData = [];
      //     for (var i = 0; i < TickNum.length; i++) {
      //       TickNumData.push(
      //         this.byId("TickNum").getSelectedItems()[i].mProperties.text
      //       );
      //     }

      //     var tableData = [];
      //     tableData = this.dashboard;
      //     var finalData = [];
      //     for (var i = 0; i < TickNum.length; i++) {
      //       let filterData = tableData.filter((tableData) => {
      //         return tableData.TicketNo === TickNumData[i];
      //       });

      //       finalData.push(filterData[0]);
      //     }
      //     if (finalData.length > 0) {
      //       let Descrip = finalData.map((finalData) => {
      //         return finalData.Description;
      //       });
      //       let desModel = new JSONModel();
      //       desModel.setData(Descrip);
      //       this.getView().setModel(desModel, "desModel");
      //     } else {
      //       let Descrip = this.Descrip;
      //       let desModel = new JSONModel();
      //       desModel.setData(Descrip);
      //       this.getView().setModel(desModel, "desModel");
      //     }

      //  },

      onPressGo: function ( oEvent ) {
        debugger;

        var oBinding = this.getView().byId( "idtable" ).getBinding( "rows" ),
          oFinalFilter = [],
          aFilterTicketNum = [],
          aDescrip = [],
          // aBusUnit = [],
          aFuncConsul = [],
          aTechCons = [],
          aPrio = [],
          aComplex = [],
          aDevep = [],
          atickSts = [],
          TicKNum = this.byId( "TickNum" ).getSelectedItems(),
          Descrip = this.byId( "Descrip" ).getSelectedItems(),
          // BusUnit = this.byId( "BusUnit" ).getSelectedItems(),
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
          !Devep.length > 0 &&
          !tickSts.length > 0
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
          // for ( var i = 0; i < BusUnit.length; i++ ) {
          //   aBusUnit.push(
          //     new sap.ui.model.Filter( {
          //       path: "BusnUnit",
          //       operator: FilterOperator.EQ,
          //       value1: BusUnit[i].getText(),
          //     } )
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
          for ( var i = 0; i < tickSts.length; i++ ) {
            atickSts.push(
              new sap.ui.model.Filter( {
                path: "TicketStatus",
                operator: FilterOperator.EQ,
                value1: tickSts[i].getText(),
              } )
            );
          }

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
          // if ( aBusUnit.length > 0 ) {
          //   oFinalFilter.push(
          //     new sap.ui.model.Filter( {
          //       and: false,
          //       filters: aBusUnit,
          //     } )
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
          if ( atickSts.length > 0 ) {
            oFinalFilter.push(
              new sap.ui.model.Filter( {
                and: false,
                filters: atickSts,
              } )
            );
          }
          //   oFinalFilter = new sap.ui.model.Filter({
          //     //and: false,
          //     filters:

          //   new sap.ui.model.Filter({
          //     and: true,
          //     filters: aFilterTicketNum,
          //   }),
          //   new sap.ui.model.Filter({
          //     and: true,
          //     filters: aDescrip,
          //   }),
          //   new sap.ui.model.Filter({
          //     and: false,
          //     filters: aFuncConsul,
          //   }),
          //   new sap.ui.model.Filter({
          //     and: false,
          //     filters: aTechCons,
          //   }),
          //   new sap.ui.model.Filter({
          //     and: false,
          //     filters: aPrio,
          //   }),
          //   new sap.ui.model.Filter({
          //     and: false,
          //     filters: aComplex,
          //   }),
          //   new sap.ui.model.Filter({
          //     and: false,
          //     filters: aDevep,
          //   }),
          //   new sap.ui.model.Filter({
          //     and: false,
          //     filters: atickSts,
          //   }),
          //     ]
          //   });

          oBinding.filter( oFinalFilter );
        }
      },

      //filtering for whole table//
      onSearch: function ( oEvent ) {
        var sQuery = oEvent.getParameter( "query" );
        if ( oEvent.getId() == "liveChange" ) {
          sQuery = oEvent.getParameter( "newValue" );
        }

        if ( sQuery ) {
          var oFilter1 = new sap.ui.model.Filter(
            "RICEF_ID",
            "Contains",
            sQuery
          );
          var oFilter2 = new sap.ui.model.Filter( "Zreqty", "Contains", sQuery );
          var oFilter3 = new sap.ui.model.Filter(
            "TicketStatus",
            "Contains",
            sQuery
          );
          var oFilter4 = new sap.ui.model.Filter( "TechPs", "Contains", sQuery );
          var oFilter5 = new sap.ui.model.Filter(
            "FuncConst",
            "Contains",
            sQuery
          );
          var oFilter6 = new sap.ui.model.Filter(
            "Complexity",
            "Contains",
            sQuery
          );
          var oFilter7 = new sap.ui.model.Filter(
            "Priority",
            "Contains",
            sQuery
          );
          var oFilter8 = new sap.ui.model.Filter(
            "Description",
            "Contains",
            sQuery
          );
          var oFilter9 = new sap.ui.model.Filter( "Aging", "Contains", sQuery );
          var oFilter10 = new sap.ui.model.Filter( "BusnUnit", "Contains", sQuery );

          var aFilters = new sap.ui.model.Filter( [
            oFilter1,
            oFilter2,
            oFilter3,
            oFilter4,
            oFilter5,
            oFilter6,
            oFilter7,
            oFilter8,
            oFilter9,
            oFilter10
          ] );
        }
        var oTable = this.getView().byId( "idtable" );
        var oBinding = oTable.getBinding( "rows" );

        oBinding.filter( aFilters );
      },

      //formatter for priority column on table returns clr//
      Priority: function ( pr ) {
        switch ( pr ) {
          case "Medium":
            return 1;
          case "Low":
            return 7;
          case "High":
            return 3;
          case "Very High":
            return 2;
        }
      },

      //formatter for complexity column on table returns clr//
      Complexity: function ( com ) {
        switch ( com ) {
          case "Medium":
            return 1;
          case "Simple":
            return 7;
          case "Complex":
            return 3;
        }
      },

      //formatter for ticket sts column on table returns clr//
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

      //whenever select the aging hyperlink//
      onPressAge: function ( oEvent ) {
        var that = this;

        that.ts = oEvent
          .getSource()
          .getBindingContext( "dashBoardModel" )
          .getProperty().RICEF_ID;

        var filter = new sap.ui.model.Filter( {
          path: "RICEF_ID",
          operator: FilterOperator.EQ,
          value1: that.ts,
        } );
        that.oModel.read( "/HistorySet", {
          filters: [filter],
          success: ( oData ) => {
            var dashboardAgingLog = new JSONModel( oData.results );
            that.getView().setModel( dashboardAgingLog, "dashboardAgingLog" );
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

        var oButton = oEvent.getSource(),
          oView = this.getView();
        if ( !this._pQuickView ) {
          this._pQuickView = Fragment.load( {
            id: oView.getId(),
            name: "dashboard1.fragments.agingQuickView",
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

      //this function will trigger whenever we click the navigation button on table row//
      onRowSelect: function ( oEvent ) {
        var oSelect = oEvent
          .getSource()
          .getBindingContext( "dashBoardModel" )
          .getProperty();
        this.getOwnerComponent().getModel( "globalModel" ).dashboard = oSelect;

        var oTcAge = oEvent
          .getSource()
          .getBindingContext( "dashBoardModel" )
          .getProperty().Aging;
        this.getOwnerComponent().getModel( "globalModel" ).ticketage = oTcAge;

        var router = this.getOwnerComponent().getRouter();
        router.navTo( "RouteView2" );
      },
      // handleSelectionChange:(oEvent)=>{
      //       debugger;
      //       oEvent.getParameter('listItem').getBindingContext().getObject().TicketNo;
      // }
    } );
  }
);

