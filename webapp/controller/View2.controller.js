sap.ui.define( [

    "ztpr/zticketprocessing/controller/BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof
     *            sap.ui.core.mvc.Controller} Controller
     */
    function ( Controller, MessageBox ) {
        "use strict";

        return Controller.extend( "ztpr.zticketprocessing.controller.View2", {
            onInit: function () {
                ;

                var appView = new sap.ui.model.json.JSONModel( {
                    "visible": false
                } );
                this.getView().setModel( appView, "appView" );
                var model = this.getOwnerComponent().getModel( "globalModel" );
                var globalModel = new sap.ui.model.json.JSONModel( model );
                this.getView().setModel( globalModel, "globalModel" );
                this._setCurrentDateTime();

                // getting route to view1//
                var oRouter = new sap.ui.core.UIComponent.getRouterFor( this );
                oRouter.getRoute( "RouteView2" ).attachPatternMatched( this.onObjectMatched, this );

                // global model used all the scenarios//
                var odata = [];
                var dashboard = new sap.ui.model.json.JSONModel();
                dashboard.setData( odata );
                this.getView().setModel( dashboard, "datamodel2" );

                //to get useId implemented on 07/16/24

                if ( sap.ushell && sap.ushell.Container ) {
                    var userInfoService = sap.ushell.Container.getService( "UserInfo" );
                    if ( userInfoService ) {
                        this.currUser = userInfoService.getUser().getFullName().toUpperCase();
                        this.currUserId = userInfoService.getUser().getId().toUpperCase();
                    } else {
                        console.error( "UserInfo service is not available." );
                    }
                } else {
                    console.error( "sap.ushell.Container is not available" );
                }



                this.ts;                            // ts global variable used
                // for RICEF_ID fetching from
                // view1 to view2

                this.Dflag = "N"                     // using flag value for Date
                // rqdate during enable or
                // editable //
                this.DflagF = "N"                     // using flag value for
                // Fsdate during enable or
                this.ifMissMatch = "";								// editable//
                this.hl;                         // this gobal variable
                // refers to historylog
                // table//

                this.frg;                            // fragment users//
                this.Act;                             // /save,submit...fragments//
                this.Att;
                this.UploadedAttachment = [];// this array using for Attachments
                // upload//
                this.UploadedAttachmentindex = [];

            },
            _setCurrentDateTime: function () {
                var oDate = new Date();


                var formatDate = function ( date ) {
                    var date = new Date( date ).toISOString();
                    date = date.split( '-' );
                    date = date[0] + date[1] + date[2];
                    date = date.split( 'T' );
                    date = date[0];
                    return date;
                };


                var formatTime = function ( date ) {
                    var hours = date.getHours().toString().padStart( 2, '0' );
                    var minutes = date.getMinutes().toString().padStart( 2, '0' );
                    var seconds = date.getSeconds().toString().padStart( 2, '0' );
                    return hours + minutes + seconds;
                };

                var formattedDate = formatDate( oDate );
                var formattedTime = formatTime( oDate );

                var oModel = new sap.ui.model.json.JSONModel( {
                    TcCreate: formattedDate,
                    TcTime: formattedTime
                } );

                this.getView().setModel( oModel, "dateTimeModel" );
            },
            onObjectMatched: function ( evt ) {

                var model = this.getOwnerComponent().getModel( "globalModel" );
                var globalModel = new sap.ui.model.json.JSONModel( model );
                this.getView().setModel( globalModel, "globalModel" );

                var gpfservice = this.getOwnerComponent().getModel();




                this.getView().byId( "idIconTabBar" ).setSelectedKey( "Details" );
                // set
                // Details
                // icontab
                // filterbar
                // as
                // default
                // selected
                this.UploadedAttachment.splice( 0, this.UploadedAttachment.length );   // clear
                // the
                // uploaded
                // file
                // on
                // uploadattachment
                // array
                // locally
                var m = [];
                var fileattchmodel = new sap.ui.model.json.JSONModel();                  // this
                // model
                // is
                // used
                // for
                // attachments
                // with
                // property
                fileattchmodel.setData( m );
                this.getView().setModel( fileattchmodel, "dashboard" );
                var Module = [];  // using array stores module data
                var Dev = [];     // stores development status data
                var us = [];      // store users data like
                var fuu = [];
                var teu = [];					// functional,requstor, technical
                var utu = [];
                var uau = [];// etc
                var region = [];  // stores buiusness unit
                var priority = [];
                var complexity = [];
                var DevSts = [];
                var Filetype = [];
                var tickttype = [];
                var sysdetail = [];
                var defectSts = [];
                /* var sysdetail=[];*/


                // var gpfservice = this.getOwnerComponent().getModel();
                var t = this;
                gpfservice.read( "/Ticket_f4Set", {         // read all
                    // the F4
                    // values in
                    // the
                    // screen

                    success: function ( odata ) {


                        for ( var i = 0; i < odata.results.length; i++ ) {
                            delete odata.results[i].__metadata;
                            if ( odata.results[i].Field === "A" ) {              // Based
                                // on
                                // the
                                // parameters
                                // stores
                                // the
                                // data
                                // in
                                // to
                                // model

                                Module.push( odata.results[i] );
                            }

                            else if ( odata.results[i].Field === "B" ) {
                                Dev.push( odata.results[i] );
                            }
                            else if ( odata.results[i].Field === "DL" ) {
                                defectSts.push( odata.results[i] );
                            }

                            else if ( odata.results[i].Field === "FUU" ) {
                                fuu.push( odata.results[i] );
                            }
                            else if ( odata.results[i].Field === "TEU" ) {
                                teu.push( odata.results[i] );
                            }
                            else if ( odata.results[i].Field === "UTU" ) {
                                utu.push( odata.results[i] );
                            }
                            else if ( odata.results[i].Field === "UAU" ) {
                                uau.push( odata.results[i] );
                            }

                            else if ( odata.results[i].Field === "C" ) {
                                priority.push( odata.results[i] );
                            }
                            else if ( odata.results[i].Field === "D" ) {
                                complexity.push( odata.results[i] );
                            }
                            else if ( odata.results[i].Field === "DS" ) {
                                DevSts.push( odata.results[i] );
                            }
                            else if ( odata.results[i].Field === "FT" ) {
                                Filetype.push( odata.results[i] );
                            }
                            else if ( odata.results[i].Field === "TT" ) {
                                tickttype.push( odata.results[i] );
                            }
                            else if ( odata.results[i].Field === "R" ) {
                                region.push( odata.results[i] );

                            }
                            else if ( odata.results[i].Field === "SD" ) {
                                sysdetail.push( odata.results[i] );

                            }

                        }

                        var dashboard = new sap.ui.model.json.JSONModel();
                        dashboard.setData( Module );
                        t.getView().setModel( dashboard, "modulemodel" );

                        var fuctUserModel = new sap.ui.model.json.JSONModel();
                        fuctUserModel.setData( fuu );
                        t.getView().setModel( fuctUserModel, "fuctUserModel" );

                        var techUserModel = new sap.ui.model.json.JSONModel();
                        techUserModel.setData( teu );
                        t.getView().setModel( techUserModel, "techUserModel" );

                        var utUserModel = new sap.ui.model.json.JSONModel();
                        utUserModel.setData( utu );
                        t.getView().setModel( utUserModel, "utUserModel" );

                        var uatUserModel = new sap.ui.model.json.JSONModel();
                        uatUserModel.setData( uau );
                        t.getView().setModel( uatUserModel, "uatUserModel" );

                        var regionModel = new sap.ui.model.json.JSONModel();
                        regionModel.setData( region );
                        t.getView().setModel( regionModel, "regionModel" );

                        var sysDetailModel = new sap.ui.model.json.JSONModel();
                        sysDetailModel.setData( sysdetail );
                        t.getView().setModel( sysDetailModel, "sysDetailModel" );




                        var devtype = new sap.ui.model.json.JSONModel();
                        devtype.setData( Dev );
                        t.getView().setModel( devtype, "devtypemodel" );


                        var user = new sap.ui.model.json.JSONModel();
                        user.setSizeLimit( "100000" );
                        user.setData( us );
                        t.getView().setModel( user, "usermodel" );

                        var priority1 = new sap.ui.model.json.JSONModel();
                        priority1.setData( priority );
                        t.getView().setModel( priority1, "prioritymodel" );

                        var complex = new sap.ui.model.json.JSONModel();
                        complex.setData( complexity );
                        t.getView().setModel( complex, "complexmodel" );
                        ;
                        var devstatusmodel = new sap.ui.model.json.JSONModel();
                        devstatusmodel.setData( DevSts );
                        t.getView().setModel( devstatusmodel, "devstatusmodel" );
                        ;

                        var FTmodel = new sap.ui.model.json.JSONModel();
                        FTmodel.setData( Filetype );
                        t.getView().setModel( FTmodel, "FTmodel" );

                        var benifitmodel = new sap.ui.model.json.JSONModel();
                        benifitmodel.setData( tickttype );
                        t.getView().setModel( benifitmodel, "tickettyep" );

                        var defectStsModel = new sap.ui.model.json.JSONModel();
                        defectStsModel.setData( defectSts );
                        t.getView().setModel( defectStsModel, "defectStsModel" );


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


                // gpfservice.read( "/BusinessUnitSet", {

                //     success: function ( oData ) {
                //         model.BUData = oData.results;
                //         var BU = [];
                //         var buisnessunit = new sap.ui.model.json.JSONModel();
                //         BU = [...new Map( oData.results.map( ( m ) => [m.ParentField, m] ) ).values()];
                //         buisnessunit.setData( BU );
                //         t.getView().setModel( buisnessunit, "BUModel" );

                //     }
                // } );




                this.ts = evt.getParameter( "arguments" ).tn;     // RICEF_ID getting
                // from view2
                this.hl = evt.getParameter( "arguments" ).tn;      // variable used
                // for ticket
                // log

                this.flag = evt.getParameter( "arguments" ).flag;  // this is used
                // for copy with
                // reference
                // data


                if ( this.flag === "Z" ) {                  // when user clicks copy




                    this.referencedata( this.ts );


                }
                else if ( this.flag === "C" ) {
                    this.createdetails( this.ts );
                }
                else {
                    this.getdetails();
                }
            },


            // ********************Reference (Copy with
            // reference)************************************

            referencedata( ts ) {
                this.ts = "0000000000";

                this.getView().getModel( "appView" ).getData().visible = false;
                this.getView().getModel( "appView" ).refresh( true );
                // ts=ts.slice(1);
                ts = 'Z' + ts;              // from ui end we are passing Z with
                // requst no to identify copy with
                // reference ticket


                var gpfservice = this.getOwnerComponent().getModel();
                var t = this;
                gpfservice.read( "/Ticket_DetailsSet('" + ts + "')", {
                    success: function ( odata ) {
                        delete odata.__metadata;
                        if ( !odata.DevStatus || odata.DevStatus === "" ) {
                            odata.DevStatus = "Yet To Start";
                        }
                        if ( !odata.SysDetails || odata.SysDetails === "" ) {
                            odata.SysDetails = "DV1"
                        }

                        if ( !odata.FsTcCre || odata.FsTcCre === null ) {
                            odata.FsTcCre = new Date();
                            odata.FsTcCre = new Date( odata.FsTcCre );
                        }
                        if ( !odata.UtTester || odata.UtTester === "" ) {
                            odata.UtTester = "CHARAN NAIDU";
                        }


                        // odata.FsReceDate = new Date( odata.FsReceDate );
                        // if ( odata.FsTargetCom !== null ) {
                        //     odata.FsTargetCom = new Date( odata.FsTargetCom );
                        // }
                        // if ( odata.FsTcCre !== null ) {
                        //     odata.FsTcCre = new Date( odata.FsTcCre );
                        // }
                        // odata.CrDate = new Date( odata.CrDate );

                        // var Hours = odata.CrTime.slice( 0, 2 )

                        // var Min = odata.CrTime.slice( 2, 4 )

                        // var Sec = odata.CrTime.slice( 4, 6 )
                        // var otp = Hours.concat( ":", Min, ":", Sec );
                        // odata.CrTime = otp;

                        var dashboard = new sap.ui.model.json.JSONModel();
                        dashboard.setData( odata );
                        t.getView().setModel( dashboard, "datamodel2" );
                        console.log( dashboard );
                        var oSelect = t.getView().byId( "devsts" );
                        oSelect.setSelectedKey( odata.DevStatus );

                        var oSelect1 = t.getView().byId( "sysdel" );
                        oSelect1.setSelectedKey( odata.SysDetails );

                        var oSelect2 = t.getView().byId( "idUtby" );
                        oSelect2.setSelectedKey( odata.UtTester );



                        t.getView().byId( "historyTab" ).setVisible( false );
                        t.getView().byId( "DefectTab" ).setVisible( false );
                        t.getView().byId( "idUAt" ).setVisible( false );
                        t.getView().byId( "UATEmail" ).setVisible( false );
                        t.getView().byId( "dependentCR" ).setVisible( false );


                        // var selectedKey = t.getView().getModel( "datamodel2" ).getData().BusnUnit;
                        // var BU = [];
                        // BU = t.getOwnerComponent().getModel( "globalModel" ).BUData;
                        // BU = BU.filter( ( BU ) => {
                        //     return BU.PaFldDisc === selectedKey;
                        // } );



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
                this.hl = ts;
                this.onFilterSelect();

                var cal2 = this.getView().byId( "fsdate" );
                cal2.addDelegate( {
                    onAfterRendering: function () {
                        cal2.$().find( 'INPUT' ).attr( 'disabled', true ).css( 'color', '#000000' );
                    }
                }, cal2 );
            },



            createdetails: function ( ts ) {

                debugger

                // this
                // funnction is
                // triggered for
                // get employee
                // details with
                // respected
                // RICEF_ID

                this.getView().getModel( "appView" ).getData().visible = true;
                this.getView().getModel( "appView" ).refresh( true );

                // var gpfservice = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZTICKET_TOOL_SRV/");
                var gpfservice = this.getOwnerComponent().getModel();
                var t = this;
                var oFilter = new sap.ui.model.Filter( "RICEF_ID", "EQ", ts );
                gpfservice.read( "/Fileset", {
                    filters: [oFilter],  // this
                    // service
                    // Read
                    // all
                    // the
                    // files
                    success: function ( odata ) {


                        for ( var i = 0; i < odata.results.length; i++ ) {
                            delete odata.results[i].__metadata;


                            // var frmt = sap.ui.core.format.DateFormat.getDateInstance( { pattern: "yyyy/MM/dd" } );
                            // odata.results[i].Datestamp = frmt.format( new Date( odata.results[i].Datestamp ) );
                            // odata.results[i].Datestamp = new Date( odata.results[i].Datestamp );
                            // odata.results[i].Datestamp = new Date( odata.results[i].Datestamp.setHours( "00", "00", "00" ) );
                            // odata.results[i].Datestamp = new Date( odata.results[i].Datestamp.getTime() + odata.results[i].Datestamp.getTimezoneOffset() * ( -60000 ) );
                            // odata.results[i].Datestamp = odata.results[i].Datestamp;



                        }

                        t.getView().getModel( "dashboard" ).setProperty( "/UploadedAttachment", odata.results );
                        t.getView().byId( "historyTab" ).setVisible( true );
                        t.getView().byId( "DefectTab" ).setVisible( true );
                        t.getView().byId( "idUAt" ).setVisible( true );
                        t.getView().byId( "UATEmail" ).setVisible( true );


                    },
                    error: function ( error ) {
                        sap.ui.core.BusyIndicator.hide();
                        var message = error;


                        var msg = $( error.response.body ).find( 'message' ).first().text();


                        new sap.m.MessageBox.error( msg, {
                            onClose: function () {

                            }
                        } );
                    }

                } );



                // *********************Read all the Ticket Data**************

                gpfservice.read( "/Ticket_DetailsSet('" + ts + "')", {           // This
                    // service
                    // read
                    // all
                    // the
                    // data
                    success: function ( odata, oResponse ) {
                        // //;
                        ;
                        // delete odata.__metadata;

                        /*odata.ReqDate=new Date(odata.ReqDate);*/
                        // odata.FsReceDate = new Date( odata.FsReceDate );
                        // if ( odata.FsTargetCom !== null ) {
                        //     odata.FsTargetCom = new Date( odata.FsTargetCom );
                        // }

                        // if ( odata.FsTcCre !== null ) {
                        //     odata.FsTcCre = new Date( odata.FsTcCre );
                        // }

                        // odata.DevTargetDate = new Date( odata.DevTargetDate );
                        // odata.CrDate = new Date( odata.CrDate );


                        // t.ifMissMatch = oResponse.headers.etag;

                        // t.functionalConsult = odata.FunctId;
                        // t.techConsult = odata.TechId;
                        // t.utConsult = odata.UtId;
                        // t.uatConsult = odata.UatId;

                        // var Hours = odata.CrTime.slice( 0, 2 )

                        // var Min = odata.CrTime.slice( 2, 4 )

                        // var Sec = odata.CrTime.slice( 4, 6 )



                        // var otp = Hours.concat( ":", Min, ":", Sec );
                        // odata.CrTime = otp;

                        var dashboard = new sap.ui.model.json.JSONModel();
                        dashboard.setData( odata );
                        console.log( dashboard );
                        t.getView().setModel( dashboard, "datamodel2" );

                        // var selectedKey = t.getView().getModel( "datamodel2" ).getData().BusnUnit;
                        // var BU = [];
                        // BU = t.getOwnerComponent().getModel( "globalModel" ).BUData;
                        // BU = BU.filter( ( BU ) => {
                        //     return BU.PaFldDisc === selectedKey;
                        // } );


                        // var sysDetailModel = new sap.ui.model.json.JSONModel();
                        // sysDetailModel.setData( BU );
                        // t.getView().setModel( sysDetailModel, "sysDetailModel" );

                    },
                    error: function ( error ) {
                        f
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

                var cal2 = this.getView().byId( "fsdate" );
                cal2.addDelegate( {
                    onAfterRendering: function () {
                        cal2.$().find( 'INPUT' ).attr( 'disabled', true ).css( 'color', '#000000' );
                    }
                }, cal2 );


            },
            // Get_BenifitType: function ( oEvent ) {
            //     var sSelectedKey = oEvent.getSource().getSelectedKey();
            //     var oView = this.getView();
            //     var showValue = ( sSelectedKey === 'PROJECT' );
            //     oView.byId( "projId" ).setVisible( showValue );
            //     oView.byId( "projectInputId" ).setVisible( showValue );


            // },
            // onRICEFTypeChange: function ( oEvent ) {
            //     var sSelectedKey = oEvent.getSource().getSelectedKey();
            //     var oView = this.getView();


            //     var showOthers = ( sSelectedKey === 'OTHERS' );
            //     oView.byId( "otherRicefLabel" ).setVisible( showOthers );
            //     oView.byId( "otherRicefInput" ).setVisible( showOthers );
            // },


            // onRicefStatusChange: function(oEvent) {
            //     var oSelect = this.byId("devsts");
            //     var sSelectedKey = oSelect.getSelectedKey(); 
            //     var oLabel = this.byId("ricefLabel"); 

            //     if (sSelectedKey === "FT in progress") {
            //         oLabel.setText("Defect Create"); 
            //     } else {
            //         oLabel.setText("RICEF Status"); 
            //     }
            // },

            //changes by vasuda
            onRicefStatusChange: function ( oEvent ) {
                var sSelectedKey = oEvent.getSource().getSelectedKey();
                var oButton = this.getView().byId( "queryButton" );
                if ( sSelectedKey === "FT in Progress" ) {
                    oButton.setText( "Create Defect" );
                } else {
                    oButton.setText( "Query" );
                }
            },

            onDateChange: function () {
                var oView = this.getView();
                var sStartDate = oView.byId( "actualstartdate" ).getDateValue();
                var sEndDate = oView.byId( "actualenddate" ).getDateValue();
                if ( sStartDate && sEndDate ) {
                    var dayDiff = Math.ceil( ( sEndDate - sStartDate ) / ( 1000 * 3600 * 24 ) );
                    oView.byId( "mdEfforts" ).setValue( dayDiff );
                }
            },
            onSavePress: function () {
                var t = this;
                // var defectCnt = sap.ui.getCore().byId( "id1" ).getValue();
                var ricef = sap.ui.getCore().byId( "defectID" ).getValue();
                var defect = sap.ui.getCore().byId( "defect" ).getValue();
                var des = sap.ui.getCore().byId( "des" ).getValue();
                var dev = sap.ui.getCore().byId( "dev" ).getSelectedKey();
                var startDate = sap.ui.getCore().byId( "startDate" ).getValue();
                var endDate = sap.ui.getCore().byId( "endDate" ).getValue();
                var remarks = sap.ui.getCore().byId( "remarks" ).getValue();

                var payload = {
                    // DEFECT_NO: defectCnt,
                    RICEF_ID: ricef,
                    DEFECT: defect,
                    DESCRIPTION: des,
                    STATUS: dev,
                    START_DATE: startDate,
                    END_DATE: endDate,
                    REMARKS: remarks

                };

                var gpfservice = this.getOwnerComponent().getModel();
                gpfservice.create( "/DefectLogs", payload, {
                    success: function ( odata ) {
                        sap.m.MessageToast.show( "saved successfully" );
                        if ( t.fragment ) {
                            t.fragment.close();
                        }
                        t._clearInputFields();


                    },
                    error: function ( error ) {
                        sap.ui.core.BusyIndicator.hide();
                        var message = error;
                        var msg = JSON.parse( error.responseText ).error.message.value;
                        var action = "OK";
                        new sap.m.MessageBox.error( msg, {

                            onClose: function () {
                                if ( action === "OK" ) {

                                }
                            }
                        } );
                    }
                } );
                var 

            },



            // onSavePress: function ( oEvent ) {
            //     var t = this;


            //     var ricef = sap.ui.getCore().byId( "defectID" ).getValue();
            //     var defect = sap.ui.getCore().byId( "defect" ).getValue();
            //     var des = sap.ui.getCore().byId( "des" ).getValue();
            //     var dev = sap.ui.getCore().byId( "dev" ).getSelectedKey();
            //     var startDate = sap.ui.getCore().byId( "startDate" ).getValue();
            //     var endDate = sap.ui.getCore().byId( "endDate" ).getValue();
            //     var remarks = sap.ui.getCore().byId( "remarks" ).getValue();

            //     var payload = {
            //         RICEF_ID: ricef,
            //         DEFECT: defect,
            //         DESCRIPTION: des,
            //         STATUS: dev,
            //         START_DATE: startDate,
            //         END_DATE: endDate,
            //         REMARKS: remarks
            //     };
            //     var gpfservice = this.getOwnerComponent().getModel();
            //     if ( this._isNewEntry ) {

            //         gpfservice.create( "/DefectLogs", payload, {
            //             success: function ( odata ) {
            //                 sap.m.MessageToast.show( "Created successfully" );


            //                 t._clearInputFields();

            //                 if ( t.fragment ) {
            //                     t.fragment.close();
            //                 }



            //             },
            //             error: function ( error ) {
            //                 sap.ui.core.BusyIndicator.hide();
            //                 var msg = JSON.parse( error.responseText ).error.message.value;
            //                 sap.m.MessageBox.error( msg );
            //             }
            //         } );
            //     } else {

            //         var oDialog = this._oEditDialog;
            //         var oContext = oDialog.getBindingContext("DefectLog");
            //         var sPath = oContext.getPath();
            //         var oModel = this.getView().getModel("DefectLog");


            //         var oUpdatedData = {
            //             RICEF_ID: sap.ui.getCore().byId("defectID").getValue(),
            //             DEFECT: sap.ui.getCore().byId("defect").getValue()

            //         };

            //         gpfservice.update(sPath, oUpdatedData, {
            //             success: function () {
            //                 sap.m.MessageToast.show("Record updated successfully");
            //                 oDialog.close();
            //                 oModel.refresh(); 
            //             },
            //             error: function (error) {
            //                 sap.ui.core.BusyIndicator.hide();
            //                 var msg = JSON.parse(error.responseText).error.message.value;
            //                 sap.m.MessageBox.error(msg);
            //             }
            //         });
            //     }
            // },

            _clearInputFields: function () {
                var t = this;


                sap.ui.getCore().byId( "defectID" ).setValue( "" );
                sap.ui.getCore().byId( "defect" ).setValue( "" );

                sap.ui.getCore().byId( "des" ).setValue( "" );
                sap.ui.getCore().byId( "dev" ).setValue( "" );
                sap.ui.getCore().byId( "startDate" ).setValue( "" );
                sap.ui.getCore().byId( "endDate" ).setValue( "" );
                sap.ui.getCore()
            },


            onCancel: function () {
                var oDialog = sap.ui.getCore().byId( "myDialog" );
                if ( !oDialog || oDialog ) {
                    oDialog.close();
                }
            },
            _getDefectDialog: function () {
                if ( !this._defectDialog ) {
                    this._defectDialog = sap.ui.xmlfragment( "ztpr.zticketprocessing.fragments.defectCreate", this );
                    this.getView().addDependent( this._defectDialog );
                }
                return this._defectDialog;
            },


            //changes by vasuda
            onDefectRow: function ( oEvent ) {
                var oSelectedItem = oEvent.getSource();
                var oBindingContext = oSelectedItem.getBindingContext( "DefectLog" );

                var defectDialog = this._getDefectDialog();
                defectDialog.bindElement( {
                    path: oBindingContext.getPath(),
                    model: "DefectLog"
                } );

                defectDialog.open();
            },


            // onDefectRow: function ( oEvent ) {
            //     var oSelectedItem = oEvent.getSource();
            //     var oBindingContext = oSelectedItem.getBindingContext( "DefectLog" );

            //     var defectDialog = this._getDefectDialog();


            //     defectDialog.bindElement( {
            //         path: oBindingContext.getPath(),
            //         model: "DefectLog"
            //     } );


            //     this._isNewEntry = false;

            //     defectDialog.open();
            // },






            // ***************************At the Create Time this service should
            // be triggered///////////
            getdetails: function () {
                // //;
                this.ts = "0000000000";   // Initially we are passing RICEF_ID as
                // "000000"
                var b = [];
                var c = {};
                b.push( c );

                this.getView().getModel( "appView" ).getData().visible = false;
                this.getView().getModel( "appView" ).refresh( true );

                //  var gpfservice = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZTICKET_TOOL_SRV/");
                var gpfservice = this.getOwnerComponent().getModel();
                var t = this;
                gpfservice.read( "/Ticket_DetailsSet('0000000000')", {
                    success: function ( odata ) {

                        ;
                        // delete odata.__metadata;
                        /*odata.ReqDate=new Date(odata.ReqDate);*/
                        // odata.FsReceDate = new Date( odata.FsReceDate );
                        // odata.FsTcCre = new Date( odata.FsTcCre );


                        var dashboard = new sap.ui.model.json.JSONModel();
                        dashboard.setData( odata );
                        t.getView().setModel( dashboard, "datamodel2" );
                        console.log( dashboard );
                        sap.ui.core.BusyIndicator.hide();
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


                // ***************Read the Ticket Log
                // set********************************

                gpfservice.read( "/Ticket_logSet?$filter=RICEF_ID eq ('0000000000')", {

                    success: function ( odata ) {
                        ;

                        for ( var i = 0; i < odata.results.length; i++ ) {

                            delete odata.__metadata;

                            /*
                             * var
                             * Hours=odata.results[i].TimeTc.slice(3,5)
                             */
                            var Hours = odata.results[i].TimeTc.slice( 2, 5 )

                            var Min = odata.results[i].TimeTc.slice( 5, 8 )

                            var Sec = odata.results[i].TimeTc.slice( 8, 11 )

                            var otp = Hours.concat( ":", Min, ":", Sec );
                            odata.results[i].TimeTc = otp;

                            var frmt = sap.ui.core.format.DateFormat.getDateInstance( { pattern: "yyyy/mm/dd" } );
                            var d = frmt.format( new Date( odata.results[i].DateTc ) );
                            odata.results[i].DateTc = d;


                        }
                        var dashboard = new sap.ui.model.json.JSONModel();
                        dashboard.setData( odata.results );
                        t.getView().setModel( dashboard, "historylog" );

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

                var cal2 = this.getView().byId( "fsdate" );
                cal2.addDelegate( {
                    onAfterRendering: function () {
                        cal2.$().find( 'INPUT' ).attr( 'disabled', true ).css( 'color', '#000000' );
                    }
                }, cal2 );

            },

            dateflag: function () {
                this.Dflag = "V"
            },
            dateflagF: function () {
                this.DflagF = "V"
            },






            // !!!!!!!!!!!!!!!!!This is the function Transfer our UI Payload in
            // to backend//////////////


            TransferdatatoBackend: function ( data ) {             // This
                // method is
                // called
                // from
                // Basecontroller

                // //;

                //this.getView().setBusy(true);
                //sap.ui.core.BusyIndicator.show();
                // var gpfservice = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZTICKET_TOOL_SRV/");
                var gpfservice = this.getOwnerComponent().getModel();
                var t = this;

                if ( t.ts === "0000000000" ) {
                    console.log( data );

                    gpfservice.create( "/Ticket_DetailsSet", data, {

                        success: function ( data ) {


                            t.successOperation( data );

                        },
                        error: function ( error ) {
                            sap.ui.core.BusyIndicator.hide();
                            var message = error;
                            var msg = JSON.parse( error.responseText ).error.message.value;
                            var action = "OK";
                            new sap.m.MessageBox.error( msg, {

                                onClose: function () {
                                    if ( action === "OK" ) {

                                    }
                                }
                            } );
                        }
                    } );

                }
                else {


                    var gpfservice = this.getOwnerComponent().getModel();
                    gpfservice.update( "/Ticket_DetailsSet('" + t.ts + "')", data, {
                        success: function ( odata ) {

                            t.successOperation( data );

                        }, error: function ( error ) {
                            sap.ui.core.BusyIndicator.hide();
                            var message = error;
                            var msg = JSON.parse( error.responseText ).error.message.value;
                            var action = "OK";
                            new sap.m.MessageBox.error( msg, {

                                onClose: function () {
                                    if ( action === "OK" ) {

                                    }
                                }
                            } );
                        }
                    } );


                }

            },

            successOperation: function ( data ) {


                var t = this;

                t.ts = data.RICEF_ID;  // update RICEF_ID
                t.prepareAttachment( t.ts ); // calling a function to
                // create a Attachments
                t.hl = data.RICEF_ID;  // update History log variable


                t.getView().getModel( "datamodel2" ).getData().RICEF_ID = data.RICEF_ID; // this
                // is
                // used
                // for
                // update
                // req
                // no
                // on
                // header
                // tab
                // bar
                // with
                // (Name
                // and
                // RICEF_ID)
                /*t.getView().getModel("datamodel2").getData().ReqId=odata.ReqId;*/

                t.onFilterSelect();

                // ///for clear the local array////
                t.UploadedAttachment.splice( 0, t.UploadedAttachment.length );


                t.getView().getModel( "datamodel2" ).refresh( true );        // refresh
                // global
                // model
                // along
                // with
                // attachment
                // model
                t.getView().getModel( "dashboard" ).refresh( true );

                var F;
                if ( data.Flag === "S" ) {                                         // These
                    // conditions
                    // are
                    // used
                    // for
                    // to
                    // show
                    // messagebox
                    // either
                    // saved,
                    // submit
                    // etc
                    F = "RICEF ID: '" + data.RICEF_ID + "' Saved Succesfully"
                }
                else if ( data.Flag === "T" ) {
                    F = "RICEF ID: '" + data.RICEF_ID + "' Submitted Succesfully"
                }
                else if ( data.Flag === "A" ) {
                    F = "RICEF ID: '" + data.RICEF_ID + "' Accepted Succesfully"
                }
                else if ( data.Flag === "E" ) {
                    F = "RICEF ID: '" + data.RICEF_ID + "' Query Succesfully"
                }
                else if ( data.Flag === "H" ) {
                    F = "RICEF ID: '" + data.RICEF_ID + "' Hold Succesfully"
                }
                else if ( data.Flag === "UT" ) {
                    F = "RICEF ID: '" + data.RICEF_ID + "' Sent for UT Succesfully"
                }
                else if ( data.Flag === "UA" ) {
                    F = "RICEF ID: '" + data.RICEF_ID + "' UAT Succesfully"
                }
                else if ( data.Flag === "UH" ) {
                    F = "RICEF ID: '" + data.RICEF_ID + "' Resume Succesfully"
                }
                else if ( data.Flag === "PR" ) {
                    F = "RICEF ID: '" + data.RICEF_ID + "' Moved to Production Succesfully"
                }
                else if ( data.Flag === "CL" ) {
                    F = "RICEF ID: '" + data.RICEF_ID + "' Closed Succesfully"
                }
                else if ( data.Flag === "UP" ) {
                    F = "RICEF ID: '" + data.RICEF_ID + "' Updated Succesfully"
                }
                else if ( data.Flag === "CR" ) {
                    F = "RICEF ID: '" + data.RICEF_ID + "' Sent For Code Review Succesfully"
                }
                else if ( data.Flag === "NCR" ) {
                    F = "RICEF ID: '" + data.RICEF_ID + "' Code Review Canceled Succesfully"
                }
                else if ( data.Flag === "CRD" ) {
                    F = "RICEF ID: '" + data.RICEF_ID + "' Code Was Reviewed Succesfully"
                }
                else if ( data.Flag === "UPA" ) {
                    F = "RICEF ID: '" + data.RICEF_ID + "' Updated Succesfully"
                }
                else if ( data.Flag === "DE" ) {
                    F = "RICEF ID: '" + data.RICEF_ID + "' Deleted Succesfully"
                }
                else if ( data.Flag === "S1" ) {
                    F = "RICEF ID: '" + data.RICEF_ID + "' Saved Succesfully"
                }
                var msg = F;
                /*if(F === "Production"){
                    msg = "Ticket No: '"+odata.TicketNo+"'can be moved to"+F+"";
                }else{
                    msg = "Ticket No: '"+odata.TicketNo+"' "+F+" Succesfully";
                }*/



                /*
                 * MessageBox.success("Ticket No:
                 * '"+odata.TicketNo+"'can be moved to'"+F+"'", {
                 * //to show the Actions of user "F" contains string
                 * based on actions"
                 */
                //t.getView().setBusy(false);
                sap.ui.core.BusyIndicator.hide();
                MessageBox.success( msg, {
                    icon: MessageBox.Icon.success,
                    title: "Confirmation",
                    actions: [MessageBox.Action.OK],
                    onClose: function ( oAction ) {
                        if ( oAction == "OK" ) {

                            /*
                           * if( F !== "Accepted"){
                           * 
                           * var router =
                           * t.getOwnerComponent().getRouter();
                           * router.navTo("View1"); }else{
                           * t.getView().getModel("datamodel2").refresh(true);
                           * t.createdetails(t.ts);
                           *  }
                           */
                            t.getView().getModel( "datamodel2" ).refresh( true );
                            t.createdetails( t.ts );


                        }
                    }.bind( this )
                } );
            },


            ////this function is used for relationship between BusinessUnit and systemdetails////
            // onBUSelect: function ( oEvent ) {

            //     this.getView().byId( "idsystemdetails" ).setSelectedKey( "" );
            //     var selectedKey = oEvent.mParameters.selectedItem.mProperties.key;
            //     var BU = [];
            //     BU = this.getOwnerComponent().getModel( "globalModel" ).BUData;
            //     BU = BU.filter( ( BU ) => {
            //         return BU.PaFldDisc === selectedKey;
            //     } );

            //     var sysDetailModel = new sap.ui.model.json.JSONModel();
            //     sysDetailModel.setData( BU );
            //     this.getView().setModel( sysDetailModel, "sysDetailModel" );


            // },
            Get_BenifitType: function ( evt ) {

                var Tc_Type = evt.getParameter( "selectedItem" ).getProperty( "text" );
                var Tc_Type_key = evt.getParameter( "selectedItem" ).getProperty( "key" );
            },

            onFilterSelect: function () {      // this function is used for
                // when we click any tab history
                // log should be updated
                // //;

                var b = [];
                var c = {};
                b.push( c );
                //   var gpfservice = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZTICKET_TOOL_SRV/");
                var gpfservice = this.getOwnerComponent().getModel();
                var t = this;



                var oFilter = new sap.ui.model.Filter( "RICEF_ID", "EQ", t.hl );

                gpfservice.read( "/Ticket_logSet", {
                    filters: [oFilter],
                    success: function ( odata ) {

                        ;
                        for ( var i = 0; i < odata.results.length; i++ ) {

                            delete odata.__metadata;

                            var timeString = odata.results[i].TimeTc;
                            var Hours = timeString.slice( 0, 2 );
                            var Min = timeString.slice( 2, 4 );
                            var Sec = timeString.slice( 4, 6 );
                            var otp = Hours + ":" + Min + ":" + Sec;
                            odata.results[i].TimeTc = otp;


                            // var frmt = sap.ui.core.format.DateFormat.getDateInstance( { pattern: "yyyy/MM/dd" } );
                            // var dateString = odata.results[i].DateTc;
                            // var dateObj = new Date( dateString );
                            // if ( !isNaN( dateObj ) ) {
                            //     var formattedDate = frmt.format( dateObj );
                            //     odata.results[i].DateTc = formattedDate;
                            // } else {
                            //     console.error( "Invalid date:", dateString );
                            // }
                        }

                        var dashboard = new sap.ui.model.json.JSONModel();
                        dashboard.setData( odata.results );
                        t.getView().setModel( dashboard, "historylog" );

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
                var oFilter1 = new sap.ui.model.Filter( "RICEF_ID", "EQ", t.hl );
                gpfservice.read( "/DefectLogs", {
                    filters: [oFilter1],
                    success: function ( odata ) {

                        var DefectLog = new sap.ui.model.json.JSONModel( odata.results );

                        t.getView().setModel( DefectLog, "DefectLog" );


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
                } )

            },




            // *************This blog refers to F4 helps for all the
            // respected fileds***********


            // dev_details: function () {

            //     var t = this;
            //     t.fragment = sap.ui.xmlfragment( "ztpr.zticketprocessing..fragments.dev", t );                // devtype
            //     // details
            //     // Frag
            //     t.getView().addDependent( t.fragment );
            //     t.fragment.open();

            // },
            devt: function ( evt ) {
                var val = evt.oSource.mProperties.title;                                     // once
                // we
                // click
                // the
                // value
                // we
                // set
                // the
                // mode
                // filed
                this.getView().getModel( "datamodel2" ).getData().DevType = val;
                this.getView().getModel( "datamodel2" ).refresh( true );
                this.fragment.destroy();
            },

            mduledetails: function ( evt ) {                                // As
                // same
                // as
                // all
                // the
                // F4
                // fields
                var t = this;
                t.fragment = sap.ui.xmlfragment( "ztpr.zticketprocessing..fragments.module", t );
                t.getView().addDependent( t.fragment );
                t.fragment.open();
            },
            module: function ( evt ) {
                var val = evt.oSource.mProperties.title;
                this.getView().getModel( "datamodel2" ).getData().ModuleTc = val;
                this.getView().getModel( "datamodel2" ).refresh( true );
                this.fragment.destroy();
            },
            BUdetails: function ( evt ) {
                var t = this;
                t.fragment = sap.ui.xmlfragment( "ztpr.zticketprocessing.fragments.Bunit", t );
                t.getView().addDependent( t.fragment );
                t.fragment.open();
            },

            BUModel: function ( evt ) {
                var val = evt.oSource.mProperties.title;
                this.getView().getModel( "datamodel2" ).getData().BusnUnit = val;
                this.getView().getModel( "datamodel2" ).refresh( true );
                this.fragment.destroy();
            },
            req_details: function ( evt ) {
                this.frg = "R";

                var t = this;
                t.fragment = sap.ui.xmlfragment( "ztpr.zticketprocessing.fragments.users", t );
                t.getView().addDependent( t.fragment );
                t.fragment.open();

            },

            // users F4 helps//
            user: function ( evt ) {
                ;
                var val = evt.oSource.mProperties.title;                                                    // Based
                // the
                // key
                // value
                // Users
                // should
                // be
                // assigned
                var val1 = evt.oSource.mProperties.info;
                /*if(this.frg==="R"){
                    // this.getView().byId("rqs").setValueState("Success");
                this.getView().getModel("datamodel2").getData().Requester=val1;
                this.getView().getModel("datamodel2").getData().ReqId= val;
                
                }*/
                if ( this.frg === "F" ) {
                    // this.getView().byId("functional").setValueState("Success");
                    this.getView().getModel( "datamodel2" ).getData().FuncConst = val1;
                    this.getView().getModel( "datamodel2" ).getData().FunctId = val;
                }
                if ( this.frg === "T" ) {
                    // this.getView().byId("technical").setValueState("Success");
                    this.getView().getModel( "datamodel2" ).getData().TechPs = val1;
                    this.getView().getModel( "datamodel2" ).getData().TechId = val;
                }

                if ( this.frg === "UT" ) {
                    // this.getView().byId("idUtby").setValueState("Success");
                    this.getView().getModel( "datamodel2" ).getData().UtTester = val1;
                    this.getView().getModel( "datamodel2" ).getData().UtId = val;
                }
                if ( this.frg === "UA" ) {
                    // this.getView().byId("idUat").setValueState("Success");
                    this.getView().getModel( "datamodel2" ).getData().UatTester = val1;
                    this.getView().getModel( "datamodel2" ).getData().UatId = val;
                }

                this.getView().getModel( "datamodel2" ).refresh( true );
                this.fragment.destroy();
            },



            // Fragments//

            functional_details: function ( evt ) {

                this.frg = "F"
                var t = this;
                t.fragment = sap.ui.xmlfragment( "ztpr.zticketprocessing.fragments.users", t );
                t.getView().addDependent( t.fragment );
                t.fragment.open();
            },

            technical_details: function ( evt ) {
                this.frg = "T"
                var t = this;
                t.fragment = sap.ui.xmlfragment( "ztpr.zticketprocessing.fragments.TechUser", t );
                t.getView().addDependent( t.fragment );
                t.fragment.open();
            },

            UT_Team: function ( evt ) {

                this.frg = "UT"
                var t = this;
                t.fragment = sap.ui.xmlfragment( "ztpr.zticketprocessing.fragments.UtTestUser", t );
                t.getView().addDependent( t.fragment );
                t.fragment.open();
            },
            UAT_Team: function ( evt ) {
                this.frg = "UA"
                var t = this;
                t.fragment = sap.ui.xmlfragment( "ztpr.zticketprocessing.fragments.users", t );
                t.getView().addDependent( t.fragment );
                t.fragment.open();
            },
            // onQuery:function(){
            //     var t = this;
            //     t.fragment = sap.ui.xmlfragment( "ztpr.zticketprocessing.fragments.defectCreate", t );
            //     t.getView().addDependent( t.fragment );
            //     t.fragment.open();

            // },

            onSearchdevtypemodel: function ( oEvent ) {
                var sQuery = oEvent.getParameter( "query" );
                if ( oEvent.getId() == "liveChange" ) {
                    sQuery = oEvent.getParameter( "newValue" );
                }
                var oFilter1 = new sap.ui.model.Filter( "InputTc", "Contains", sQuery );



                var aFilters = new sap.ui.model.Filter( [oFilter1] );
                var oTable = sap.ui.getCore().byId( "List" );
                var oBinding = oTable.getBinding( "items" );
                if ( oBinding ) {
                    oBinding.filter( [aFilters] );
                }
            },

            modulemodel: function ( oEvent ) {
                var sQuery = oEvent.getParameter( "query" );
                if ( oEvent.getId() == "liveChange" ) {
                    sQuery = oEvent.getParameter( "newValue" );
                }
                var oFilter1 = new sap.ui.model.Filter( "InputTc", "Contains", sQuery );



                var aFilters = new sap.ui.model.Filter( [oFilter1] );
                var oTable = sap.ui.getCore().byId( "List2" );
                var oBinding = oTable.getBinding( "items" );
                if ( oBinding ) {
                    oBinding.filter( [aFilters] );
                }
            },
            usermodel: function ( oEvent ) {
                var sQuery = oEvent.getParameter( "query" );
                if ( oEvent.getId() == "liveChange" ) {
                    sQuery = oEvent.getParameter( "newValue" );
                }
                var oFilter1 = new sap.ui.model.Filter( "InputTc", "Contains", sQuery );
                var oFilter2 = new sap.ui.model.Filter( "Name", "Contains", sQuery );

                var aFilters = new sap.ui.model.Filter( [oFilter1, oFilter2] );
                var oTable = sap.ui.getCore().byId( "List4" );
                var oBinding = oTable.getBinding( "items" );
                if ( oBinding ) {
                    oBinding.filter( [aFilters] );
                }
            },


            // End F4 helps with models//




            // ********************All the Buttons
            // actions**********************************
            onSndCodeReview: function () {
                var t = this;
                this.Act = "CR"



                sap.m.MessageBox.warning( " Kindly confirm that Code Review document has been attached ", {
                    icon: sap.m.MessageBox.Icon.warning,
                    title: "Warning",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction == "YES" ) {

                            t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
                            t.sendbackenddata( "CR" );
                        }
                    }.bind( this )
                } );
            },
            onCodeReview: function () {
                ;
                var t = this;
                this.Act = "CRD"
                var Att;
                var OldCount;
                var NewCount = this.UploadedAttachment.length;
                if ( this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ) == undefined ) {
                    OldCount = 0;
                } else {
                    OldCount = this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ).length - this.UploadedAttachment.length;

                }
                if ( this.UploadedAttachment.length !== 0 ) {
                    Att = "AT";
                    this.getView().getModel( "datamodel2" ).getData().AttachOldCount = OldCount;
                    this.getView().getModel( "datamodel2" ).getData().AttachNewCount = NewCount;
                    this.getView().getModel( "datamodel2" ).refresh( true );

                } else {
                    Att = "";
                }


                sap.m.MessageBox.warning( " Are You Sure Want To Review this Code", {
                    icon: sap.m.MessageBox.Icon.warning,
                    title: "Warning",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction == "YES" ) {

                            t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
                            t.sendbackenddata( "CRD", Att );
                        }
                    }.bind( this )
                } );
            },
            onNotCodeReview: function () {
                var t = this;
                this.Act = "NCR"



                sap.m.MessageBox.warning( " Are You Sure Want To Not Review This Code", {
                    icon: sap.m.MessageBox.Icon.warning,
                    title: "Warning",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction == "YES" ) {

                            t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
                            t.sendbackenddata( "NCR" );
                        }
                    }.bind( this )
                } );
            },
            onUpdateReq: function () {
                ;
                var t = this;
                this.Act = "UPA"
                var Att;
                var OldCount;
                var NewCount = this.UploadedAttachment.length;
                if ( this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ) == undefined ) {
                    OldCount = 0;
                } else {
                    OldCount = this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ).length - this.UploadedAttachment.length;

                }
                if ( this.UploadedAttachment.length !== 0 ) {
                    Att = "AT";
                    this.getView().getModel( "datamodel2" ).getData().AttachOldCount = OldCount;
                    this.getView().getModel( "datamodel2" ).getData().AttachNewCount = NewCount;
                    this.getView().getModel( "datamodel2" ).refresh( true );

                } else {
                    Att = "";
                }

                if ( t.UploadedAttachment.length === 0 ) {
                    sap.m.MessageBox.warning( " Please add the required attachment on Attachment Section", {
                        icon: sap.m.MessageBox.Icon.warning,
                        title: "Warning",
                        actions: [sap.m.MessageBox.Action.OK],
                        onClose: function ( oAction ) {
                            if ( oAction == "OK" ) {

                            }
                        }.bind( this )
                    } );
                } else {
                    sap.m.MessageBox.warning( " Are You Sure Want to Update", {
                        icon: sap.m.MessageBox.Icon.warning,
                        title: "Warning",
                        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                        onClose: function ( oAction ) {
                            if ( oAction == "YES" ) {

                                t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
                                t.sendbackenddata( "UPA", Att );
                            }
                        }.bind( this )
                    } );
                }

            },

            save: function () {

                var t = this;
                this.Act = "S"
                var Att;
                var OldCount;
                var NewCount = this.UploadedAttachment.length;

                if ( this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ) == undefined ) {
                    OldCount = 0;
                } else {
                    OldCount = this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ).length - this.UploadedAttachment.length;
                }


                OldCount = OldCount.toString();
                NewCount = NewCount.toString();

                if ( this.UploadedAttachment.length !== 0 ) {
                    Att = "AT";
                    this.getView().getModel( "datamodel2" ).getData().AttachOldCount = OldCount;
                    this.getView().getModel( "datamodel2" ).getData().AttachNewCount = NewCount;
                    this.getView().getModel( "datamodel2" ).refresh( true );
                } else {
                    Att = "";
                }

                sap.m.MessageBox.warning( "Are You Sure Want To Save", {
                    icon: sap.m.MessageBox.Icon.warning,
                    title: "Warning",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction == "YES" ) {

                            t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
                            t.sendbackenddata( "S", Att );
                        }
                    }.bind( this )
                } );
            },



            save1: function () {
                ;
                var t = this;
                this.Act = "S1"
                var Att;
                var OldCount;
                var NewCount = this.UploadedAttachment.length;
                if ( this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ) == undefined ) {
                    OldCount = 0;
                } else {
                    OldCount = this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ).length - this.UploadedAttachment.length;

                }
                OldCount = OldCount.toString();
                NewCount = NewCount.toString();
                if ( this.UploadedAttachment.length !== 0 ) {
                    Att = "AT";
                    this.getView().getModel( "datamodel2" ).getData().AttachOldCount = OldCount;
                    this.getView().getModel( "datamodel2" ).getData().AttachNewCount = NewCount;
                    this.getView().getModel( "datamodel2" ).refresh( true );

                } else {
                    Att = "";
                }


                sap.m.MessageBox.warning( " Are You Sure Want To Save", {
                    icon: sap.m.MessageBox.Icon.warning,
                    title: "Warning",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction == "YES" ) {

                            t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
                            t.sendbackenddata( "S1", Att );
                        }
                    }.bind( this )
                } );
            },

            Deletetc: function () {

                var t = this;
                this.Act = "DE"



                sap.m.MessageBox.warning( " Are You Sure Want To Delete", {
                    icon: sap.m.MessageBox.Icon.warning,
                    title: "Warning",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction == "YES" ) {

                            t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
                            t.sendbackenddata( "DE" );
                        }
                    }.bind( this )
                } );

            },


            submit: function () {
                ;
                var t = this;

                var Att;
                var OldCount;
                var NewCount = this.UploadedAttachment.length;
                if ( this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ) == undefined ) {
                    OldCount = 0;
                } else {
                    OldCount = this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ).length - this.UploadedAttachment.length;

                }
                OldCount = OldCount.toString();
                NewCount = NewCount.toString();

                if ( this.UploadedAttachment.length !== 0 ) {
                    Att = "AT";
                    this.getView().getModel( "datamodel2" ).getData().AttachOldCount = OldCount;
                    this.getView().getModel( "datamodel2" ).getData().AttachNewCount = NewCount;
                    this.getView().getModel( "datamodel2" ).refresh( true );

                } else {
                    Att = "";
                }

                this.Act = "T"

                sap.m.MessageBox.warning( " Are You Sure Want To Submit", {
                    icon: sap.m.MessageBox.Icon.warning,
                    title: "Warning",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction == "YES" ) {
                            t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
                            t.sendbackenddata( "T", Att );
                        }
                    }.bind( this )
                } );
                // 	 	            }
            },
            Reject: function () {

                var t = this;

                sap.m.MessageBox.error( " Are You Sure Want To Cancel", {
                    icon: sap.m.MessageBox.Icon.error,
                    title: "Cancel",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction == "YES" ) {

                            var router = t.getOwnerComponent().getRouter();
                            router.navTo( "RouteView1" );

                        }
                    }.bind( this )
                } );
            },

            Accept: function () {
                var t = this;

                var Att;

                var NewCount = this.UploadedAttachment.length;
                var OldCount = this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ).length - this.UploadedAttachment.length;
                if ( this.UploadedAttachment.length !== 0 ) {
                    Att = "AT";
                    this.getView().getModel( "datamodel2" ).getData().AttachOldCount = OldCount;
                    this.getView().getModel( "datamodel2" ).getData().AttachNewCount = NewCount;
                    this.getView().getModel( "datamodel2" ).refresh( true );

                } else {
                    Att = "";
                }

                this.Act = "A"

                sap.m.MessageBox.warning( " Are You Sure Want To Accept", {
                    icon: sap.m.MessageBox.Icon.warning,
                    title: "Accept",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction == "YES" ) {
                            t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
                            t.sendbackenddata( "A", Att );

                        }
                    }.bind( this )
                } );
            },
            Enquiry: function () {
                var t = this;
                var Att;


                var defectDialog = this._getDefectDialog();
                defectDialog.open();
                var NewCount = this.UploadedAttachment.length;
                var OldCount = this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ).length - this.UploadedAttachment.length;

                if ( this.UploadedAttachment.length !== 0 ) {
                    Att = "AT";
                    this.getView().getModel( "datamodel2" ).getData().AttachOldCount = OldCount;
                    this.getView().getModel( "datamodel2" ).getData().AttachNewCount = NewCount;
                    this.getView().getModel( "datamodel2" ).refresh( true );
                } else {
                    Att = "";
                }

                this.Act = "E";

                // if ( this.getView().getModel( "datamodel2" ).getData().Remarks === "" ) {
                //     sap.m.MessageBox.warning( "Please Fill The Remarks", {
                //         icon: sap.m.MessageBox.Icon.WARNING,
                //         title: "Remarks",
                //         actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                //         onClose: function ( oAction ) {
                //             if ( oAction === "OK" ) {
                //                 // Additional logic for OK action
                //             }
                //         }.bind( this )
                //     } );
                // } else {
                //     sap.m.MessageBox.warning( "Are You Sure You Want To Query?", {
                //         icon: sap.m.MessageBox.Icon.WARNING,
                //         title: "Query",
                //         actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                //         onClose: function ( oAction ) {
                //             if ( oAction === "YES" ) {
                //                 t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
                //                 t.sendbackenddata( "E", Att );
                //             }
                //         }.bind( this )
                //     } );
                // }
            },

            Hold: function () {
                var t = this;

                var Att;

                var NewCount = this.UploadedAttachment.length;
                var OldCount = this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ).length - this.UploadedAttachment.length;
                if ( this.UploadedAttachment.length !== 0 ) {
                    Att = "AT";
                    this.getView().getModel( "datamodel2" ).getData().AttachOldCount = OldCount;
                    this.getView().getModel( "datamodel2" ).getData().AttachNewCount = NewCount;
                    this.getView().getModel( "datamodel2" ).refresh( true );

                } else {
                    Att = "";
                }

                this.Act = "H"

                sap.m.MessageBox.warning( " Are You Sure Want To Hold", {
                    icon: sap.m.MessageBox.Icon.warning,
                    title: "Hold",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction == "YES" ) {
                            t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
                            t.sendbackenddata( "H", Att );

                        }
                    }.bind( this )
                } );
            },

            On_Hold: function () {
                var t = this;

                var Att;

                var NewCount = this.UploadedAttachment.length;
                var OldCount = this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ).length - this.UploadedAttachment.length;
                if ( this.UploadedAttachment.length !== 0 ) {
                    Att = "AT";
                    this.getView().getModel( "datamodel2" ).getData().AttachOldCount = OldCount;
                    this.getView().getModel( "datamodel2" ).getData().AttachNewCount = NewCount;
                    this.getView().getModel( "datamodel2" ).refresh( true );

                } else {
                    Att = "";
                }

                this.Act = "UH"
                t.getView().byId( "idDelFile" ).setEnabled( false );

                sap.m.MessageBox.warning( " Are You Sure Want To Resume", {
                    icon: sap.m.MessageBox.Icon.warning,
                    title: "Resume",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction == "YES" ) {
                            t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
                            t.sendbackenddata( "UH", Att );

                        }
                    }.bind( this )
                } );
            },
            UT: function () {
                var t = this;

                var Att;

                var NewCount = this.UploadedAttachment.length;
                var OldCount = this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ).length - this.UploadedAttachment.length;
                if ( this.UploadedAttachment.length !== 0 ) {
                    Att = "AT";
                    this.getView().getModel( "datamodel2" ).getData().AttachOldCount = OldCount;
                    this.getView().getModel( "datamodel2" ).getData().AttachNewCount = NewCount;
                    this.getView().getModel( "datamodel2" ).refresh( true );

                } else {
                    Att = "";
                }

                this.Act = "UT"

                sap.m.MessageBox.warning( " Kindly confirm that Technical test document has been attached", {
                    icon: sap.m.MessageBox.Icon.warning,
                    title: "UT",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction == "YES" ) {
                            t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
                            t.sendbackenddata( "UT", Att );

                        }
                    }.bind( this )
                } );
                // 	 	            	}
            },

            UAT: function () {
                var t = this;

                var Att;

                var NewCount = this.UploadedAttachment.length;
                var OldCount = this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ).length - this.UploadedAttachment.length;
                if ( this.UploadedAttachment.length !== 0 ) {
                    Att = "AT";
                    this.getView().getModel( "datamodel2" ).getData().AttachOldCount = OldCount;
                    this.getView().getModel( "datamodel2" ).getData().AttachNewCount = NewCount;
                    this.getView().getModel( "datamodel2" ).refresh( true );

                } else {
                    Att = "";
                }

                this.Act = "UA"

                sap.m.MessageBox.warning( " Kindly confirm that UT script has been attached", {
                    icon: sap.m.MessageBox.Icon.warning,
                    title: "UAT",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction == "YES" ) {
                            t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
                            t.sendbackenddata( "UA", Att );

                        }
                    }.bind( this )
                } );
            },

            // PRD: function () {
            //     var t = this;

            //     var Att;

            //     var NewCount = this.UploadedAttachment.length;
            //     var OldCount = this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ).length - this.UploadedAttachment.length;
            //     if ( this.UploadedAttachment.length !== 0 ) {
            //         Att = "AT";
            //         this.getView().getModel( "datamodel2" ).getData().AttachOldCount = OldCount;
            //         this.getView().getModel( "datamodel2" ).getData().AttachNewCount = NewCount;
            //         this.getView().getModel( "datamodel2" ).refresh( true );

            //     } else {
            //         Att = "";
            //     }

            //     this.Act = "PR"

            //     sap.m.MessageBox.warning( " Kindly confirm that all UAT script has been attached", {
            //         icon: sap.m.MessageBox.Icon.warning,
            //         title: "PRODUCTION",
            //         actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
            //         onClose: function ( oAction ) {
            //             if ( oAction == "YES" ) {
            //                 t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
            //                 t.sendbackenddata( "PR", Att );

            //             }
            //         }.bind( this )
            //     } );
            // },
            PRD: function () {
                var t = this;
                var Att;


                var oData = this.getView().getModel( "datamodel2" ).getData();


                var aRequiredDocs = ["FSD", "TSD", "CRD", "TS", "Checklist"];
                var aMissingDocs = [];


                aRequiredDocs.forEach( function ( doc ) {
                    if ( !oData[doc] || oData[doc] === "" ) {
                        aMissingDocs.push( doc );
                    }
                } );


                if ( aMissingDocs.length > 0 ) {
                    var sErrorMessage = "The following documents are missing: " + aMissingDocs.join( ", " );
                    sap.m.MessageBox.error( sErrorMessage );
                    return;
                }

                var NewCount = this.UploadedAttachment.length;
                var OldCount = this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ).length - this.UploadedAttachment.length;

                if ( this.UploadedAttachment.length !== 0 ) {
                    Att = "AT";
                    oData.AttachOldCount = OldCount;
                    oData.AttachNewCount = NewCount;
                    this.getView().getModel( "datamodel2" ).refresh( true );
                } else {
                    Att = "";
                }

                this.Act = "PR";

                sap.m.MessageBox.warning( "Kindly confirm that all UAT script has been attached", {
                    icon: sap.m.MessageBox.Icon.WARNING,
                    title: "PRODUCTION",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction === "YES" ) {
                            t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
                            t.sendbackenddata( "PR", Att );
                        }
                    }.bind( this )
                } );
            },


            CloseTicket: function () {
                var t = this;

                this.Act = "CL"

                sap.m.MessageBox.warning( " Kindly confirm that all relevant documents have been attached", {
                    icon: sap.m.MessageBox.Icon.warning,
                    title: "CLOSE",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction == "YES" ) {

                            t.sendbackenddata( "CL" );

                        }
                    }.bind( this )
                } );
            },



            onUpdate: function () {
                var t = this;
                ;
                this.Act = "UP"

                var Att;

                var NewCount = this.UploadedAttachment.length;
                var OldCount = this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ).length - this.UploadedAttachment.length;
                if ( this.UploadedAttachment.length !== 0 ) {
                    Att = "AT";
                    this.getView().getModel( "datamodel2" ).getData().AttachOldCount = OldCount;
                    this.getView().getModel( "datamodel2" ).getData().AttachNewCount = NewCount;
                    this.getView().getModel( "datamodel2" ).refresh( true );

                } else {
                    Att = "";
                }


                sap.m.MessageBox.warning( " Are You Sure Want To Update", {
                    icon: sap.m.MessageBox.Icon.warning,
                    title: "Update",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction == "YES" ) {
                            t.UploadedAttachmentindex.splice( 0, t.UploadedAttachmentindex.length );
                            t.sendbackenddata( "UP", Att );

                        }
                    }.bind( this )
                } );
            },



            backpage: function () {

                var router = this.getOwnerComponent().getRouter();
                router.navTo( "RouteView1" );
                // location.reload();
            },

            add_attachment: function () {
                // //;
                var t = this;
                t.fragment = sap.ui.xmlfragment( "ztpr.zticketprocessing.fragments.Attch", t );
                t.getView().addDependent( t.fragment );
                t.fragment.open();
            },
            dclose: function () {
                var t = this;
                t.getView().getDependents()[0].close();
                t.getView().getDependents()[0].destroy();
            },

            // Button actions are closed


            // *******************This blog is handle for Attachment

            handleUploadComplete: function ( oEvent ) {
                ;
            },

            handleUploadPress: function ( oEvent ) {
                ;

                try {

                    var oFileUploader = sap.ui.getCore().byId( "fileUploader" ), returnData = "";
                    oFileUploader.upload();
                    var file = jQuery.sap.domById( oFileUploader.getId() + "-fu" ).files[0];
                    if ( file.name && file.name.length > 100 ) {
                        sap.m.MessageToast.show( "File name with extension shuld not exceel 100 characters." )
                        return;
                    }
                    var fileName = file.name.replace( ",", "" ),
                        fileType = file.type,
                        fileSize = file.size / 1024;

                    ;
                    var type = sap.ui.getCore().byId( "Sel" ).getSelectedItem().mProperties.text;
                    this.previewFile( fileType, fileName, file, type );
                    var oFileUploader = sap.ui.getCore().byId( "fileUploader" );
                    oFileUploader.clear();


                } catch ( e ) {

                    sap.m.MessageBox.warning( "Please select the File Type" );



                }



                var t = this;
                t.getView().getDependents()[0].close();
                t.getView().getDependents()[0].destroy();




            },
            previewFile: function ( fileType, fileName, file, type ) {
                var t = this;

                const preview = document.querySelector( 'img' );
                var file = file;// document.querySelector('input[type=file]').files[0];
                var reader = new FileReader();

                reader.addEventListener( "load", function () {
                    // convert image file to base64 string
                    ;
                    var dataToPush = {
                        RICEF_ID: t.ts,
                        Filename: fileName,
                        MimeType: fileType,
                        Value: reader.result,// file,
                        Type: type,
                        isCreated: true,
                        Datestamp: new Date()
                        // Type:fileFor
                    }
                    t.UploadedAttachmentindex.push( dataToPush );
                    t.UploadedAttachment.push( dataToPush );

                    var uploadedAttachment = t.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" ) || [];
                    if ( dataToPush.RICEF_ID.trim() === "" ) {
                        uploadedAttachment = t.UploadedAttachment;
                    } else {
                        uploadedAttachment.push( t.UploadedAttachmentindex.pop() );
                    }
                    t.getView().getModel( "dashboard" ).setProperty( "/UploadedAttachment", uploadedAttachment );
                    t.getView().getModel( "dashboard" ).refresh( true );


                    sap.m.MessageToast.show( "Attachment Uploaded Successfully" );

                }, false );

                if ( file ) {
                    reader.readAsDataURL( file );
                }
            },

            fnEnableDel: function ( val ) {
                if ( val ) {
                    return false;
                } else {
                    return true;
                }

            },

            prepareAttachment: function ( RICEF_ID ) {

                ;
                var t = this;

                try {
                    // var RICEF_IDo = RICEF_ID;

                    var allAtt = this.getView().getModel( "dashboard" ).getProperty( "/UploadedAttachment" );

                    var newCreatedAttachment = allAtt.filter( function ( e ) {
                        return e.isCreated
                    } );
                    if ( newCreatedAttachment && newCreatedAttachment.length > 0 ) {
                        for ( var i = 0; i < newCreatedAttachment.length; i++ ) {

                            newCreatedAttachment[i].RICEF_ID = RICEF_ID;
                            t.sendAttachment( newCreatedAttachment[i] );
                        }
                    }

                } catch ( e ) {
                    console.log( e )
                }
            },
            sendAttachment: function ( attachment ) {
                ;
                try {
                    var lv_oDataUrl = "/sap/opu/odata/sap/ZCA_TRACKER_SRV/";
                    var lv_OModel = new sap.ui.model.odata.ODataModel( lv_oDataUrl, true );
                    lv_OModel.setHeaders( {
                        "X-Requested-With": "XMLHttpRequest",
                        "Content-Type": "application/json",
                        "DataServiceVersion": "2.0",
                        "slug": attachment.MimeType,
                        "Accept": "application/atom+xml,application/atomsvc+xml,application/xml",
                        "X-CSRF-Token": ""
                    } );

                    var dataToSend = {
                        RICEF_ID: attachment.RICEF_ID,
                        Filename: attachment.Filename,
                        MimeType: attachment.MimeType,
                        Value: attachment.Value,
                        Datestamp: attachment.Datestamp,
                        Action: "",
                        Type: attachment.Type,
                        Timestamp: ""
                    }

                        ;
                    debugger;
                    lv_OModel.update( "/Fileset(RICEF_ID='" + dataToSend.RICEF_ID + "',Type='" + dataToSend.Type + "',Filename='" + dataToSend.Filename + "')/$value", dataToSend, null, function ( oData, oResponse ) {
                        sap.m.MessageToast.show( "Attachment Created Successfully" );

                    }, function ( err ) {
                        console.log( err )
                    } );
                } catch ( e ) {
                    console.log( e )
                }
            },
            onFileDelete: function ( oEvent ) {
                var sPath = parseInt( oEvent.getSource().getBindingContext( "dashboard" ).getPath().slice( 20 ) );
                var allAttachment = this.getView().getModel( "dashboard" ).getData().UploadedAttachment;
                MessageBox.warning( " Are You Sure Want To Delete", {
                    icon: MessageBox.Icon.warning,
                    title: "Warning",
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    onClose: function ( oAction ) {
                        if ( oAction == "YES" ) {

                            try {

                                allAttachment.splice( sPath, 1 );
                                this.getView().getModel( "dashboard" ).setProperty( "/UploadedAttachment", allAttachment );
                                this.getView().getModel( "dashboard" ).refresh();
                            } catch ( e ) {
                                console.log( e );
                            }
                        }
                    }.bind( this )
                } );

            },


            /* open remarks fragment */
            onRemarks: function () {

                if ( !this.pDialog ) {
                    this.pDialog = this.loadFragment( {
                        name: "ztpr.zticketprocessing.fragments.Remarks1"
                    } );
                }
                this.pDialog.then( function ( oDialog ) {
                    oDialog.open();
                } );
            },


            /* close the remark dialogBox */
            onCloseRemark: function () {
                this.byId( "idfrag" ).destroy();
                this.pDialog = undefined;
            },

            // ////suggestion for functional consultant////////
            onFuncConsul: function ( oEvent ) {
                // this.getView().byId("functional").setValueState("Success");
                var val1 = oEvent.oSource.mProperties.selectedKey;
                var val2 = oEvent.oSource.mProperties.value;
                this.getView().getModel( "datamodel2" ).getData().FuncConst = val2;
                this.getView().getModel( "datamodel2" ).getData().FunctId = val1;
                this.getView().getModel( "datamodel2" ).refresh( true );
            },

            // //suggestion for technical/////
            onTech: function ( oEvent ) {
                // this.getView().byId("technical").setValueState("Success");
                var val1 = oEvent.oSource.mProperties.selectedKey;
                var val2 = oEvent.oSource.mProperties.value;
                this.getView().getModel( "datamodel2" ).getData().TechPs = val2;
                this.getView().getModel( "datamodel2" ).getData().TechId = val1;
                this.getView().getModel( "datamodel2" ).refresh( true );
            },

            // //suggestion for UTBy////
            onUTBy: function ( oEvent ) {
                // this.getView().byId("idUtby").setValueState("Success");
                var val1 = oEvent.oSource.mProperties.selectedKey;
                var val2 = oEvent.oSource.mProperties.value;
                this.getView().getModel( "datamodel2" ).getData().UtTester = val2;
                this.getView().getModel( "datamodel2" ).getData().UtId = val1;
                this.getView().getModel( "datamodel2" ).refresh( true );
            },

            // /suggestion for UATBy////
            onUATBy: function ( oEvent ) {
                // this.getView().byId("idUat").setValueState("Success");
                var val1 = oEvent.oSource.mProperties.selectedKey;
                var val2 = oEvent.oSource.mProperties.value;
                this.getView().getModel( "datamodel2" ).getData().UatTester = val2;
                this.getView().getModel( "datamodel2" ).getData().UatId = val1;
                this.getView().getModel( "datamodel2" ).refresh( true );
            },

            // //Livechge for functional Consultant////
            onLiveChgeFunc: function ( oEvent ) {
                ;
                var val = oEvent.mParameters.value.toUpperCase();
                var model = this.getView().getModel( "fuctUserModel" ).getData();

                var modeldata = model.filter( obj => {
                    if ( obj.Name === val ) {

                        return obj.Name;
                    }
                } );

                if ( modeldata.length === 0 ) {

                }
                else {

                    var val1 = modeldata[0].InputTc;
                    var val2 = val;
                    this.getView().getModel( "datamodel2" ).getData().FuncConst = val2;
                    this.getView().getModel( "datamodel2" ).getData().FunctId = val1;
                    this.getView().getModel( "datamodel2" ).refresh( true );
                }
            },

            // //Livechge for Technical consultant////
            onLiveChgeTech: function ( oEvent ) {
                var val = oEvent.mParameters.value.toUpperCase();
                var model = this.getView().getModel( "usermodel" ).getData();

                var modeldata = model.filter( obj => {
                    if ( obj.Name === val ) {

                        return obj.Name;
                    }
                } );

                if ( modeldata.length === 0 ) {

                }
                else {

                    var val1 = modeldata[0].InputTc;
                    var val2 = val;
                    this.getView().getModel( "datamodel2" ).getData().TechPs = val2;
                    this.getView().getModel( "datamodel2" ).getData().TechId = val1;
                    this.getView().getModel( "datamodel2" ).refresh( true );
                }
            },

            // //Livechge for Ut ////
            onLiveChgeUt: function ( oEvent ) {
                var val = oEvent.mParameters.value.toUpperCase();
                var model = this.getView().getModel( "usermodel" ).getData();

                var modeldata = model.filter( obj => {
                    if ( obj.Name === val ) {

                        return obj.Name;
                    }
                } );

                if ( modeldata.length === 0 ) {

                    // this.getView().byId("idUtby").setValueState("Error");
                }
                else {
                    // this.getView().byId("idUtby").setValueState("Success");
                    var val1 = modeldata[0].InputTc;
                    var val2 = val;
                    this.getView().getModel( "datamodel2" ).getData().UtTester = val2;
                    this.getView().getModel( "datamodel2" ).getData().UtId = val1;
                    this.getView().getModel( "datamodel2" ).refresh( true );
                }
            },

            // //Livechge for Uat////
            onLiveChgeUat: function ( oEvent ) {

                var val = oEvent.mParameters.value.toUpperCase();
                var model = this.getView().getModel( "usermodel" ).getData();

                var modeldata = model.filter( obj => {
                    if ( obj.Name === val ) {

                        return obj.Name;
                    }
                } );

                if ( modeldata.length === 0 ) {

                    // this.getView().byId("idUat").setValueState("Error");
                }
                else {
                    // this.getView().byId("idUat").setValueState("Success");
                    var val1 = modeldata[0].InputTc;
                    var val2 = val;
                    this.getView().getModel( "datamodel2" ).getData().UatTester = val2;
                    this.getView().getModel( "datamodel2" ).getData().UatId = val1;
                    this.getView().getModel( "datamodel2" ).refresh( true );
                }
            },

            actionBy: function ( actionby ) {

                var functionalConsult = this.getView().getModel( "datamodel2" ).getData().FunctId;
                var techConsult = this.getView().getModel( "datamodel2" ).getData().TechId;
                var utConsult = this.getView().getModel( "datamodel2" ).getData().UtId;
                var uatConsult = this.getView().getModel( "datamodel2" ).getData().UatId;

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

            fn_FieldHandle: function ( TicketStatus, Flag ) {

                if ( TicketStatus == "Draft" ) {
                    if ( this.functionalConsult === this.currUserId ) { return true } else { return false };
                } else if ( TicketStatus == "Created" ) {
                    if ( this.utConsult === this.currUserId ) { return false } else { return true };
                } else if ( TicketStatus == "Accepted by Technical" ) {
                    if ( this.utConsult === this.currUserId ) { return false } else { return true };
                } else if ( TicketStatus == "On Hold by Technical" ) {
                    if ( this.utConsult === this.currUserId ) { return false } else { return true };
                } else if ( TicketStatus == "Work In Progress" ) {
                    if ( this.utConsult === this.currUserId ) { return false } else { return true };
                } else if ( TicketStatus == "Queried by Technical" ) {
                    if ( this.functionalConsult === this.currUserId ) { return true } else { return false };
                } else if ( TicketStatus == "Query resolved by Functional" ) {
                    if ( this.utConsult === this.currUserId ) { return false } else { return true };
                } else if ( TicketStatus == "Sent for UT" ) {

                } else if ( TicketStatus == "Queried by UT" ) {
                    if ( this.utConsult === this.currUserId ) { return false } else { return true };
                } else if ( TicketStatus == "Sent for UT" ) {

                } else if ( TicketStatus == "Sent for UAT" ) {

                } else if ( TicketStatus == "Production" ) {
                    if ( this.utConsult === this.currUserId ) { return false } else { return true };
                } else if ( TicketStatus == "Closed" || TicketStatus == "Withdraw" || TicketStatus == "Attachments are Updated" ) {
                    return false;
                } else {
                    return true;
                }


            },

            onFiledataDownload: function ( evt ) {


                ;


                var path = parseInt( evt.getSource().getBindingContext( "dashboard" ).getPath().slice( 20 ) );


                if ( this.UploadedAttachment.length !== 0 ) {

                    this.onFiledownload( path );
                }

                else if ( this.UploadedAttachment.length == 0 ) {


                    this.aftersubmission( path );
                }


            },


            onFiledownload: function ( path ) {
                ;


                var filecontent = this.getView().byId( "files" ).getModel( "dashboard" ).getData().UploadedAttachment[path].Value;
                var fileType = this.getView().byId( "files" ).getModel( "dashboard" ).getData().UploadedAttachment[path].Filename;

                var ftype = fileType.split( '.' ).pop();


                const downloadlink = document.createElement( "a" );
                const filename = fileType;
                downloadlink.href = filecontent;
                downloadlink.download = filename;
                downloadlink.click();



            },

            aftersubmission: function ( path ) {
                ;

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

            }



        } );
    } );






