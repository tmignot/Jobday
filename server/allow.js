
Images.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    }
});

Utilisateur.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    }
});
