this.UserActuel = new Object();
Template.loginCustom.events({
    'click #googlebtn': function (event) {
        event.preventDefault();
        var emailVar = $('#loginEmail').val();
        var passwordVar = $('#loginPassword').val();
        //connectProfil("google", emailVar, passwordVar);
        Meteor.loginWithGoogle({}, function (err) {
            if (err) {
                throw new Meteor.Error("Google login failed");
            } else {

                $('#myModal').on('hidden.bs.modal', function () {
                    Router.go('/profiluser');
                }).modal('hide');

            }
        });
    },
    'click #jobdaybtn': function (event) {
        //alert("jobdayAPI");
        event.preventDefault();
        var emailVar = $('#loginEmail').val();
        var passwordVar = $('#loginPassword').val();
        Meteor.loginWithPassword(emailVar, passwordVar, function err(err) {
            if (err) {
                Accounts.createUser({
                    email: emailVar,
                    password: passwordVar
                }, function err(err) {
                    // console.log("foutus id undifined pas error"+err);
                    if (err) {
                        //   console.log("foutus " + err);
                    } else {
                        Utilisateur.insert({
                            createdBy: Meteor.userId(),
                            typeProfil: "1"
                        });
                    }

                });
                // console.log("Form creer.");
                Meteor.loginWithPassword(emailVar, passwordVar, function err(err) {
                    console.log("foutus id undifined pas error" + err);
                    if (err) {
                        console.log("foutus " + err);
                    } else {
                        $('#myModal').on('hidden.bs.modal', function () {


                                console.log("ok ");

                                Router.go('/profiluser');
                                console.log("ok V2");
                            })
                            .modal('hide');



                    }

                });
            } else {
                // console.log("connect");




                $('#myModal').on('hidden.bs.modal', function () {
                    //   console.log("vas y route");
                    Router.go('/profiluser');
                }).modal('hide');
            }

        });
        //$('#myModal').modal({ show: false});
        //$('#myModal').on('hidden.bs.modal', function () {Router.go('/mainTemplate');}).modal('hide');

    },
    'click #linkedInbtn': function (event) {
        //alert("linkedInAPI");
        event.preventDefault();
        var emailVar = $('#loginEmail').val();
        var passwordVar = $('#loginPassword').val();
        // connectProfil("linkedIn", emailVar, passwordVar);
        Meteor.loginWithLinkedin({}, function (err) {
            if (err) {
                throw new Meteor.Error("Linked login failed");
            } else {

                $('#myModal').on('hidden.bs.modal', function () {
                    Router.go('/profiluser');
                }).modal('hide');

            }
        });

    },
    'click #facebookbtn': function (event) {
        //alert("facebookAPI");
        event.preventDefault();
        var emailVar = $('#loginEmail').val();
        var passwordVar = $('#loginPassword').val();
        // connectProfil("facebook", emailVar, passwordVar);
        Meteor.loginWithFacebook({}, function (err) {
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            } else {

                $('#myModal').on('hidden.bs.modal', function () {
                    Router.go('/profiluser');
                }).modal('hide');

            }
        });
    }
});