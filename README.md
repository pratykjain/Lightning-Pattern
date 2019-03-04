# Lightning-Pattern
Pattern consist methods for : 
- Server Calls
- LDS commits
- Notify Lib
- Toast message
- Control Spinner


Using this Pattern in your component:

1. Added the Base Lightning component to your library.
2. Extend you child component with Base component. Like this : <aura:component extends="c:Base" >
3. Calling the Base method: 

In method:

var paramsObj = {
    // "args1" :  "param1",
    // "args2" :  "param2",
    // ..
    // "argsn" :  "param n",
    };
    
// Calling Apex Class method using Base component Helper method
this.callApexFunction( component, "c.apexControllerMethodName", paramsObj )
.then( result => {
   // Success actions
})
.catch( error => {
  // Failure actions
});
