sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageBox",
  ],
  function ( Controller, BusyIndicator, MessageBox ) {
    "use strict";

    return Controller.extend(
      "ztpr.zticketprocessing.controller.BaseController",
      {
        // formatDate: function ( date ) {
        //   var date = new Date(date).toISOString();
        //   date = date.split('-');
        //   date = date[0] + date[1] + date[2];
        //   date = date.split('T');
        //   date = date[0];
        //   return date;
        //   },
                

        sendbackenddata: function ( para, Att ) {
          //////calculation Reqdate convert Standard Date format with time//////

          /* var reqdate=this.getView().getModel("datamodel2").getData().ReqDate;
              
                   
                    if((reqdate==="")||(reqdate===null)){
                        reqdate=null;
                      }
                      else {
                      var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"yyyy/MM/dd"});
                      reqdate=frmt.format(new Date(reqdate));
                      reqdate=new Date(reqdate);
                      reqdate= new Date(reqdate.setHours("00","00","00","00"));
                      reqdate = new Date(reqdate.getTime() + reqdate.getTimezoneOffset() * (-60000));
                      reqdate=reqdate;
                      }*/

          /////calculation FS recieve date ///////////

          // var fsdate = this.getView()
          //   .getModel( "datamodel2" )
          //   .getData().FsReceDate;

          // if ( fsdate === "" || fsdate === null ) {
          //   fsdate = null;
          // } else {
          //   var frmt = sap.ui.core.format.DateFormat.getDateInstance( {
          //     pattern: "yyyy/MM/dd",
          //   } );
          //   fsdate = frmt.format( new Date( fsdate ) );
          //   fsdate = new Date( fsdate );
          //   fsdate = new Date( fsdate.setHours( "00", "00", "00", "00" ) );
          //   fsdate = new Date(
          //     fsdate.getTime() + fsdate.getTimezoneOffset() * -60000
          //   );
          //   fsdate = fsdate;
          // }

          //////code receieve date//////////

          /* var crdate=this.getView().getModel("datamodel2").getData().CodeRevDate;
                       
                    if((crdate==="")||(crdate===null)){
                        crdate=null;
                      }
                      else {
                      var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"yyyy-MM-dd"});
                      crdate=frmt.format(new Date(crdate));
                      crdate=new Date(crdate);
                      crdate= new Date(crdate.setHours("00","00","00","00"));
                      crdate = new Date(crdate.getTime() + crdate.getTimezoneOffset() * (-60000));
                      crdate=crdate;
                      }*/

          /////FS Ticket Creation Date/////
          // var fsacreationDate = this.getView()
          //   .getModel( "datamodel2" )
          //   .getData().FsTcCre;

          // if ( fsacreationDate === "" || fsacreationDate === null ) {
          //   fsacreationDate = null;
          // } else {
          //   var frmt = sap.ui.core.format.DateFormat.getDateInstance( {
          //     pattern: "yyyy-MM-dd",
          //   } );
          //   fsacreationDate = frmt.format( new Date( fsacreationDate ) );
          //   fsacreationDate = new Date( fsacreationDate );
          //   fsacreationDate = new Date(
          //     fsacreationDate.setHours( "00", "00", "00", "00" )
          //   );
          //   fsacreationDate = new Date(
          //     fsacreationDate.getTime() +
          //     fsacreationDate.getTimezoneOffset() * -60000
          //   );
          //   fsacreationDate = fsacreationDate;
          // }

          ////FS Target Completion date////
          // var fstragetComdate = this.getView()
          //   .getModel( "datamodel2" )
          //   .getData().FsTargetCom;
          // if ( fstragetComdate === "" || fstragetComdate === null ) {
          //   fstragetComdate = null;
          // } else {
          //   var frmt = sap.ui.core.format.DateFormat.getDateInstance( {
          //     pattern: "yyyy-MM-dd",
          //   } );
          //   fstragetComdate = frmt.format( new Date( fstragetComdate ) );
          //   fstragetComdate = new Date( fstragetComdate );
          //   fstragetComdate = new Date(
          //     fstragetComdate.setHours( "00", "00", "00", "00" )
          //   );
          //   fstragetComdate = new Date(
          //     fstragetComdate.getTime() +
          //     fstragetComdate.getTimezoneOffset() * -60000
          //   );
          //   fstragetComdate = fstragetComdate;
          // }

          ////Development target completion Date////
          // var devTargetComplDate = this.getView()
          //   .getModel("datamodel2")
          //   .getData().DevTargetDate;
          // if (devTargetComplDate === "" || devTargetComplDate === null) {
          //   devTargetComplDate = null;
          // } else {
          //   var frmt = sap.ui.core.format.DateFormat.getDateInstance({
          //     pattern: "yyyy-MM-dd",
          //   });
          //   devTargetComplDate = frmt.format(new Date(devTargetComplDate));
          //   devTargetComplDate = new Date(devTargetComplDate);
          //   devTargetComplDate = new Date(
          //     devTargetComplDate.setHours("00", "00", "00", "00")
          //   );
          //   devTargetComplDate = new Date(
          //     devTargetComplDate.getTime() +
          //       devTargetComplDate.getTimezoneOffset() * -60000
          //   );
          //   devTargetComplDate = devTargetComplDate;
          // }

          ////code reviewDate////
          // var codeRevDate = this.getView()
          //   .getModel( "datamodel2" )
          //   .getData().CrDate;
          // if ( codeRevDate === "" || codeRevDate === null ) {
          //   codeRevDate = null;
          // } else {
          //   var frmt = sap.ui.core.format.DateFormat.getDateInstance( {
          //     pattern: "yyyy-MM-dd",
          //   } );
          //   codeRevDate = frmt.format( new Date( codeRevDate ) );
          //   codeRevDate = new Date( codeRevDate );
          //   codeRevDate = new Date(
          //     codeRevDate.setHours( "00", "00", "00", "00" )
          //   );
          //   codeRevDate = new Date(
          //     codeRevDate.getTime() + codeRevDate.getTimezoneOffset() * -60000
          //   );
          //   codeRevDate = codeRevDate;
          // }

          ////Code review Time data formatting////

          var crTime = this.getView().getModel( "datamodel2" ).getData().CrTime;
          if ( crTime === "" ) {
            crTime = "";
          } else {
            crTime = crTime.replace( /:/g, "" );
            crTime = crTime.replace( "H", "" );
            crTime = crTime.replace( "M", "" );
            crTime = crTime.replace( "S", "" );

          }
          

          //validations  for all the fields//

          var msg = "";
          var counter = 0;
          var type;

          // debugger

          var files = this.getView()
            .getModel( "dashboard" )
            .getProperty( "/UploadedAttachment" );

          ////file validation////

          /*if (files == undefined){
                         type="E"
                               counter = counter + 1
                               msg+=+counter+").Please Attach the Required File for the Ticket\n"
                    }else{
                        
                        if( para == "T"){
                              for(var i=0;i<files.length;i++){
                                  let filetype = files[i].Type;
                                  if( filetype !== "FS" || "TS" || "BRD"){
                                      type="E"
                                           counter = counter + 1
                                           msg+=+counter+").Please Choose the Correct FileType for Submitting the Ticket on Attachment Section\n"
                                  }
                                  
                              }
                            }
                    }*/

          if ( para === "CRD" ) {
            var crDoc = files.filter(
              ( obj ) => obj.Type === "Code review document"
            );

            if ( crDoc.length === 0 ) {
              type = "E";
              counter = counter + 1;
              msg +=
                +counter +
                ").Please attach the required Code Review document on Attachment Section\n";
            }
          }
          if (
            this.getView().getModel( "datamodel2" ).getData().RICEF_ID === ""
          ) {
            type = "E";
            counter = counter + 1;
            msg += +counter + ").Please Fill RICEF_ID\n";
          }
        
          if (
            this.getView().getModel( "datamodel2" ).getData().Description === ""
          ) {
            type = "E";
            counter = counter + 1;
            msg += +counter + ").Please Fill Description\n";
          }
          if ( this.getView().getModel( "datamodel2" ).getData().TcType === "" ) {
            type = "E";
            counter = counter + 1;
            msg += +counter + ").Please Fill Ticket Type\n";
          }

          if ( this.getView().getModel( "datamodel2" ).getData().ModuleTc === "" ) {
            type = "E";
            counter = counter + 1;
            msg += +counter + ").Please Select Module\n";
          }
          /*if(this.getView().getModel("datamodel2").getData().ReqId==="")*/
          /*if(this.getView().getModel("datamodel2").getData().Requester===""){
                               counter = counter + 1;
                               type="E"
                                   msg+=+counter+").Please Selecte Request By\n"
                                   } */
          if ( this.getView().getModel( "datamodel2" ).getData().BusnUnit === "" ) {
            type = "E";
            counter = counter + 1;
            msg += +counter + ").Please Fill Region\n";
          }

          //----------------------------------------------------------------------

          // if ( this.getView().getModel( "datamodel2" ).getData().FsTcRef === "" ) {
          //   type = "E";
          //   counter = counter + 1;
          //   msg += +counter + ").Please Fill FS Ticket Reference\n";
          // }

          // if ( this.getView().getModel( "datamodel2" ).getData().FsDes === "" ) {
          //   type = "E";
          //   counter = counter + 1;
          //   msg += +counter + ").Please Fill FS Description\n";
          // }
          if (
            this.getView().getModel( "datamodel2" ).getData().FsTcCre === null
          ) {
            type = "E";
            counter = counter + 1;
            msg += +counter + ").Please Select FS Ticket Creation Date\n";
          }
          if (
            this.getView().getModel( "datamodel2" ).getData().FsTargetCom === null
          ) {
            type = "E";
            counter = counter + 1;
            msg +=
              +counter + ").Please Select FS Ticket Target Completion Date\n";
          }
          //--------------------------------------------------------------------------
          // if (
          //   this.getView().getModel("datamodel2").getData().DevTargetDate ===
          //   null
          // ) {
          //   type = "E";
          //   counter = counter + 1;
          //   msg +=
          //     +counter + ").Please Select Development Target Completion Date\n";
          // }

          /*if(this.getView().getModel("datamodel2").getData().FunctId==="")*/
          if (
            this.getView().getModel( "datamodel2" ).getData().FuncConst === ""
          ) {
            type = "E";
            counter = counter + 1;
            msg += +counter + ").Please Fill Functional Consultant\n";
          }
          if (
            this.getView().getModel( "datamodel2" ).getData().FuncConst.length > 0
          ) {
            var val = this.getView().getModel( "datamodel2" ).getData().FuncConst;
            var model = this.getView().getModel( "fuctUserModel" ).getData();

            var modeldata = model.filter( ( obj ) => {
              if ( obj.Name === val ) {
                return obj.Name;
              }
            } );
            if ( modeldata.length === 0 ) {
              type = "E";
              counter = counter + 1;
              msg +=
                +counter + ").Please Enter The Valid Functional Consultant\n";
            }
          }

          /* if(this.getView().getModel("datamodel2").getData().BusnValue===""){
                               type="E"
                                   counter = counter + 1;
                                   msg+=+counter+").Please Fill Buisness Value\n"
                                   } */
          /* if(this.getView().getModel("datamodel2").getData().BusnValDet===""){
                               type="E"
                                   counter = counter + 1;
                                   msg+=+counter+").Please Fill Buisness Value Details\n"
                                   } */
          /*if(this.getView().getModel("datamodel2").getData().TechId=="")*/
          if ( this.getView().getModel( "datamodel2" ).getData().TechPs === "" ) {
            type = "E";
            counter = counter + 1;
            msg += +counter + ").Please Fill Technical Person\n";
          }
          if (
            this.getView().getModel( "datamodel2" ).getData().TechPs.length > 0
          ) {
            var val = this.getView().getModel( "datamodel2" ).getData().TechPs;
            var model = this.getView().getModel( "techUserModel" ).getData();

            var modeldata = model.filter( ( obj ) => {
              if ( obj.Name === val ) {
                return obj.Name;
              }
            } );
            if ( modeldata.length === 0 ) {
              type = "E";
              counter = counter + 1;
              msg +=
                +counter + ").Please Enter The Valid Technical Consultant\n";
            }
          }

          if (
            this.getView().getModel( "datamodel2" ).getData().SysDetails === ""
          ) {
            type = "E";
            counter = counter + 1;
            msg += +counter + ").Please Select The System detail\n";
          }

          if ( this.getView().getModel( "datamodel2" ).getData().DevType === "" ) {
            type = "E";
            counter = counter + 1;
            msg += +counter + ").Please Fill RICEF Type\n";
          }
          if (
            this.getView().getModel( "datamodel2" ).getData().DevStatus === ""
          ) {
            type = "E";
            counter = counter + 1;
            msg += +counter + ").Please Fill RICEF Status\n";
          }
          if ( this.getView().getModel( "datamodel2" ).getData().PlannedStartingDate === "" ) {
            type = "E";
            counter = counter + 1;
            msg += +counter + ").Please Fill Planned Starting Date\n";
          }
          if ( this.getView().getModel( "datamodel2" ).getData().PlannedEndingDate === "" ) {
            type = "E";
            counter = counter + 1;
            msg += +counter + ").Please Fill Planned ending Date\n";
          }
          // if ( this.getView().getModel( "datamodel2" ).getData().ActualStartingDate === "" ) {
          //   type = "E";
          //   counter = counter + 1;
          //   msg += +counter + ").Please Fill Actual stating  Date\n";
          // }
          // if ( this.getView().getModel( "datamodel2" ).getData().ActualEndingDate === "" ) {
          //   type = "E";
          //   counter = counter + 1;
          //   msg += +counter + ").Please Fill Actual Ending  Date\n";
          // }
          // if ( this.getView().getModel( "datamodel2" ).getData().MDEfforts === "" ) {
          //   type = "E";
          //   counter = counter + 1;
          //   msg += +counter + ").Please Fill MDEfforts\n";
          // }

          if ( this.getView().getModel( "datamodel2" ).getData().Priority === "" ) {
            type = "E";
            counter = counter + 1;
            msg += +counter + ").Please Fill Priority\n";
          }
          if (
            this.getView().getModel( "datamodel2" ).getData().Complexity === ""
          ) {
            type = "E";
            counter = counter + 1;
            msg += +counter + ").Please Fill Complexity\n";
          }
          /* if(this.getView().getModel("datamodel2").getData().UtId==="")*/
          if ( this.getView().getModel( "datamodel2" ).getData().UtTester === "" ) {
            type = "E";
            counter = counter + 1;
            msg += +counter + ").Teams Section:Please Select FT By\n";
          }
          if (
            this.getView().getModel( "datamodel2" ).getData().UtTester.length > 0
          ) {
            var val = this.getView().getModel( "datamodel2" ).getData().UtTester;
            var model = this.getView().getModel( "utUserModel" ).getData();

            var modeldata = model.filter( ( obj ) => {
              if ( obj.Name === val ) {
                return obj.Name;
              }
            } );
            if ( modeldata.length === 0 ) {
              type = "E";
              counter = counter + 1;
              msg += +counter + ").Please Enter The Valid UT Person\n";
            }
          }

          /*if(this.getView().getModel("datamodel2").getData().UatId==="")*/
          // if (
          //   this.getView().getModel( "datamodel2" ).getData().UatTester === ""
          // ) {
          //   type = "E";
          //   counter = counter + 1;
          //   msg += +counter + ").Teams Section:Please Enter UAT Person\n";
          // }
          // if ( this.getView().getModel( "datamodel2" ).getData().UatMail === "" ) {
          //   type = "E";
          //   counter = counter + 1;
          //   msg += +counter + ").Teams Section:Please Enter UAT Person Email\n";
          // }
          // if ( this.getView().getModel( "datamodel2" ).getData().PlannedStartingDate === "" ) {
          //   type = "E";
          //   counter = counter + 1;
          //   msg += +counter + ").Teams Section:Please Enter UAT Person Email\n";
          // }

          // Added validation for wrong format of email
          // debugger;
          // var emailvdltn = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          // if (
          //   this.getView()
          //     .getModel( "datamodel2" )
          //     .getData()
          //     .UatMail.match( emailvdltn ) === null
          // ) {
          //   type = "E";
          //   counter = counter + 1;
          //   msg += +counter + ").Teams Section:Please Enter Valid Email\n";
          // }

          /*if(this.getView().getModel("datamodel2").getData().Remarks===""){
                               type="E"
                                   counter = counter + 1;
                                   msg+=+counter+".Teams Section:Please Fill Remarks \n"
                           }*/
          /* if(this.getView().byId("reqdate").getDateValue()>this.getView().byId("fsdate").getDateValue()){
                               type="E"
                                   counter = counter + 1;
                                   msg+=+counter+").Please Select FS Recieve Date Greater or Equal to Request Date \n"
                           }*/

          //***************************

          if ( type === "E" ) {
            // Shows all the Validations in popup
            sap.m.MessageBox.warning( msg );
          } else {
            var data = {
              // This is the Data or Payload we are passing to Backend
              Accept: this.getView().getModel( "datamodel2" ).getData().Accept,
               AddFlag:this.getView().getModel("datamodel2").getData().AddFlag,
              Aging: this.getView().getModel( "datamodel2" ).getData().Aging,
              AttachFlag: Att,
              AttachNewCount: this.getView().getModel( "datamodel2" ).getData().AttachNewCount,
              AttachOldCount: this.getView().getModel( "datamodel2" ).getData().AttachOldCount,
              BusnUnit: this.getView().getModel( "datamodel2" ).getData().BusnUnit,
             
              Cancel: this.getView().getModel( "datamodel2" ).getData().Cancel,
              ChangedAt: "",
              CloseFlag: this.getView().getModel( "datamodel2" ).getData().CloseFlag,
              Complexity: this.getView().getModel( "datamodel2" ).getData().Complexity,
              Cr: this.getView().getModel( "datamodel2" ).getData().Cr,
             // CrDate: this.formatDate(this.getView().getModel( "datamodel2" ).getData().CrDate),
              CrDone: this.getView().getModel( "datamodel2" ).getData().CrDone,
              CreatedBy: this.getView().getModel( "datamodel2" ).getData().CreatedBy,
              CrHide: this.getView().getModel( "datamodel2" ).getData().CrHide,
              CrTime: crTime,
              DeleteTc: this.getView().getModel( "datamodel2" ).getData().DeleteTc,
              Description: this.getView().getModel( "datamodel2" ).getData().Description,
              DevStatus: this.getView().getModel( "datamodel2" ).getData().DevStatus,
              DevType: this.getView().getModel( "datamodel2" ).getData().DevType,
              Enq: this.getView().getModel( "datamodel2" ).getData().Enq,
              Flag: para,
              FsDes: this.getView().getModel( "datamodel2" ).getData().FsDes,
              FsReceDate: this.getView().getModel( "datamodel2" ).getData().FsReceDate,
              FsTargetCom:this.getView().getModel("datamodel2").getData().FsTargetCom,
              FsTcCre:this.getView().getModel("datamodel2").getData().FsTcCre,
              DefectCount:this.getView().getModel( "datamodel2" ).getData().DefectCount,
              FsTcRef: this.getView().getModel( "datamodel2" ).getData().FsTcRef,
              FuncConst: this.getView().getModel( "datamodel2" ).getData() .FuncConst,
              FunctId: this.getView().getModel( "datamodel2" ).getData().FunctId,
              FuntFlag:this.getView().getModel( "datamodel2" ).getData().FuntFlag,
              Hold: this.getView().getModel( "datamodel2" ).getData().Hold,
             ModuleTc: this.getView().getModel( "datamodel2" ).getData().ModuleTc,
             Ncr: this.getView().getModel( "datamodel2" ).getData().Ncr,
             PrdFlag: this.getView().getModel( "datamodel2" ).getData().PrdFlag,
             Priority: this.getView().getModel( "datamodel2" ).getData().Priority,
              Remarks: this.getView().getModel( "datamodel2" ).getData().Remarks,
              RemFlag: this.getView().getModel( "datamodel2" ).getData().RemFlag,
              Save1: this.getView().getModel( "datamodel2" ).getData().Save1,
              Submit: this.getView().getModel( "datamodel2" ).getData().Submit,
              SysDetails: this.getView().getModel( "datamodel2" ).getData().SysDetails,
              TcCreate:this.getView().getModel("datamodel2").getData().TcCreate,
             TcTime:this.getView().getModel("datamodel2").getData().TcTime,
              TcType: this.getView().getModel( "datamodel2" ).getData().TcType,
              TechFlag:this.getView().getModel( "datamodel2" ).getData().TechFlag,
               TechId: this.getView().getModel( "datamodel2" ).getData().TechId,
               TechPs: this.getView().getModel( "datamodel2" ).getData().TechPs,
               TicketBucket:"",
              RICEF_ID: this.getView().byId("ricefID").getValue(),
              TicketStatus: this.getView().getModel( "datamodel2" ).getData().TicketStatus,
              Uat: this.getView().getModel( "datamodel2" ).getData().Uat,
              UatId: this.getView().getModel( "datamodel2" ).getData().UatTester,
              UatMail: this.getView().getModel( "datamodel2" ).getData().UatMail,
              UatTester: this.getView().getModel( "datamodel2" ).getData().UatTester,
              UpdateAttach: this.getView().getModel( "datamodel2" ).getData().UpdateAttach,
              UpdateFlag: this.getView().getModel( "datamodel2" ).getData().UpdateFlag,
              Ut: this.getView().getModel( "datamodel2" ).getData().Ut,
              UtId: this.getView().getModel( "datamodel2" ).getData().UtId,
              UtTester: this.getView().getModel( "datamodel2" ).getData().UtTester,
              Zsave: this.getView().getModel( "datamodel2" ).getData().Zsave,
              PlannedStartingDate: this.getView().getModel( "datamodel2" ).getData().PlannedStartingDate,
              PlannedEndingDate:this.getView().getModel( "datamodel2" ).getData().PlannedEndingDate,
              ActualStartingDate:this.getView().getModel( "datamodel2" ).getData().ActualStartingDate,
              ActualEndingDate: this.getView().getModel( "datamodel2" ).getData().ActualEndingDate,
              MDEfforts: this.getView().getModel( "datamodel2" ).getData().MDEfforts,
              Unhold:this.getView().getModel( "datamodel2" ).getData().Unhold,
              Value:this.getView().getModel( "datamodel2" ).getData().Value,
              Datestamp:this.getView().getModel( "dashboard" ).getData().Datestamp,
              ProjectName:this.getView().byId("projectInputId").getValue(),
              OtherType:this.getView().byId("otherRicefInput").getValue(),
              /*UatId:this.getView().getModel("datamodel2").getData().UatId,*/
             /*UatTester: this.getView().getModel("datamodel2").getData().UatId,
                  UatId:this.getView().getModel("datamodel2").getData().UatTester,*/
            
              /*UtTester: this.getView().getModel("datamodel2").getData().UtId,*/
            /*ReqDate: reqdate,*/
              /*Requester: this.getView().getModel("datamodel2").getData().Requester,*/
              /*ReqId:this.getView().getModel("datamodel2").getData().ReqId,*/
           
              /*UtId:this.getView().getModel("datamodel2").getData().UtTester,*/
              /*BusnValDet: this.getView().getModel("datamodel2").getData().BusnValDet,
                  BusnValue:this.getView().getModel("datamodel2").getData().BusnValue,*/
              /*CodeRevDate: crdate,*/
           // Cancel: this.getView().getModel( "datamodel2" ).getData().Cancel,
             /*AddFlag:this.getView().getModel("datamodel2").getData().AddFlag,*/
            // DevTargetDate: devTargetComplDate,
        };

            return this.TransferdatatoBackend( data ); // This function passes the data to view2 controller
          }
        },
      }
    );
  }
);
