
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
        var btnNext = "#ContentPlaceHolder1_btnConvert";
        var btnNext1 = "#ContentPlaceHolder1_Button1";

        //if upload document success, display waiting for OCR step (step 2)
        //else display upload document step (step 1)

        function schfile() {
            document.getElementById("ContentPlaceHolder1_inputFileId").click();
        }

        function checkFileName() {
            // Has user selected file to upload?
            var filename = $(inputFileElementID).val();
            if (filename == '') {
                alert(messageForNotChooseFile);
                return false;
            } else {
                if (checkFileUploadExtensiton(filename)) {
                    document.getElementById("file_sub").value = document.getElementById("ContentPlaceHolder1_inputFileId").value;
                    //$(neatUploadProgressContainerID).css("display", "block");

                    return true;
                }
            }
            return false;
        }

        var validExtensions = new Array();
        validExtensions[0] = 'tif';
        validExtensions[1] = 'jpeg';
        validExtensions[2] = 'jp2';
        validExtensions[3] = 'djvu';
        validExtensions[4] = 'bmp';
        validExtensions[5] = 'png';
        validExtensions[6] = 'dcx';
        validExtensions[7] = 'pcx';
        validExtensions[8] = 'jpg';
        validExtensions[9] = 'gif';
        validExtensions[10] = 'jb2';
        validExtensions[11] = 'jpc';
        validExtensions[12] = 'jfif';
        validExtensions[13] = 'tiff';
        validExtensions[14] = 'djv';
        validExtensions[15] = 'pdf';

        function checkFileUploadExtensiton(filename) {
            var ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
            if (ext == '') return false;
            for (var i = 0; i < validExtensions.length; i++) {
                if (ext == validExtensions[i]) {
                    return true;
                }
            }

            alert(messageForInvalidFileType);
            return false;
        }

        function uploading() {
            //$(neatUploadProgressContainerID).css("display", "block");
        }

        function setFileSelectedState() {

            var filename = $(inputFileElementID).val();
            if (filename == "" || filename == null) {
                alert(messageForNotChooseFile);
                $(btnNext).css("display", "none");
                $(btnNext1).css("display", "inline-block");
                return false;
            } else {
                if (checkFileName() == false) {
                    $(btnNext1).css("display", "inline-block");
                    $(btnNext).css("display", "none");
                    return false;
                }
                $(btnNext1).css("display", "none");
                $(btnNext).css("display", "inline-block");
                return true;
            }
        }
