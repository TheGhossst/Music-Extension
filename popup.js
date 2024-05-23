document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const audioPlayer = document.getElementById('audioPlayer');
        const songName = document.getElementById('songName');
        const coverImage = document.getElementById('coverImage');
        const pauseButton = document.getElementById('pauseButton');

        audioPlayer.src = URL.createObjectURL(file);
        audioPlayer.play();

        songName.textContent = file.name;

        const reader = new FileReader();
        reader.onload = function(e) {
            jsmediatags.read(file, {
                onSuccess: function(tag) {
                    if (tag.tags.picture) {
                        const picture = tag.tags.picture;
                        const base64String = picture.data.reduce((data, byte) => data + String.fromCharCode(byte), '');
                        coverImage.src = `data:${picture.format};base64,${window.btoa(base64String)}`;
                    } else {
                        coverImage.src = ''; 
                    }
                },
                onError: function(error) {
                    console.log(error);
                }
            });
        };
        reader.readAsArrayBuffer(file);
        
        pauseButton.style.display = 'block';
        pauseButton.textContent = 'Pause';

        pauseButton.addEventListener('click', function() {
            if (audioPlayer.paused) {
                audioPlayer.play();
                pauseButton.textContent = 'Pause';
            } else {
                audioPlayer.pause();
                pauseButton.textContent = 'Play';
            }
        });
    }
});
