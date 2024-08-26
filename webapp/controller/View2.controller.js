sap.ui.define( [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function ( Controller, MessageBox, JSONModel, FilterOperator ) {
        "use strict";

        return Controller.extend( "dashboard1.controller.View2", {
            onInit: function () {

                this.ts;
                this.oModel = this.getOwnerComponent().getModel();
                var oRouter = new sap.ui.core.UIComponent.getRouterFor( this );
                oRouter.getRoute( "RouteView2" ).attachPatternMatched( this._onRouteMatched, this );

            },

            _onRouteMatched: function () {

                var globalModelData = this.getOwnerComponent().getModel( "globalModel" );
                var globalModel = new JSONModel( globalModelData );
                this.getView().setModel( globalModel, "ageModel" );

                var dashDetail = this.getOwnerComponent().getModel( "globalModel" ).dashboard;
                var oModelDashDetail = new JSONModel( dashDetail );
                this.getView().setModel( oModelDashDetail, "oModelDashDetail" );

                this.getView().byId( "idIconTabBar" ).setSelectedKey( "Details" );

                var m = [];
                var fileattchmodel = new JSONModel();
                fileattchmodel.setData( m );
                this.getView().setModel( fileattchmodel, "dashboard" );

                this._Fileset();
                this._historyLog();



            },

            //for reading files//
            _Fileset: function () {

                var that = this;
                that.ts = that.getOwnerComponent().getModel( "globalModel" ).dashboard.RICEF_ID;
                var filter = new sap.ui.model.Filter( {
                    path: "RICEF_ID",
                    operator: FilterOperator.EQ,
                    value1: that.ts
                } );
                that.oModel.read( "/Fileset", {
                    filters: [filter],
                    success: ( odata ) => {
                        for ( var i = 0; i < odata.results.length; i++ ) {
                            // delete odata.results[i].__metadata;


                            // var frmt = sap.ui.core.format.DateFormat.getDateInstance( { pattern: "yyyy/MM/dd" } );
                            // odata.results[i].Datestamp = frmt.format( new Date( odata.results[i].Datestamp ) );
                            // odata.results[i].Datestamp = new Date( odata.results[i].Datestamp );
                            // odata.results[i].Datestamp = new Date( odata.results[i].Datestamp.setHours( "00", "00", "00" ) );
                            // odata.results[i].Datestamp = new Date( odata.results[i].Datestamp.getTime() + odata.results[i].Datestamp.getTimezoneOffset() * ( -60000 ) );
                            // odata.results[i].Datestamp = odata.results[i].Datestamp;



                        }

                        that.getView().getModel( "dashboard" ).setProperty( "/UploadedAttachment", odata.results );
                    },
                    error: function ( error ) {
                        sap.ui.core.BusyIndicator.hide();
                        var message = error;
                        var msg = $( error.response.body ).find( 'message' ).first().text();
                        var action = "OK";
                        new sap.m.MessageBox.error( msg, {

                            onClose: function () {
                                if ( action === "OK" ) {

                                }
                            }
                        } );
                    }

                } );
            },

            //for reading ticket historylogs//
            _historyLog: function () {

                var that = this;
                that.ts = that.getOwnerComponent().getModel( "globalModel" ).dashboard.RICEF_ID;
                var filter = new sap.ui.model.Filter( {
                    path: "RICEF_ID",
                    operator: FilterOperator.EQ,
                    value1: that.ts
                } );

                that.oModel.read( "/Ticket_logSet", {
                    filters: [filter],
                    success: function ( oData ) {

                        for ( var i = 0; i < oData.results.length; i++ ) {

                            delete oData.__metadata;

                            // var Hours = oData.results[i].TimeTc.slice(2, 5)

                            // var Min = oData.results[i].TimeTc.slice(5, 8)

                            // var Sec = oData.results[i].TimeTc.slice(8, 11)

                            // var otp = Hours.concat(":", Min, ":", Sec);
                            // oData.results[i].TimeTc = otp;


                            // var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance( { pattern: "HH:mm:ss" } );
                            // var TZOffsetMs = new Date( 0 ).getTimezoneOffset() * 60 * 1000;
                            // var timeStr = timeFormat.format( new Date( oData.results[i].TimeTc.ms + TZOffsetMs ) );
                            // oData.results[i].TimeTc = timeStr;

                            // var frmt = sap.ui.core.format.DateFormat.getDateInstance( { pattern: "yyyy/MM/dd" } );
                            // var d = frmt.format( new Date( oData.results[i].DateTc ) );
                            // oData.results[i].DateTc = d;
                            var timeString = oData.results[i].TimeTc;
                            var Hours = timeString.slice( 0, 2 );
                            var Min = timeString.slice( 2, 4 );
                            var Sec = timeString.slice( 4, 6 );
                            var otp = Hours + ":" + Min + ":" + Sec;
                            oData.results[i].TimeTc = otp;



                        }

                        var historylog = new JSONModel( oData.results );
                        that.getView().setModel( historylog, "historylog" );

                    },
                    error: function ( error ) {
                        sap.ui.core.BusyIndicator.hide();
                        var message = error;
                        var msg = $( error.response.body ).find( 'message' ).first().text();
                        var action = "OK";
                        new sap.m.MessageBox.error( msg, {

                            onClose: function () {
                                if ( action === "OK" ) {

                                }
                            }
                        } );
                    }
                } );
                var oFilter1 = new sap.ui.model.Filter( "RICEF_ID", "EQ", that.ts );
                that.oModel.read("/DefectLogs",{
                     filters:[oFilter1],
                    success:function(odata){
                       
                        var DefectLog = new sap.ui.model.json.JSONModel(odata.results);
                       
                        that.getView().setModel( DefectLog, "DefectLog" );


                    },
                    error:function(error){
                        sap.ui.core.BusyIndicator.hide();
                        var message = error;
                        var msg = $( error.response.body ).find( 'message' ).first().text();
                        var action = "OK";
                        new sap.m.MessageBox.error( msg, {

                            onClose: function () {
                                if ( action === "OK" ) {

                                }
                            }
                        } );

                    }
                })



            },

            actionBy: function ( actionby ) {

                var functionalConsult = this.getView().getModel( "oModelDashDetail" ).getData().FunctId;
                var techConsult = this.getView().getModel( "oModelDashDetail" ).getData().TechId;
                var utConsult = this.getView().getModel( "oModelDashDetail" ).getData().UtId;
                var uatConsult = this.getView().getModel( "oModelDashDetail" ).getData().UatId;

                if ( actionby === functionalConsult ) {
                    return 1;
                }
                else if ( actionby === techConsult ) {
                    return 8;
                }
                else if ( actionby === utConsult ) {
                    return 3;
                }
                else if ( actionby === uatConsult ) {
                    return 4;
                } else {
                    return 5;
                }
            },

            //onpress of download button on files table
            onFiledataDownload: function ( oEvent ) {

                var path = parseInt( oEvent.getSource().getBindingContext( "dashboard" ).getPath().slice( 20 ) );
                var filecontent = this.getView().byId( "files" ).getModel( "dashboard" ).getData().UploadedAttachment[path].Value;

                var decode = atob( filecontent );
                var filedownload = JSON.parse( decode );
                var filedata = filedownload.Value;

                var fileType = this.getView().byId( "files" ).getModel( "dashboard" ).getData().UploadedAttachment[path].Filename;

                var ftype = fileType.split( '.' ).pop();
                const downloadlink = document.createElement( "a" );
                const filename = fileType;
                downloadlink.href = filedata;
                downloadlink.download = filename;
                downloadlink.click();
            },

            onNavBckPress: function () {
                var router = this.getOwnerComponent().getRouter();
                router.navTo( "RouteView1" );
            }

        } );
    } );
