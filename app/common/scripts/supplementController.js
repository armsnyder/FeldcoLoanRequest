angular
    .module('common')
    .controller('SupplementController', function($scope, supersonic, BankRequestService) {
        function createApplicant(){
            obj = new Object();
            obj.initial = '';
            obj.signature ='';
            obj.signDate = '';
            obj.drivingLicense = '';
            obj.expireDate = '';
            supersonic.logger.log("inside!");
            return obj;
        }

        $scope.applicant = createApplicant();
        $scope.coApplicant = createApplicant();
        $scope.supplementContent1 = "In addition to completing the application from other credit providers, you authorize Feldco Factory Direct, LLC('Feldco') to furnish your application information to other possible financing sources so they may consider extending credit to you for this transaction and you authorize such other sources to make appropriate inquiries about you (including obtaining your consumer report from consumer reporting agencies) in standards, Feldco may consider financeing your purchase by accepting from you a closed-end RETAIL INSTALLMENT CONTRACT with substantially equal monthly payments, including simple interest on the unpaid balance. You understand that the terms and condisions of credit which may be extended by other lenders, including Feldco, may differ from the terms and conditions of the credit for which you originally applied. ";
        $scope.supplementContent2 = "You are not obligated to accept an offer of credit from any creditor. ";
        $scope.$apply();

        var wrapper = document.getElementById("signature-pad"),
        canvas = wrapper.querySelector("canvas"),
        signaturePad;

        var wrapper = document.getElementById("signature-pad_2"),
        canvas_2 = wrapper.querySelector("canvas"),
        signaturePad;

        var signaturePad = new SignaturePad(canvas);
        var signaturePad_2 = new SignaturePad(canvas_2);

        $scope.submit = function(){
            supersonic.logger.log("inside!");
            supplementInfo = new Object();
            supplementInfo.supplementContent1 = $scope.supplementContent1;
            supplementInfo.supplementContent2 = $scope.supplementContent2;
            supplementInfo.applicant = $scope.applicant;
            supplementInfo.coApplicant = $scope.coApplicant;
            var dataURL = signaturePad.toDataURL().replace('data:image/png;base64,', '');
            supplementInfo.applicant.signature = JSON.stringify(
                {
                    value: dataURL
                }
            );
            var dataURL_2 = signaturePad_2.toDataURL().replace('data:image/png;base64,', '');
            supplementInfo.coApplicant.signature = JSON.stringify(
                {
                    value: dataURL_2
                }
            );

            BankRequestService.sendPDF(supplementInfo)
            .success(function(response) {
                if (response.statusCode == 200) {
                    view = new supersonic.ui.View("common#applicationForm");
                    view.start("applicationForm").then( function(startedView) {
                      supersonic.ui.layers.replace(startedView);
                    });
                    supersonic.ui.layers.replace("applicationForm");

                } else {
                    supersonic.logger.log('Something Wrong!');
                    // TODO: Handle Error
                }
            })
            .error(function(data, status) {
                supersonic.logger.log('Something Wrong: '+status+' '+data);
                // TODO: Handle Error
            });

            supersonic.logger.log(supplementInfo);

            // view = new supersonic.ui.View("common#applicationForm");
            // view.start("applicationForm").then( function(startedView) {
            //   supersonic.ui.layers.replace(startedView);
            // });

            // supersonic.ui.layers.replace("applicationForm");
            //supersonic.ui.layers.push(view);
        };

        $scope.Clear = function() {
            signaturePad.clear();
            signaturePad_2.clear();
        };

        // $scope.Save = function() {
        //     if (signaturePad.isEmpty() && signaturePad_2.isEmpty()) {
        //         alert("Please provide signature first.");
        //     } else {
             //window.open(signaturePad.toDataURL());
                // require "base64"
                // data_uri = "data:image/png;base64,iVBORw0K..."
                // encoded_image = data_uri.split(",")[1]
                // decoded_image = Base64.decode64(encoded_image)
                // File.open("signature.png", "wb") { |f| f.write(decoded_image) }

                //var dataURL = canvas.toDataURL();
                //var dataURL_2 = canvas_2.toDataURL();

                // set canvasImg image src to dataURL
                // so it can be saved as an image
                //document.getElementById('canvasImg').src = dataURL;
                //document.getElementById('canvasImg_2').src = dataURL_2;

                // alert(data);

            // }
        // };
});

