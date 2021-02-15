class AudioManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
    };

    queueDownload(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    downloadAll() {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);
        for (var i = 0; i < this.downloadQueue.length; i++) {
            var sound = new Audio();
            var that = this;

            var path = this.downloadQueue[i];
            console.log(path);

            sound.addEventListener("load", function () {
                console.log("Loaded " + this.path);
                that.successCount++;
            });

            sound.addEventListener("error", function () {
                console.log("Error loading " + this.path);
                that.errorCount++;
            });

            sound = new Audio(path);
            this.cache[path] = sound;
        }
    };

    getAsset(path) {
        return this.cache[path];
    };
};