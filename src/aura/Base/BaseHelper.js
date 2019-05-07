({
    /**
     * @description This method is generic for all apex methods
     * @date        10-01-2018
     * @author      makepositive ( Pratyk Jain )
     */
    callApexFunction: function( component, functionName, paramsObj ) {
        var that = this;
        var promise = new Promise( function( resolve, reject ) {
            var action = component.get( functionName );
            if ( paramsObj !== undefined ) {
                action.setParams( paramsObj );
            }
            action.setCallback( that, function( response ) {
                var state = response.getState();
                if ( component.isValid() && state === 'SUCCESS' ) {
                    resolve( response.getReturnValue() );
                } else {
                    reject( response.getError()[0].message );
                }
            });
            $A.enqueueAction( action );
        });
        return promise;
    },

    /**
     * @description This method is to start spinner
     * @date        10-01-2018
     * @author      makepositive ( Pratyk Jain )
     */
    showSpinner : function(component) {
        component.set( "v.showLoader", true );
    },

    /**
     * @description This method is to stop spinner
     * @date        10-01-2018
     * @author      makepositive ( Pratyk Jain )
     */
    hideSpinner : function(component) {
        component.set( "v.showLoader", false );
    },

    /**
     * @description This method is to show toast
     * @date        10-01-2018
     * @author      makepositive ( Pratyk Jain )
     */
    showToast : function( component, type, header, message ) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            mode 	: 'dismissible',
            message : message,
            title 	: header,
            type 	: type
        });
        toastEvent.fire();
    },

    /**
     * @description This method saves record accessed via Lightnig Data Service
     * @date        10-01-2018
     * @author      makepositive ( Pratyk Jain )
     */
    saveRecordLDS : function( component, auraId ){
        var promise = new Promise( function( resolve, reject ) {
            component.find( auraId ).saveRecord( function( saveResult ) {
                if ( saveResult.state === "SUCCESS" || saveResult.state === "DRAFT" ) {
                    resolve( saveResult.state );
                }
                else {
                    reject( saveResult.error );
                }
            });
        });
        return promise;
    },
    
    /**
     * @description This method delete record accessed via Lightnig Data Service
     * @date        10-01-2018
     * @author      makepositive ( Pratyk Jain )
     */
    deleteRecordLDS : function( component, auraId ){
        var promise = new Promise( function( resolve, reject ) {
            component.find( auraId ).deleteRecord( function( deleteRecord ) {
                if ( deleteRecord.state === "SUCCESS" || deleteRecord.state === "DRAFT" ) {
                    resolve( deleteRecord.state );
                }
                else {
                    reject( deleteRecord.error );
                }
            });
        });
        return promise;
    },
    
    /**
     * @description This method is used to show notification when we don't display toast on component screen.
     * @date        15-02-2018
     * @author      makepositive ( Pratyk Jain )
     */
    showNotice : function(component, type, header, message) {
        // NOTE: Add <lightning:notificationsLibrary aura:id= "notifLib"/> on child component
        component.find('notifLib').showNotice({
            "variant" 	: type,
            "header"  	: header,
            "message" 	: message,
            "mode" 		: "dismissable"
        });
    },
    
    redirectToUrl : function( url ){
        self.location = url;
    },
    
    navigateToSobject : function( component, objectName, pageType, listViewName ){
        var navService 	  = component.find("navService");
        var pageReference = this.getPageReference( objectName, pageType, listViewName ); 
        navService.navigate( pageReference ); 
    },
    
    navigateToSobjects : function( component, objectName, pageType ){
        this.navigateToSobject( component, objectName, pageType, '' );
    },
    
    getPageReference : function( objectName, pageType, listViewName ){
        let pageRef = {
            type : 'standard__objectPage',
            attributes : {
                objectApiName 	: objectName,
                actionName 		: pageType
            }
        };
        
        if( pageRef.actionName == 'list' ){
            pageRef.state.filterName = listViewName;
        }
        
        return pageRef;
    },
    
    
    dataTableFieldsGenerator : function( listOfQueryParam ){
        let dataTableColumns = [];
        for( var i = 0; i < listOfQueryParam.length; i++ ){
            dataTableColumns = dataTableColumns.concat( { "label" : listOfQueryParam[i][0], "fieldName" : listOfQueryParam[i][1]
                                                         , "type" : listOfQueryParam[i][2], "editable"  : listOfQueryParam[i][3] } );
        }
        return dataTableColumns; 
    },

})
