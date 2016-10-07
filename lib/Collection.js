Fruits = new Mongo.Collection(null);
Utilisateur = new Mongo.Collection("utilisateur");
Experience = new Mongo.Collection("experience");
Diplome = new Mongo.Collection("diplome");
Badge = new Mongo.Collection("badge");
Parainages = new Mongo.Collection("parainage");
Paiement = new Mongo.Collection("paiement");
Annonce = new Mongo.Collection("annonce");
Messagerie = new Mongo.Collection("messagerie");
Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images"), new FS.Store.FileSystem("thumbs", {
            beforeWrite: function (fileObj) {
                // We return an object, which will change the
                // filename extension and type for this store only.
                fileObj.extension('png', {
                    store: "png",
                    save: false
                });
                fileObj.type('image/png', {
                    store: "png",
                    save: false
                });
                return {
                    extension: 'png',
                    type: 'image/png'
                };
            },
            transformWrite: function (fileObj, readStream, writeStream) {
                // Transform the image into a 10x10px PNG thumbnail
                //  gm(readStream).resize(60).stream('PNG').pipe(writeStream);
                // The new file size will be automatically detected and set for this store
            }
        })
    ]
});


