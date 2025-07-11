    // import jCaptcha from 'jCaptcha';
    const maxNumberOfTries = 5;
    const jeeCap = document.querySelector(".jeeCap");
    const btnSubmit = document.querySelector(".btnSubmit");
    let myCaptcha = new jCaptcha({
        el: '.jCaptcha',
        canvasClass: 'jCaptchaCanvas',
        canvasStyle: {
            // required properties for captcha stylings:
            width: 100,
            height: 15,
            textBaseline: 'top',
            font: '15px Arial',
            textAlign: 'left',
            fillStyle: '#000'
        },
        // set callback function for success and error messages:
        callback: ( response, $captchaInputElement, numberOfTries ) => {
            if ( response == 'success' ) {
                // success handle, e.g. continue with form submit
            console.log("test success");
            jeeCap.classList.remove('error');
            jeeCap.classList.add('success');
            jeeCap.placeholder = 'Submit successful!';
                    // $('#contact-form')
                
            var formData = new FormData(document.getElementById("contact-form"));
            formData.append('service_id', 'service_z2bftac');
            formData.append('template_id', 'template_eiwqkcv');
            formData.append('user_id', '4VscKHMrzjzUpQA6A');

            $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
                type: 'POST',
                data: formData,
                contentType: false, // auto-detection
                processData: false // no need to parse formData to string
            }).done(function () {
                console.log(formData);
                
                alert('Your mail is sent!');
            }).fail(function (error) {
                alert('Oops... ' + JSON.stringify(error));
            });


            }
            if ( response == 'error' ) {
                // error handle, e.g. add error class to captcha input
                    console.log("test error");
                    jeeCap.classList.remove('success');
                    jeeCap.classList.add('error');
                    jeeCap.placeholder = 'Please try again!';
                if (maxNumberOfTries === numberOfTries) {

                // maximum attempts reached, so do something
                // e.g. disable the form:
                document.querySelector("form").removeEventListener("submit", formSubmit);
                btnSubmit.classList.add("disabled");
                btnSubmit.placeholder = "Maximum attempts reached!";
                btnSubmit.setAttribute("disabled", "true");
                document.querySelector("button").setAttribute("disabled", "true");

                return;
                }
            }
        }
    });
   function formSubmit(e) {
        e.preventDefault();

        // myCaptcha validate
        myCaptcha.validate();
    };
    document.querySelector("form").addEventListener("submit", formSubmit);