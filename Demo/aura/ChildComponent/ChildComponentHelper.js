({
	callHelperMethod : function( component ){
	     // Assume that Apex method has take 1 argument called param1.
		var paramsObj = {
			"param1" : "testargs1"
		};
	      // Calling Apex Class method using Base component Helper method
		this.callApexFunction( component, "c.apexControllerMethodName", paramsObj )
	      .then( result => {
	           // Success actions
	           console.log( 'Account created successfully' );
	      })
	      .catch( error => {
	          // Failure actions
	          console.error( '[FAILURE] : ' + error );
	       });
	}
})