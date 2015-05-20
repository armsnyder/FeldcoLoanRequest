angular
	.module('common')
	.controller('SupplementController', function ($scope, supersonic) {
		//$scope.pdfUrl = '/pdf/homework.pdf';
        $scope.supplementContent1 = "In addition to completing the application from other credit providers, you authorize Feldco Factory Direct, LLC('Feldco') to furnish your application information to other possible financing sources so they may consider extending credit to you for this transaction and you authorize such other sources to make appropriate inquiries about you (including obtaining your consumer report from consumer reporting agencies) in standards, Feldco may consider financeing your purchase by accepting from you a closed-end RETAIL INSTALLMENT CONTRACT with substantially equal monthly payments, including simple interest on the unpaid balance. You understand that the terms and condisions of credit which may be extended by other lenders, including Feldco, may differ from the terms and conditions of the credit for which you originally applied. ";
        $scope.supplementContent2 = "You are not obligated to accept an offer of credit from any creditor. ";
        $scope.$apply();
});
