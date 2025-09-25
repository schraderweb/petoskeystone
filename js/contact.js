    // import jCaptcha from 'jCaptcha';
    const timex = document.getElementById('timex').value = new Date();
    
    const maxNumberOfTries = 5;
    const jeeCap = document.querySelector(".jeeCap");
    const btnSubmit = document.querySelector(".btnSubmit");
    let myCaptcha = new jCaptcha({
        el: '.jCaptcha',
        canvasClass: 'jCaptchaCanvas',
        requiredValue: "",
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
                contentType: false, 
                processData: false 
            }).done(function () {
                document.querySelector(".popax").classList.remove('hidden');
                setTimeout(() => {
                document.querySelector(".modalx").classList.add("hidden");
                }, "2000");
            }).fail(function (error) {
                alert('Oops... ' + JSON.stringify(error));
                document.querySelector(".popax").classList.add('hidden');
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
        const checkboxes = document.querySelectorAll('.didfound input[type="checkbox"]');
        
        let isChecked = false;
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                isChecked = true;
                break;
            }
        }
        let isWrokingChecked = false;
        const workingcheckboxes = document.querySelectorAll('.working input[type="radio"]');
        for (let i = 0; i < workingcheckboxes.length; i++) {
            if (workingcheckboxes[i].checked) {
                isWrokingChecked = true;
                break;
            }
        }
        let isPlanningChecked = false;
        const planningcheckboxes = document.querySelectorAll('.planning input[type="radio"]');
        for (let i = 0; i < planningcheckboxes.length; i++) {
            if (planningcheckboxes[i].checked) {
                isPlanningChecked = true;
                break;
            }
        }

        if (!isChecked || !isWrokingChecked || !isPlanningChecked) {
            
            // alert('Please select at least one option : How did you find our website?'); // Display an error message
            document.getElementById('allErrors').scrollIntoView();
            document.querySelector('.all-errors').classList.remove('hidden');
        }else{
            myCaptcha.validate();
        }
        // myCaptcha validate
        
    };
    document.querySelector("form").addEventListener("submit", formSubmit);