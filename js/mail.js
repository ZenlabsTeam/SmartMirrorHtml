//http://smtpjs.com/
function sendMail() {
    Email.send("zenlabs@zensar.com",
        "anand.yashwanth@zensar.com",
        "This is a subject",
        "this is the body",
        "ze42-v-iam01.ind.zensar.com",
        "zenlabs",
        "Zensar@345");
    alert('Done');
}
