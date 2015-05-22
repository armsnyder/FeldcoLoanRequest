angular
	.module('common')
	.controller('SupplementController', function ($scope, supersonic) {
        $scope.supplementContent1 = "In addition to completing the application from other credit providers, you authorize Feldco Factory Direct, LLC('Feldco') to furnish your application information to other possible financing sources so they may consider extending credit to you for this transaction and you authorize such other sources to make appropriate inquiries about you (including obtaining your consumer report from consumer reporting agencies) in standards, Feldco may consider financeing your purchase by accepting from you a closed-end RETAIL INSTALLMENT CONTRACT with substantially equal monthly payments, including simple interest on the unpaid balance. You understand that the terms and condisions of credit which may be extended by other lenders, including Feldco, may differ from the terms and conditions of the credit for which you originally applied. ";
        $scope.supplementContent2 = "You are not obligated to accept an offer of credit from any creditor. ";
        $scope.$apply();
        $scope.submit = function(){
            view = new supersonic.ui.View("common#applicationForm");
            view.start("applicationForm").then( function(startedView) {
              supersonic.ui.layers.replace(startedView);
            });

            supersonic.ui.layers.replace("applicationForm");
            //supersonic.ui.layers.push(view);
        }


				var wrapper = document.getElementById("signature-pad"),
		    canvas = wrapper.querySelector("canvas"),
		    signaturePad;

				var wrapper = document.getElementById("signature-pad_2"),
		    canvas_2 = wrapper.querySelector("canvas"),
		    signaturePad;

				signaturePad = new SignaturePad(canvas);
				signaturePad_2 = new SignaturePad(canvas_2);


				$scope.Clear = function() {
				    signaturePad.clear();
						signaturePad_2.clear();
				};

				$scope.Save = function() {
				    if (signaturePad.isEmpty() && signaturePad_2.isEmpty()) {
				        alert("Please provide signature first.");
				    } else {
				        //window.open(signaturePad.toDataURL());
								// require "base64"
								// data_uri = "data:image/png;base64,iVBORw0K..."
								// encoded_image = data_uri.split(",")[1]
								// decoded_image = Base64.decode64(encoded_image)
								// File.open("signature.png", "wb") { |f| f.write(decoded_image) }

								var dataURL = canvas.toDataURL();
								var dataURL_2 = canvas_2.toDataURL();

								// set canvasImg image src to dataURL
								// so it can be saved as an image
								document.getElementById('canvasImg').src = dataURL;
								document.getElementById('canvasImg_2').src = dataURL_2;

								// dataURL = signaturePad.toDataURL().replace('data:image/png;base64,', '');
								// var data = JSON.stringify(
								// 									{
								// 											value: dataURL
								// 									});
								// alert(data);

				    }
				};
});
