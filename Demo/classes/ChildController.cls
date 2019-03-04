public with sharing class ChildController {
	
	@AuraEnabled
	public static void apexControllerMethodName( String param1 ){
		try{
			insert new Account( Name = param1 );
		} catch( Exception ex ){
			throw new AuraHandledException( ex.getMessage() );
		}
	}
	
}