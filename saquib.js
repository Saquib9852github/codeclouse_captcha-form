// generate a random number between min and max

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // generate a random captcha code
  function generateCaptcha() {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var length = 5;
    var captcha = "";
    for (var i = 0; i < length; i++) {
      captcha += chars[getRandomNumber(0, chars.length - 1)];
    }
    return captcha;
  }
  
  // update the captcha code in the form
  function updateCaptcha() {
    var captcha = generateCaptcha();
    document.getElementById("captcha").innerHTML = captcha;
  }
  
  // initialize the captcha code when the page loads
  updateCaptcha();
  
  // handle form submission
  document.getElementById("contact-form").addEventListener("submit", function(event) {
    // prevent the form from submitting normally
    event.preventDefault();
  
    // validate the captcha input
    var captcha = document.getElementById("captcha").innerHTML;
    var captchaInput = document.getElementById("captcha-input").value;
    if(captcha == captchaInput)
    alert("Thankyou, your captcha code is correct")
     else if (captcha !== captchaInput) {
      alert("The captcha code is incorrect!");
      return;
    }
  
    // submit the form
    var form = document.getElementById("contact-form");
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        alert("Thank you for your message!");
        form.reset();
        updateCaptcha();
      }
    };
    xhr.send(new FormData(form));
  });
  