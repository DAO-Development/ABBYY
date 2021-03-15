/*        var defaultMessage = "Type your email address here";  //"Type your email address here";
        var messageForInvalidEmailAddress = "Please insert valid email address to receive your converted document."; // Please insert valid email address to receive your converted document.";
        var messageForNotChooseFile = "Select the image file you want to convert!";
        var messageForInvalidFileType = "Uploaded file type is not supported!";
        var messageForLimitedSubmitCount = "Using ABBYY free online OCR service you can only convert up to 3 pages in one file and only 10 files a day. You can also upload limit recovery to the same IP for seamless services. Thank you for using ABBYY free online OCR service.";
        var titleForSelectFile = "Find the image file you want to convert.";
        var titleForSelectedFile = "Selected file";
*/
        var defaultMessage = "Default Nessage";  //"Type your email address here";
        var messageForInvalidEmailAddress = "抱歉!验证你的邮箱地址时出现了问题 请检查是否有错误"; // Please insert valid email address to receive your converted document.";
        var messageForNotChooseFile = "File not choosed";
        var messageForInvalidFileType = "出了问题。 请检查上传文件的类型。 我们支持PDF，JPG，PNG，BMP，TIF文件";
        var messageForLimitedSubmitCount = "抱歉，今天你的文件限制已经结束。 明天回来再转换10个文件";
        var titleForSelectFile = "";
        var titleForSelectedFile = "";

        var emailElementID = "#ContentPlaceHolder1_email";
        var inputFileElementID = "#ContentPlaceHolder1_inputFileId";
        var fakeFileElementID = "#file_browse_wrapper";
        var neatUploadProgressContainerID = "#neatUploadProgressContainer";
        var lastUploadedFileID = "#ContentPlaceHolder1_CurrentUploadedFileID";
        var btnNext2 = "#ContentPlaceHolder1_btnConvert2";
        var btnNext12 = "#ContentPlaceHolder1_Button2";

        //tracking document state every second until the result email is sent
        /*$(function () {
            //trackingDocumentState();
            NextValidateEMail($(emailElementID).val());
        });*/
        function trackingDocumentState() {
            $.ajax({
                type: "POST",
                url: '/ocr_02.aspx/getStageOfConvertingDocument',
                data: "{documentId:'" + $(lastUploadedFileID).val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    var documentState = data.d;
                    if (documentState.indexOf('SendEmail') != -1) {
                        //PopupFacebook();
                    } else {
                        //call back in 1 second = 1000 minisecond.
                        setTimeout("trackingDocumentState()", 1000);
                    }
                }, error: function (request, status, error) {
                    //통신 에러 발생시 처리
                    alert("code : " + request.status + "\r\nmessage : " + request.reponseText);
                }
            });
        }

        function clearMessage(element) {
            //clear if current value is default message
            var email = $(element).val();

            if ($(element).val() == defaultMessage) {
                $(element).val("");
            }
        }

        function NextValidateEMail(val) {
            if (!validateEmail(val)) {
                $(btnNext12).css("display", "inline-block");
                $(btnNext2).css("display", "none");
                alert(messageForInvalidEmailAddress);
            } else {
                $(btnNext2).css("display", "inline-block");
                $(btnNext12).css("display", "none");
            }
        }

        function NextValidateEMailWithoutAlert(val) {
            if (!validateEmail(val)) {
                $(btnNext12).css("display", "inline-block");
                $(btnNext2).css("display", "none");
                console.log("No");
            } else {
                $(btnNext2).css("display", "inline-block");
                $(btnNext12).css("display", "none");
                console.log("Yep");
            }
        }

        function validateBeforeSubmit() {
            // Is the email valid?
            var email = $(emailElementID).val();
            if (!validateEmail(email)) {
                alert(messageForInvalidEmailAddress);
                return;
            }
            // Check for max submit count for a day
            PageMethods.CheckLimitForADay(email, OnSucceeded, OnFailed, OnFailed2);

        }

        function OnSucceeded(res) {
            if (res == false) {
                alert(messageForLimitedSubmitCount);
                //alert("test");
            }
            else {
                //$(neatUploadProgressContainerID).css("display", "block");
                recordActionLink("Service", "Recognize");
                __doPostBack('ctl00$ContentPlaceHolder1$execConvert','')
            }
        }

        function OnFailed(error) {
            //alert("The operation is canceled due to an error.");
            //return;
            if (res == false) {
                alert(messageForLimitedSubmitCount);
            }
            else {
                $(neatUploadProgressContainerID).css("display", "block");
                recordActionLink("Service", "Recognize");
                __doPostBack('ctl00$ContentPlaceHolder1$execConvert','')
            }

        }

        function OnFailed2(error) {
            //alert("The operation is canceled due to an error.");
            //return;
            alert("test");
            if (res == false) {
                alert(messageForLimitedSubmitCount);
            }
            else {
                $(neatUploadProgressContainerID).css("display", "block");
                recordActionLink("Service", "Recognize");
                __doPostBack('ctl00$ContentPlaceHolder1$execConvert','')
            }

        }

        function validateEmail(email) {
            //var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g ;
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+(a[defgilmnoqrstuwz]|b[abdefghijmnorstvwyz]|c[acfghiklmnorsuvxyz]|d[ejkmoz]e[ceghst]|f[ijkmor]|g[abdefhilmnpqrtuwy]|h[kmnrtu]|i[delnoqrst]j[mop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdghklmnopqrstuvwxyz]|n[acefgiloprtuz]|o[m]|p[aefghklmnrtwy]|q[a]|r[eouw]|s[abcdeghijklmnortuvyz]|t[cdfghjkmnoprtvwz]|u[agkmsyz]|v[aceginu]|w[fs]|y[eu]|z[amrw]|aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel)))$/gi;

            return re.test(email);
        }
