app.factory('Utils',['$q', function($q) {
        var self = this;

        self.showMessage = function(message, optHideTime) {
            if(optHideTime != undefined && optHideTime > 100) {
                // error message or notification (no spinner)
                $ionicLoading.show({
                    template: message
                });
                $timeout(function(){
                    $ionicLoading.hide();
                }, optHideTime)
            } else {
                // loading (spinner)
                $ionicLoading.show({
                    template: message + '<br><br>' + '<ion-spinner class="spinner-modal"></ion-spinner>'
                });

                $timeout(function(){    // close if it takes longer than 10 seconds
                    $ionicLoading.hide();
                    //self.showMessage("Timed out", 2000);
                }, 20000)
            }
        };
        self.arrayValuesAndKeys = function(targetObject) {
            return Object.keys(targetObject).map(
                function (key) {
                    return {
                        key: key,
                        value: targetObject[key]
                    }
                }
            );
        };

        self.arrayValuesAndKeysProducts = function(targetObject) {
            return Object.keys(targetObject).map(
                function (key) {
                    if(targetObject[key] != null) {
                        return {
                            key: key,
                            value: targetObject[key].meta,
                            index: targetObject[key].index
                        }
                    }
                }
            );
        };

    self.arrayValues = function(targetObject) {
        return Object.keys(targetObject).map(
            function (key) {
                return {
                    key: key,
                    value: targetObject[key]
                }
            }
        );
    };
        self.arrayKeys = function(targetObject) {
            return Object.keys(targetObject).map(
                function (key) {
                    return key;
                }
            );
        };

        self.randomNumber = function() {
            var d = new Date();
            return d.getTime();
        };

        // resize base64 strings based on their target w and h
        // use an offscreen canvas for enhanced rendering
        self.resizeImage = function(canvasName, base64, filetype, targetWidth, targetHeight) {

            var qResize = $q.defer();
            var img = new Image;
            if(filetype!="image/gif" )
                img.onload = resizeImage;
            img.src = base64ToDataUri(base64);
            if(filetype=="image/gif" ) {
                qResize.resolve(img.src);
            }
            function resizeImage() {
                imageToDataUri(this, targetWidth, targetHeight);
            }

            function base64ToDataUri(base64) {
                if(filetype=="image/gif" ){
                    return 'data:image/gif;base64,' + base64;
                }
                else{
                    return 'data:image/jpeg;base64,' + base64;
                    console.log(base64);
                }

            }

            function imageToDataUri(img, targetWidth, targetHeight) {

                var canvas = document.getElementById(canvasName);
                var ctx = canvas.getContext('2d');

                //var dd = scaleDimensions(img.width, img.height, targetWidth, targetHeight);

                canvas.width = img.width = targetWidth;
                canvas.height = img.height = targetHeight;

                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
                console.log(img.height);

                if(canvasName == "canvas0") { // "icon"
                    qResize.resolve(canvas.toDataURL());
                } else {
                    /*canvas.toBlob(function(blob){
                        qResize.resolve(blob);
                        console.log(blob);
                    });*/
                    qResize.resolve(canvas.toDataURL("image/jpeg", 0.9));
                }
            }

            function scaleDimensions(imgWidth, imgHeight, targetWidth, targetHeight) {
                var scaleFactor = 1;
                var dd = {iw: imgWidth, ih: imgHeight};
                if (imgWidth < targetWidth && imgHeight < targetHeight) {
                    scaleFactor = 1; // do not scale
                } else {
                    if (imgWidth > imgHeight){
                        scaleFactor = targetWidth/imgWidth;
                    } else {
                        scaleFactor = targetHeight/imgHeight;
                    }
                }
                dd["iw"] = Math.floor(imgWidth*scaleFactor);
                dd["ih"] = Math.floor(imgHeight*scaleFactor);

                return dd;
            }

            return qResize.promise;
        };

        self.capitalizeFirstLetter = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        self.formatTimestamp = function(timestamp) {
            var d = new Date();
            var currentyear = d.getFullYear();
            var date = new Date(timestamp);
            var hours="";
            var minutes="";
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            if(date.getHours()<10)
                hours= '0'+date.getHours();
            else
                hours= date.getHours();
            if(date.getMinutes()<10)
                minutes= '0'+date.getMinutes();
            else
                minutes= date.getMinutes();
            return date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();
        };
    self.formatTimestampv2 = function(timestamp) {
        var d = new Date();
        var currentyear = d.getFullYear();
        var date = new Date(timestamp);
        var hours="";
        var minutes="";
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        if(date.getHours()<10)
            hours= '0'+date.getHours();
        else
            hours= date.getHours();
        if(date.getMinutes()<10)
            minutes= '0'+date.getMinutes();
        else
            minutes= date.getMinutes();
        return date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear()+' at ' + hours + ' : '+minutes;
    };
    self.getTime = function(timestamp) {
        var d = new Date();
        var currentyear = d.getFullYear();
        var date = new Date(timestamp);
        var hours="";
        var minutes="";
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        if(date.getHours()<10)
            hours= '0'+date.getHours();
        else
            hours= date.getHours();
        if(date.getMinutes()<10)
            minutes= '0'+date.getMinutes();
        else
            minutes= date.getMinutes();

        return hours+"h"+minutes;
    };


        self.getFormattedDateNextMonth = function() {
            var date = new Date();
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1); // note: returns day start of next month (00:00)
            lastDay = lastDay.getTime();
            return self.formatTimestamp(lastDay);
        };


        self.returnUrlSlug = function(title) {
            return title.replace(/\W+/g, '-').toLowerCase();
        };

        self.alphaNumeric = function(input){
            if(input != undefined && input != null) {
                return input.replace(/[^a-z0-9]/gi,'_').toLowerCase().trim();
            } else {
                return "nothing";
            }
        };

        self.alphaNumericWide = function(input){
            if(input != undefined && input != null) {
                return input.replace(/[^a-z0-9]/gi,' ').toLowerCase().trim(' ');
            } else {
                return "nothing";
            }
        };

        return self;
    }])